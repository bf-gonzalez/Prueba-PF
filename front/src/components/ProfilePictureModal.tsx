import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProfilePictureModal = ({ isOpen, onClose, onImageSelect }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dx1kqmh8v/image/upload', formData);
      const imageUrl = response.data.secure_url;

      const decodedUser = JSON.parse(localStorage.getItem("decodedUser"));
      const userId = decodedUser.id;

      await axios.put(`http://localhost:3000/users/${userId}/profile-picture`, {
        url: imageUrl
      });

      Swal.fire({
        icon: 'success',
        title: 'Foto de perfil actualizada',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload(); // Recargar la página
      });
    } catch (error) {
      console.error('Error uploading image:', error);
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
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <span className="text-4xl text-gray-400">+</span>
        )}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 bg-red-500 text-white rounded-full p-1">X</button>
      </div>
      <button onClick={handleSaveProfilePicture} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300">Guardar</button>
    </div>
  );
};

export default ProfilePictureModal;