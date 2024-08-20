"use client";
import React from 'react'
import styles from "../../components/backgrounds/justice.module.css"
import { Bebas_Neue } from 'next/font/google';
import { useRouter } from 'next/navigation';

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export default function Success() {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/membership'); 
    }

    return (
        <main className={styles.fondo}>
            <div className="flex h-screen items-center justify-end">
                <div className="bg-custom-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4 mr-8"> {/* Ajusta mr-8 para el margen derecho */}
                    <div className={`${bebas.variable} font-sans 
                        login cursor-pointer
                        text-4xl text-white hover:text-yellow-400
                        transition-all custom-transition duration-300`}>
                        ¡Tu pago fue rechazado!
                    </div>
                    <button 
                        onClick={handleGoHome}
                        className="mt-4 px-4 py-2 transition-all duration-300"
                    >
                        Volver a comprar
                    </button>
                </div>
            </div>
        </main>
    );
}
