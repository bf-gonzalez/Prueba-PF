"use client"

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import styles from '../../../components/regularBackground/RegularBackground.module.css';

export default function FolderPage() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { title: folderName } = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const decodedUser = JSON.parse(localStorage.getItem("decodedUser"));
  const isMonthlyMember = decodedUser?.MembershipType === 'monthly_member';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/images?folder=${folderName}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
        if (page) {
          setCurrentIndex(Number(page) - 1);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (folderName) {
      fetchImages();
    }
  }, [folderName, page]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleFitToScreen = () => {
    const img = document.getElementById('currentImage');
    if (img) {
      img.style.maxWidth = '50%';
      img.style.height = 'auto';
    }
  };

  const handleZoomIn = () => {
    const img = document.getElementById('currentImage');
    if (img) {
      img.style.maxWidth = 'none';
      img.style.width = '100%';
      img.style.height = 'auto';
    }
  };

  const handleZoomOut = () => {
    const img = document.getElementById('currentImage');
    if (img) {
      img.style.maxWidth = 'none';
      img.style.width = '30%';
      img.style.height = 'auto';
    }
  };

  const handleGoHome = () => {
    router.push('/home');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black">
      <nav className="w-full bg-gray-800 p-4 flex justify-between items-center mt-32">
        <div className="flex space-x-4">
          <button onClick={handleFitToScreen} className="border-red-800 text-white p-2 rounded">Ajustar a la Pantalla</button>
          <button onClick={handleZoomIn} className="border-red-800 text-white p-2 rounded">Acercar</button>
          <button onClick={handleZoomOut} className="border-red-800 text-white p-2 rounded">Alejar</button>
          <button onClick={handleGoHome} className="border-red-800 text-white p-2 rounded">Inicio</button>
        </div>
        <div className="relative">
          <button onClick={toggleDropdown} className="border-red-800 text-white p-2 rounded">Páginas</button>
          <span className="text-white ml-2">{currentIndex + 1} / {images.length}</span>
          {dropdownOpen && (
            <ul className="absolute bg-white text-black mt-2 rounded shadow-lg max-h-40 overflow-y-auto z-50">
              {images.map((image, index) => (
                <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => setCurrentIndex(index)}>
                  Página {index + 1}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
      {images.length > 0 && (
        <div className="relative mt-4 w-full flex justify-center">
          <button onClick={handlePrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded">Anterior</button>
          <img
            id="currentImage"
            src={isMonthlyMember ? images[currentIndex].secure_url.replace('/upload/', '/upload/q_50/') : images[currentIndex].secure_url}
            alt={images[currentIndex].public_id}
            className="w-full h-auto z-10 relative"
          />
          <button onClick={handleNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded">Siguiente</button>
        </div>
      )}
    </div>
  );
}