import { Bebas_Neue } from 'next/font/google';
import React from 'react';
import axios from 'axios';
import { GoAlert } from "react-icons/go";

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

const handleActionWithConfirmation = async (actionFn) => {
  const confirmed = window.confirm("¿Estás seguro de que deseas desbloquear a este usuario?");
  if (confirmed) {
    try {
      await actionFn();
      window.location.reload();
    } catch (error) {
      console.error('Error realizando la acción:', error);
    }
  }
};

function UnBanUserButton({ userId }) {

  const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };


  const handleUnBanUser = async () => {
    if (!isValidUUID(userId)) {
      console.error('Invalid UUID:', userId);
      return;
    }
  
    await handleActionWithConfirmation(async () => {
      try {
        const response = await axios.put(`http://localhost:3000/users/deleted/${userId}`);
        console.log('Useario Desbloqueado con éxito!:', response.data);
      } catch (error) {
        console.error('Error Desbloqueando al usuario:', error);
      }
    });
  };

  

  return (
    <>
      <button
        type="button"
        onClick={handleUnBanUser}
        className={`${bebas.variable} font-sans bg-red-700 text-black uppercase w-[10vw] h-[10vh] rounded-2xl text-2xl flex flex-col items-center border-black border-2 hover:text-white hover:scale-105 hover:border-white duration-300 self-center`}
      >
        DESBLOQUEAR USUARIO
        <GoAlert className='size-[3vw]' />
      </button>
    </>
  );
}

export default UnBanUserButton;
