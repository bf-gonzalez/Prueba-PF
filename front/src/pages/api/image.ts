import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/server/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: '', // Puedes especificar un prefijo si quieres filtrar por carpeta
    });
    res.status(200).json(result.resources);
  } catch (error) {
    console.error('Error fetching images:', error);
    if (error.http_code === 420) {
      res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    } else {
      res.status(500).json({ error: 'Error fetching images' });
    }
  }
}