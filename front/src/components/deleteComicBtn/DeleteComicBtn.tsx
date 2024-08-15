import axios from 'axios';
import { Bebas_Neue } from 'next/font/google';
import React from 'react';
import { GoAlert } from "react-icons/go";
import Swal from 'sweetalert2';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

const handleActionWithConfirmation = async (actionFn, onConfirmed) => {
  const result = await Swal.fire({
    title: '¿Estás seguro de que deseas borrar este cómic?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'No, cancelar',
  });

  if (result.isConfirmed) {
    try {
      await actionFn();
      if (onConfirmed) {
        onConfirmed();
      }
    } catch (error) {
      console.error('Error realizando la acción:', error);
    }
  }
};

function DeleteComicButton({ comicId, onComicDeleted, fetchPendingComics, setUpdateFlag }) {

  const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  const handleComicDelete = async () => {
    if (!isValidUUID(comicId)) {
      console.error('Invalid UUID:', comicId);
      return;
    }

    await handleActionWithConfirmation(async () => {
      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/comics/activate/${comicId}`);
        console.log('Comic borrado con éxito!:', response.data);
        if (onComicDeleted) {
          onComicDeleted(comicId);
        }
        fetchPendingComics(); // Llamar a la función para actualizar los cómics pendientes
        setUpdateFlag((prevFlag) => !prevFlag); // Alternar el estado de actualización
      } catch (error) {
        console.error('Error borrando el comic:', error);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleComicDelete}
      className={`${bebas.variable} font-sans bg-yellow-500 hover:bg-red-700 text-black uppercase w-[10vw] h-[8vh] rounded-2xl text-lg self-center
        flex flex-col items-center border-black border-2 hover:scale-105 duration-300 hover:text-white`}
    >
      BORRAR COMIC
      <GoAlert className='size-[3vw]'/>
    </button>
  );
}

export default DeleteComicButton;