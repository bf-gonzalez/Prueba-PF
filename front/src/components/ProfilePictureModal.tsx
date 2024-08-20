import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProfilePictureModal = ({ isOpen, onClose, onImageSelect, onUploadSuccess, user, setUser }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
      setSelectedFile(file);
      onImageSelect(file);
    }
  };

  const handleSaveProfilePicture = async () => {
    if (!selectedFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dx1kqmh8v/image/upload', formData);
      const imageUrl = response.data.secure_url;

      const decodedUser = JSON.parse(localStorage.getItem("decodedUser"));
      const userId = decodedUser.id;

      const updateResponse = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/profile-picture`, {
        url: imageUrl
      });

      if (updateResponse.status === 200) {
        // Actualizar la imagen de perfil en tiempo real
        setUser(prevUser => ({ ...prevUser, profilePicture: imageUrl }));

        Swal.fire({
          icon: 'success',  
          title: 'Foto de perfil actualizada',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          onUploadSuccess(imageUrl);
          onClose();
          // Limpiar los campos
          setPreviewUrl(null);
          setSelectedFile(null);
        });

        // Mostrar modal de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tu foto de perfil se ha actualizado correctamente.',
          confirmButtonText: 'OK'
        });
      } else {
        throw new Error(`Error al actualizar la foto de perfil: ${updateResponse.statusText}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al actualizar tu foto de perfil. Inténtalo de nuevo. Detalles: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-48 h-64 border-2 border-gray-400 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 m-2 bg-white">
        <input
          type="file"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className='flex space-x-2 justify-center items-center'>
              <span className='sr-only'>Loading...</span>
              <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
              <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
            </div>
          </div>
        ) : (
          previewUrl ? (
            <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="text-4xl text-gray-400">+</span>
          )
        )}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 bg-red-500 text-white rounded-full p-1">X</button>
      </div>
      <button onClick={handleSaveProfilePicture} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300">
        {isLoading ? <span className="loader"></span> : 'Guardar'}
      </button>
    </div>
  );
};

export default ProfilePictureModal;