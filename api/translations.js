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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const client = await getMongoClient();
    const db = client.db('rme');
    const collection = db.collection('translations');

    // GET - Fetch all translations
    if (req.method === 'GET') {
      const translations = await collection.find({}).toArray();
      return res.status(200).json({ success: true, translations });
    }

    // POST - Save/update a single translation
    if (req.method === 'POST') {
      const { key, page, language, value } = req.body;

      if (!key || !language) {
        return res.status(400).json({ error: 'Key and language are required' });
      }

      const filter = { key, language };
      const update = {
        $set: {
          key,
          page: page || 'common',
          language,
          value: value || '',
          updatedAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      };

      await collection.updateOne(filter, update, { upsert: true });

      return res.status(200).json({ success: true, message: 'Translation saved' });
    }

    // PUT - Bulk save translations
    if (req.method === 'PUT') {
      const { translations } = req.body;

      if (!Array.isArray(translations)) {
        return res.status(400).json({ error: 'Translations array is required' });
      }

      const bulkOps = translations.map(t => ({
        updateOne: {
          filter: { key: t.key, language: t.language },
          update: {
            $set: {
              key: t.key,
              page: t.page || 'common',
              language: t.language,
              value: t.value || '',
              updatedAt: new Date()
            },
            $setOnInsert: {
              createdAt: new Date()
            }
          },
          upsert: true
        }
      }));

      if (bulkOps.length > 0) {
        await collection.bulkWrite(bulkOps);
      }

      return res.status(200).json({
        success: true,
        message: `${translations.length} translations saved`
      });
    }

    // DELETE - Remove translations not in valid keys list
    if (req.method === 'DELETE') {
      const { validKeys } = req.body;

      if (!Array.isArray(validKeys)) {
        return res.status(400).json({ error: 'validKeys array is required' });
      }

      const result = await collection.deleteMany({
        key: { $nin: validKeys }
      });

      return res.status(200).json({
        success: true,
        message: `${result.deletedCount} translations removed`
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Translations API error:', error);
    return res.status(500).json({
      error: 'Failed to process translations',
      details: error.message
    });
  }
}
