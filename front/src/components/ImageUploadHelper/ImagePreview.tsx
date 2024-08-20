import React from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ImagePreview = ({ previewUrls, handleMoveLeft, handleMoveRight, handleDelete }) => {
  return (
    <div className="flex flex-wrap">
      {previewUrls.map((url, index) => (
        <div key={index} className="relative w-48 h-64 m-2">
          <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover rounded" />
          <div className="absolute top-0 left-0 w-full flex justify-between p-1">
            {index > 0 && (
              <button 
                onClick={() => handleMoveLeft(index)} 
                className="bg-[#F5C702] text-gray-800 p-1 rounded hover:bg-blue-700 hover:text-white transition-colors duration-300 transform active:scale-95 active:shadow-inner"
              >
                <FaLongArrowAltLeft />
              </button>
            )}
            {index < previewUrls.length - 1 && (
              <button 
                onClick={() => handleMoveRight(index)} 
                className="bg-[#F5C702] text-gray-800 p-1 rounded hover:bg-blue-700 hover:text-white transition-colors duration-300 transform active:scale-95 active:shadow-inner"
              >
                <FaLongArrowAltRight />
              </button>
            )}
            <button 
              onClick={() => handleDelete(index)} 
              className="bg-red-600 text-white p-1 rounded hover:bg-blue-700 hover:text-white transition-colors duration-300 transform active:scale-95 active:shadow-inner"
            >
              <MdDelete />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 rounded-tl">
            {index === 0 ? 'Portada' : `Página ${index}`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;