import { list } from '@vercel/blob';

export default async function handler(request) {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type'); // 'background' or 'character' or 'all'

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

    return new Response(JSON.stringify({
      success: true,
      images: images,
      count: images.length,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('List error:', error);
    return new Response(JSON.stringify({ error: 'Failed to list images', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
