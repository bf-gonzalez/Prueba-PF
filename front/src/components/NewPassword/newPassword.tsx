"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

const postPassword = async (userId: string, newPassword: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPassword }), 
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la contraseña');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const NewPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden',
            });
            return;
        }

        const decodedUserStr = localStorage.getItem('decodedUser');
        if (decodedUserStr) {
            const decodedUser = JSON.parse(decodedUserStr);
            const userId = decodedUser.id;
            try {
                await postPassword(userId, password);
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña Actualizada',
                    text: 'Tu contraseña se ha actualizado correctamente.',
                }).then(() => {
                    router.push('/dashboard');
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al actualizar la contraseña',
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se encontró el usuario',
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-custom-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={handlePasswordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black mb-4"
                />
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black mb-4"
                />
                <button
                    type="submit"
                    className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}
                >
                    Cambiar contraseña
                </button>
            </form>
        </div>
    );
};
