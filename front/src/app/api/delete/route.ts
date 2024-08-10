import { NextResponse } from 'next/server';
import cloudinary from '@/server/cloudinary';

export async function DELETE() {
  try {
    // Obtener todas las carpetas
    const foldersResult = await cloudinary.api.root_folders();
    const folders = foldersResult.folders;

    // Eliminar todas las imágenes en cada carpeta
    for (const folder of folders) {
      const imagesResult = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder.name,
        max_results: 500,
      });

      const imageIds = imagesResult.resources.map(image => image.public_id);

      if (imageIds.length > 0) {
        await cloudinary.api.delete_resources(imageIds);
      }
    }

    // Eliminar todas las carpetas
    for (const folder of folders) {
      await cloudinary.api.delete_folder(folder.name);
    }

    // Eliminar todas las imágenes sin carpetas
    const allImagesResult = await cloudinary.api.resources({
      type: 'upload',
      prefix: '',
      max_results: 500,
    });

    const allImageIds = allImagesResult.resources.map(image => image.public_id);

    if (allImageIds.length > 0) {
      await cloudinary.api.delete_resources(allImageIds);
    }

    return NextResponse.json({ message: 'Todas las carpetas e imágenes han sido eliminadas exitosamente.' });
  } catch (error) {
    console.error('Error eliminando carpetas e imágenes:', error);
    return NextResponse.json({ error: 'Error eliminando carpetas e imágenes' }, { status: 500 });
  }
}