import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 12; // "Waiting List Vercel"
const FREE_CREDITS = 5000;

let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

async function addToBrevo(email, source, attributes = {}) {
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': BREVO_API_KEY
    },
    body: JSON.stringify({
      email: email,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
      attributes: {
        SOURCE: source,
        SIGNUP_DATE: new Date().toISOString(),
        ...attributes
      }
    })
  });
  return response;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      email,
      quizType,
      result,
      overallScore,
      sectionScores,
      answers,
      answerData,
      subscribeNewsletter,
      joinWaitlist,
      source
    } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Connect to MongoDB
    const client = await getMongoClient();
    const db = client.db('rme');

    // Save quiz results
    const quizResultsCollection = db.collection('quiz_results');
    const quizResult = {
      email: normalizedEmail,
      quizType: quizType,
      result: result,
      overallScore: overallScore || null,
      sectionScores: sectionScores || null,
      answers: answers || {},
      answerData: answerData || {},
      subscribeNewsletter: subscribeNewsletter || false,
      joinWaitlist: joinWaitlist || false,
      source: source || 'quiz',
      createdAt: new Date()
    };

    await quizResultsCollection.insertOne(quizResult);

    // If joining waitlist, add to waitlist collection
    if (joinWaitlist) {
      const waitlistCollection = db.collection('waitlist');
      const existingWaitlist = await waitlistCollection.findOne({ email: normalizedEmail });

      if (!existingWaitlist) {
        await waitlistCollection.insertOne({
          email: normalizedEmail,
          freeCredits: subscribeNewsletter ? FREE_CREDITS : 0,
          subscribeNewsletter: subscribeNewsletter || false,
          source: source || 'quiz',
          quizType: quizType,
          createdAt: new Date(),
          status: 'pending'
        });
      } else if (subscribeNewsletter && !existingWaitlist.subscribeNewsletter) {
        // If they weren't subscribed before but are now, add credits
        await waitlistCollection.updateOne(
          { email: normalizedEmail },
          {
            $set: {
              subscribeNewsletter: true,
              freeCredits: FREE_CREDITS,
              updatedAt: new Date()
            }
          }
        );
      }
    }

    // Add to Brevo if subscribed to newsletter
    if (subscribeNewsletter) {
      try {
        await addToBrevo(normalizedEmail, source || 'quiz', {
          QUIZ_TYPE: quizType,
          QUIZ_RESULT: result
        });
      } catch (brevoError) {
        console.error('Brevo error:', brevoError);
        // Don't fail the whole request if Brevo fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Quiz results saved',
      credits: subscribeNewsletter ? FREE_CREDITS : 0
    });

  } catch (error) {
    console.error('Quiz results error:', error);
    return res.status(500).json({
      error: 'Failed to save quiz results',
      details: error.message
    });
  }
}
