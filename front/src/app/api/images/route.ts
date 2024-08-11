import { NextResponse } from 'next/server';
import cloudinary from '@/server/cloudinary';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get('folder');

  console.log(`Fetching images for folder: ${folder}`);
  console.log(`Full URL: ${req.url}`);

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder || '', // Filtra por carpeta si se proporciona
    });
    console.log(`Fetched ${result.resources.length} images`);
    return NextResponse.json(result.resources);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Error fetching images' }, { status: 500 });
  }
}