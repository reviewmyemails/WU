import { put, list } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle the stream
  },
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(request.url);
    const filename = url.searchParams.get('filename');
    const type = url.searchParams.get('type'); // 'background' or 'character'

    if (!filename) {
      return new Response(JSON.stringify({ error: 'Filename is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate file type
    const validTypes = ['background', 'character'];
    if (!validTypes.includes(type)) {
      return new Response(JSON.stringify({ error: 'Invalid type. Must be "background" or "character"' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create folder path based on type
    const folderPath = type === 'background' ? 'backgrounds' : 'characters';
    const fullPath = `${folderPath}/${filename}`;

    // Upload to Vercel Blob
    const blob = await put(fullPath, request.body, {
      access: 'public',
      addRandomSuffix: false, // Keep the exact filename
    });

    return new Response(JSON.stringify({
      success: true,
      url: blob.url,
      filename: filename,
      type: type,
      path: fullPath,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Upload failed', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
