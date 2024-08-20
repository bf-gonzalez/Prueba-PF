import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ImagePreview from './ImageUploadHelper/ImagePreview';
import { uploadImages } from './ImageUploadHelper/uploadImages';
import { FaRegPlusSquare, FaFolderPlus } from "react-icons/fa";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';

const ImageUpload = ({ folderName, description, onComicDataChange, onUploadSuccess, uploadMode, isUploadDisabled, setFolderNameError, setDescriptionError, categories }) => {
  const [images, setImages] = useState<(File | null)[]>([]);
  const [imageUrls, setImageUrls] = useState<(string | null)[]>([]);
  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>([]);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('decodedUser'));
    if (user && user.username && user.id) {
      setUserName(user.username);
      setUserId(user.id);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);

      const previewUrlsArray = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...previewUrlsArray]);
    }
  };

  const handleMoveLeft = (index) => {
    if (index > 0) {
      const newImages = [...images];
      const newPreviewUrls = [...previewUrls];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      [newPreviewUrls[index - 1], newPreviewUrls[index]] = [newPreviewUrls[index], newPreviewUrls[index - 1]];
      setImages(newImages);
      setPreviewUrls(newPreviewUrls);
    }
  };

  const handleMoveRight = (index) => {
    if (index < images.length - 1) {
      const newImages = [...images];
      const newPreviewUrls = [...previewUrls];
      [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]];
      [newPreviewUrls[index + 1], newPreviewUrls[index]] = [newPreviewUrls[index], newPreviewUrls[index + 1]];
      setImages(newImages);
      setPreviewUrls(newPreviewUrls);
    }
  };

  const handleDelete = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const handleUpload = async () => {
    if (isUploadDisabled) {
      setFolderNameError('El nombre del cómic debe tener al menos 3 letras');
      setDescriptionError('La descripción del Cómic debe tener al menos 12 letras');
      return;
    }

    try {
      // Obtener todos los cómics del usuario
      const userComicsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comics?userId=${userId}`);
      const userComics = userComicsResponse.data;

      // Verificar si ya existe un cómic con el mismo nombre y autor
      let newFolderName = folderName;
      let newTitle = folderName;
      let suffix = 1;

      while (userComics.some(comic => comic.title === newTitle && comic.author === userName)) {
        suffix++;
        newTitle = `${folderName} ${suffix}`;
        newFolderName = `${folderName} ${suffix} @${userName}`;
      }

      const allUploaded = await uploadImages(images, newFolderName, userName, imageUrls, setImageUrls);

      if (allUploaded) {
        try {
          const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
          const username = userResponse.data.username;

          const comicData = {
            title: newTitle,
            description: description,
            author: username,
            data_post: new Date().toISOString().split('T')[0],
            folderName: newFolderName,
            categoryname: categories.categories.map(cat => cat.value).join(', '),
            typecomic: categories.typeComic ? categories.typeComic.value : null,
            idioma: categories.language ? categories.language.value : null,
          };

          onComicDataChange(comicData);

          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comics/${userId}`, comicData);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cómic subido con éxito',
            showConfirmButton: true,
            timer: undefined
          }).then(() => {
            if (onUploadSuccess) {
              onUploadSuccess();
            }
            resetFields();
            router.push('/dashboard');
          });
        } catch (error) {
          console.error('Error saving comic data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un problema al guardar los datos del cómic!',
          });
        }
      }
    } catch (error) {
      setUploadError('Error subiendo las imágenes. Por favor, inténtalo de nuevo.');
    }
  };

  const handleUploadClick = () => {
    setShowError(true);
    if (
      !isUploadDisabled &&
      categories.categories.length > 0 &&
      categories.typeComic &&
      categories.language &&
      images.length >= 2
    ) {
      handleUpload();
    } else {
      if (folderName.length < 3) {
        setFolderNameError('El nombre del cómic debe tener al menos 3 letras');
      }
      if (description.length < 12) {
        setDescriptionError('La descripción del Cómic debe tener al menos 12 letras');
      }
    }
  };

  const resetFields = () => {
    setImages([]);
    setImageUrls([]);
    setPreviewUrls([]);
  };

  return (
    <div>
      <div className="w-full mb-4 flex flex-wrap">
        <ImagePreview 
          previewUrls={previewUrls} 
          handleMoveLeft={handleMoveLeft} 
          handleMoveRight={handleMoveRight} 
          handleDelete={handleDelete} 
        />
        <div className="relative w-48 h-64 border-2 border-gray-400 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 m-2 bg-white">
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            webkitdirectory={uploadMode === 'folder' ? 'true' : undefined}
          />
          {uploadMode === 'folder' ? <FaFolderPlus className="text-4xl text-gray-400" /> : <FaRegPlusSquare className="text-4xl text-gray-400" />}
          <span className="text-sm text-gray-400 mt-2">{images.length === 0 ? 'Portada' : `Página ${images.length}`}</span>
        </div>
      </div>
      <div className="w-full mb-4 flex flex-col items-center">
        <button 
          onClick={handleUploadClick} 
          className={`mt-4 px-4 py-2 rounded ${
            isUploadDisabled ||
            categories.categories.length === 0 ||
            !categories.typeComic ||
            !categories.language ||
            images.length < 2
              ? 'bg-gray-400 text-gray-800'
              : 'bg-[#F5C702] text-gray-800 hover:bg-blue-700 hover:text-white transition-colors duration-300'
          }`}
        >
          Subir Cómic
        </button>
        {uploadError && <p className="text-red-500 text-xs italic mt-2">{uploadError}</p>}
      </div>
    </div>
  );
};

export default ImageUpload;