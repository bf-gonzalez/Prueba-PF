'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreatorPage from "@/components/creatorPage/CreatorPage";
import styles from "@/components/backgrounds/experiment.module.css";

const CreatorDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCreatorData = async () => {
            try {
                // Obtener datos del usuario directamente
                const userResponse = await fetch(`http://localhost:3000/users/${id}`);
                const userData = await userResponse.json();

                // Verificar si el usuario tiene una membresía de tipo "creator"
                if (userData.memberships && userData.memberships.type === "creator") {
                    setCreator(userData);
                } else {
                    setCreator(null);
                }
            } catch (error) {
                console.error("Error fetching creator data:", error);
                setCreator(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCreatorData();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!creator) {
        return <div>Creator not found</div>;
    }

    return (
        <main className={styles.fondo}>
            <CreatorPage creator={creator} />
        </main>
    );
};

export default CreatorDetailPage;