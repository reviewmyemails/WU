import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

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
      sessionId,
      quizType,
      event,
      question,
      answer,
      answerLabel,
      answerContext,
      result,
      timestamp
    } = req.body;

    if (!sessionId || !quizType || !event) {
      return res.status(400).json({ error: 'sessionId, quizType, and event are required' });
    }

    // Connect to MongoDB
    const client = await getMongoClient();
    const db = client.db('rme');
    const trackingCollection = db.collection('quiz_tracking');

    // Create tracking event
    const trackingEvent = {
      sessionId: sessionId,
      quizType: quizType,
      event: event, // 'started', 'answer', 'completed', 'abandoned'
      question: question || null,
      answer: answer || null,
      answerLabel: answerLabel || null,
      answerContext: answerContext || null,
      result: result || null,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      createdAt: new Date(),
      userAgent: req.headers['user-agent'] || null,
      referer: req.headers['referer'] || null
    };

    await trackingCollection.insertOne(trackingEvent);

    return res.status(200).json({
      success: true,
      message: 'Event tracked'
    });

  } catch (error) {
    console.error('Quiz tracking error:', error);
    return res.status(500).json({
      error: 'Failed to track event',
      details: error.message
    });
  }
}
