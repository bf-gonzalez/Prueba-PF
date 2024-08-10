"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const updateUserName = async (userId: string, newUserName: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUserName }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el nombre de usuario');
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        throw error;
    }
};

export const NewUserName: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter(); 

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName.trim()) {
            setMessage('El nombre de usuario no puede estar vacío');
            return;
        }

        const decodedUserStr = localStorage.getItem('decodedUser');
        if (decodedUserStr) {
            const decodedUser = JSON.parse(decodedUserStr);
            const userId = decodedUser.id;
            try {
                await updateUserName(userId, userName);
                Swal.fire({
                    icon: 'success',
                    title: 'Nombre de usuario actualizado',
                    text: 'Tu nombre de usuario se ha actualizado correctamente.',
                }).then(() => {
                    router.push('/dashboard'); 
                });
            } catch (error) {
                setMessage('Error al actualizar el nombre de usuario');
            }
        } else {
            setMessage('No se encontró el usuario');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-custom-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nuevo nombre de usuario"
                    value={userName}
                    onChange={handleUserNameChange}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black`}
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                >
                    Cambiar Nombre de Usuario
                </button>
                {message && (
                    <p className="mt-4 text-center text-red-500">{message}</p>
                )}
            </form>
        </div>
    );
};