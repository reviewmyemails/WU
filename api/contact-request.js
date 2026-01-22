import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const CONTACT_REQUEST_EMAIL = 'yt+contact@reviewmyemails.com';

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

async function sendNotificationEmail(contactData) {
  const { name, email, timezone, message, source, quizResult, quizAnswers } = contactData;

  let quizInfo = '';
  if (quizResult) {
    quizInfo = `\n\nQuiz Result: ${quizResult}`;
    if (quizAnswers) {
      quizInfo += `\nQuiz Answers: ${JSON.stringify(quizAnswers, null, 2)}`;
    }
  }

  const emailBody = `
New Contact Request

Name: ${name}
Email: ${email}
Timezone: ${timezone || 'Not specified'}
Source: ${source || 'website'}

Message:
${message || '(No message provided)'}
${quizInfo}

---
This person requested to speak with a specialist.
`;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: { email: 'notifications@reviewmyemails.com', name: 'Contact Notifications' },
      to: [{ email: CONTACT_REQUEST_EMAIL }],
      replyTo: { email: email },
      subject: `Contact Request: ${name} - ${source || 'website'}`,
      textContent: emailBody
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
      name,
      email,
      timezone,
      message,
      source,
      quizResult,
      quizAnswers
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Connect to MongoDB
    const client = await getMongoClient();
    const db = client.db('rme');

    // Save contact request
    const contactRequestsCollection = db.collection('contact_requests');
    const contactRequest = {
      name: name.trim(),
      email: normalizedEmail,
      timezone: timezone || null,
      message: message || null,
      source: source || 'website',
      quizResult: quizResult || null,
      quizAnswers: quizAnswers || null,
      contacted: false,
      status: 'pending',
      createdAt: new Date()
    };

    await contactRequestsCollection.insertOne(contactRequest);

    // Send notification email
    try {
      await sendNotificationEmail({
        name: name.trim(),
        email: normalizedEmail,
        timezone,
        message,
        source,
        quizResult,
        quizAnswers
      });
    } catch (emailError) {
      console.error('Notification email error:', emailError);
      // Don't fail the whole request if email fails
    }

    return res.status(200).json({
      success: true,
      message: 'Contact request received'
    });

  } catch (error) {
    console.error('Contact request error:', error);
    return res.status(500).json({
      error: 'Failed to submit contact request',
      details: error.message
    });
  }
}
