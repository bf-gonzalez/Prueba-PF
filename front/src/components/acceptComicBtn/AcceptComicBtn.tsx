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
    title: '¿Estás seguro de que deseas aceptar este cómic?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, aceptar',
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

function AcceptComicButton({ comicId, onComicAccepted, onConfirmed }) {

  const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  const handleComicAccept = async () => {
    if (!isValidUUID(comicId)) {
      console.error('Invalid UUID:', comicId);
      return;
    }

    await handleActionWithConfirmation(async () => {
      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/comics/activate/${comicId}`);
        console.log('Comic Aceptado con éxito!:', response.data);
        if (onComicAccepted) {
          onComicAccepted(comicId); // Llamar al callback pasado desde AllPendingComicsComponent
        }
      } catch (error) {
        console.error('Error Aceptando el comic:', error);
      }
    }, onConfirmed);
  };

  return (
    <button
      type="button"
      onClick={handleComicAccept}
      className={`${bebas.variable} font-sans bg-green-600 text-black uppercase w-[10vw] h-[8vh] rounded-2xl text-2xl self-center
        flex flex-col items-center border-black border-2 hover:scale-105 duration-300 hover:text-white`}
    >
      ACEPTAR COMIC
    </button>
  );
};

export default AcceptComicButton;