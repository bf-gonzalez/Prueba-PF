import { Bebas_Neue } from 'next/font/google';
import React from 'react';
import axios from 'axios';
import { GoAlert } from "react-icons/go";
import Swal from 'sweetalert2';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

const handleActionWithConfirmation = async (actionFn) => {
  const result = await Swal.fire({
    title: '¿Estás seguro de que deseas bloquear a este usuario?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, bloquear',
    cancelButtonText: 'No, cancelar',
  });

  if (result.isConfirmed) {
    try {
      await actionFn();
      window.location.reload();
    } catch (error) {
      console.error('Error realizando la acción:', error);
    }
  }
};

function BanUserButton({ userId }) {

  const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };


  const handleBanUser = async () => {
    if (!isValidUUID(userId)) {
      console.error('Invalid UUID:', userId);
      return;
    }
  
    await handleActionWithConfirmation(async () => {
      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/deleted/${userId}`);
        console.log('Useario Baneado con éxito!:', response.data);
      } catch (error) {
        console.error('Error banenado al usuario:', error);
      }
    });
  };

  

  return (
    <>
      <button
        type="button"
        onClick={handleBanUser}
        className={`${bebas.variable} font-sans bg-red-700 text-black uppercase w-[10vw] h-[10vh] rounded-2xl text-2xl flex flex-col items-center border-black border-2 hover:text-white hover:scale-105 hover:border-white duration-300 self-center`}
      >
        BLOQUEAR USUARIO
        <GoAlert className='size-[3vw]' />
      </button>
    </>
  );
}

export default BanUserButton;