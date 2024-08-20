import { Bebas_Neue } from 'next/font/google';
import React from 'react';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
        className={`${bebas.variable} font-sans text-3xl px-4 py-2 bg-yellow-400 rounded disabled:opacity-50 uppercase text-black`}>
        Anterior
      </button>
      <span>{currentPage} de {totalPages}</span>
      <button 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
        className={`${bebas.variable} font-sans text-3xl px-4 py-2 bg-rose-700 rounded disabled:opacity-50 uppercase text-white`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;