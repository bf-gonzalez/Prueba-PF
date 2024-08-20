"use client";
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../../components/backgrounds/experiment.module.css";
import { Bebas_Neue } from 'next/font/google';
import { UserContext } from '@/context/userContext';
import UserChat from '@/components/userChat/UserChat';

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export default function ChatPagePrueba() {
    const router = useRouter();

    return (
        <main className={styles.fondo}>
            <div className='pt-[20vh] pb-[10vh] '>
            <UserChat />
            </div>
        </main>
    );
}
