import axios from 'axios';
import Swal from 'sweetalert2';

export const uploadImages = async (images, folderName, userName, imageUrls, setImageUrls) => {
  Swal.fire({
    title: 'Se está subiendo tu cómic',
    html: 'Por favor espera...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  let allUploaded = true;
  for (let i = 0; i < images.length; i++) {
    if (!images[i]) continue;

    const formData = new FormData();
    formData.append('file', images[i]);
    formData.append('upload_preset', 'ml_default');
    const fullFolderName = `${folderName} @${userName}`; // Changed to use userName instead of name
    formData.append('folder', fullFolderName);
    formData.append('public_id', `${fullFolderName}/${i + 1}`);

    try {
      console.log('Datos enviados al backend:', {
        file: images[i],
        upload_preset: 'ml_default',
        folder: fullFolderName,
        public_id: `${fullFolderName}/${i + 1}`
      });

      const response = await axios.post('https://api.cloudinary.com/v1_1/dx1kqmh8v/image/upload', formData);
      const newImageUrls = [...imageUrls];
      newImageUrls[i] = response.data.secure_url;
      setImageUrls(newImageUrls);
    } catch (error) {
      console.error('Error uploading image:', error);
      allUploaded = false;
    }
  }

  Swal.close();
  return allUploaded;
};