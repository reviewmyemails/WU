import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, type } = req.query;

    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    const validTypes = ['background', 'character'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid type. Must be "background" or "character"' });
    }

    const folderPath = type === 'background' ? 'backgrounds' : 'characters';
    const fullPath = `${folderPath}/${filename}`;

    // Upload directly from request stream
    const blob = await put(fullPath, req, {
      access: 'public',
      addRandomSuffix: false,
      contentType: req.headers['content-type'],
    });

    return res.status(200).json({
      success: true,
      url: blob.url,
      filename: filename,
      type: type,
      path: fullPath,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      error: 'Upload failed',
      details: error.message
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
