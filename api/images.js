import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type } = req.query; // 'background' or 'character' or 'all'

    // List all blobs
    const { blobs } = await list();

    // Filter by type if specified
    let filteredBlobs = blobs;
    if (type && type !== 'all') {
      const prefix = type === 'background' ? 'backgrounds/' : 'characters/';
      filteredBlobs = blobs.filter(blob => blob.pathname.startsWith(prefix));
    }

    // Format response
    const images = filteredBlobs.map(blob => ({
      url: blob.url,
      filename: blob.pathname.split('/').pop(),
      type: blob.pathname.startsWith('backgrounds/') ? 'background' : 'character',
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }));

    return res.status(200).json({
      success: true,
      images: images,
      count: images.length,
    });

  } catch (error) {
    console.error('List error:', error);
    return res.status(500).json({
      error: 'Failed to list images',
      details: error.message
    });
  }
}
