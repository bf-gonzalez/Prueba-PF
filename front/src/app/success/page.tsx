"use client";
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../../components/backgrounds/cyclops.module.css";
import { Bebas_Neue } from 'next/font/google';
import { UserContext } from '@/context/userContext';

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export default function Success() {
    const router = useRouter();
    const { updateToken } = useContext(UserContext);

    useEffect(() => {
        const fetchAndUpdateToken = async () => {
            await updateToken();
        };

        fetchAndUpdateToken();
        
    }, []);

    const handleGoHome = () => {
        router.push('/home');
    };

    return (
        <main className={styles.fondo}>
            <div className="flex h-screen items-center justify-end">
                <div className="bg-custom-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4 mr-8"> 
                    <div className={`${bebas.variable} font-sans 
                        login cursor-pointer
                        text-4xl text-white hover:text-yellow-400
                        transition-all custom-transition duration-300`}>
                        ¡Gracias por tu compra!
                    </div>
                    <button 
                        onClick={handleGoHome}
                        className="mt-4 px-4 py-2 transition-all duration-300"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        </main>
    );
}
