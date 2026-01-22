import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 12; // "Waiting List Vercel"
const BREVO_TEMPLATE_ID = 16;
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

async function addToBrevo(email, source) {
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
        SIGNUP_DATE: new Date().toISOString()
      }
    })
  });
  return response;
}

async function sendWelcomeEmail(email) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': BREVO_API_KEY
    },
    body: JSON.stringify({
      templateId: BREVO_TEMPLATE_ID,
      to: [{ email: email }]
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
    const { email, subscribeNewsletter, source } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Connect to MongoDB
    const client = await getMongoClient();
    const db = client.db('rme');
    const waitlistCollection = db.collection('waitlist');

    // Check if email already exists
    const existingEntry = await waitlistCollection.findOne({ email: normalizedEmail });

    if (existingEntry) {
      // Update newsletter preference if changed
      if (subscribeNewsletter !== existingEntry.subscribeNewsletter) {
        await waitlistCollection.updateOne(
          { email: normalizedEmail },
          { $set: { subscribeNewsletter: subscribeNewsletter, updatedAt: new Date() } }
        );
      }
      return res.status(200).json({
        success: true,
        alreadyExists: true,
        message: 'Already on waitlist'
      });
    }

    // Create new waitlist entry
    const waitlistEntry = {
      email: normalizedEmail,
      freeCredits: FREE_CREDITS,
      subscribeNewsletter: subscribeNewsletter || false,
      source: source || 'pricing_waitlist',
      createdAt: new Date(),
      status: 'pending' // pending, notified, converted
    };

    await waitlistCollection.insertOne(waitlistEntry);

    // Add to Brevo list if subscribed to newsletter
    if (subscribeNewsletter) {
      try {
        await addToBrevo(normalizedEmail, source || 'pricing_waitlist');
      } catch (brevoError) {
        console.error('Brevo error:', brevoError);
        // Don't fail the whole request if Brevo fails
      }
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(normalizedEmail);
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Don't fail the whole request if email fails
    }

    return res.status(200).json({
      success: true,
      alreadyExists: false,
      message: 'Added to waitlist',
      credits: FREE_CREDITS
    });

  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({
      error: 'Failed to join waitlist',
      details: error.message
    });
  }
}
