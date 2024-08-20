'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreatorPage from "@/components/creatorPage/CreatorPage";
import styles from "@/components/backgrounds/experiment.module.css";
import axios from "axios";

const CreatorDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeComics, setActiveComics] = useState([]);
    const [images, setImages] = useState({});

    useEffect(() => {
        const fetchCreatorData = async () => {
            try {
                // Obtener datos del usuario directamente
                const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
                const userData = await userResponse.json();

                // Verificar si el usuario tiene una membresía de tipo "creator"
                if (userData.memberships && userData.memberships.type === "creator") {
                    setCreator(userData);
                    // Filtrar cómics activos
                    const activeComics = userData.comics.filter(comic => comic.isActive);
                    setActiveComics(activeComics);

                    // Obtener imágenes para cada cómic
                    activeComics.forEach(comic => {
                        fetchImages(comic.folderName, comic.id);
                    });
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

        const fetchImages = async (folderName, comicId) => {
            try {
                const response = await axios.get(`/api/images?folder=${folderName}`);
                setImages(prevImages => ({ ...prevImages, [comicId]: response.data }));
            } catch (error) {
                console.error('Error fetching images:', error);
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
            <div className="flex flex-row flex-wrap justify-center mt-20 w-screen">
                {activeComics.map((comic, index) => (
                    <div key={index} className="flex flex-col items-center mb-8 mx-6">
                        <div
                            className="relative p-2 border-4 border-red-800 border-opacity-60 shadow-lg w-72 h-96 cursor-pointer overflow-hidden rounded-2xl"
                            onClick={() => router.push(`/all-comics/${comic.id}`)}
                        >
                            <div className="absolute inset-0 flex items-center justify-center ">
                                {images[comic.id]?.[0] ? (
                                    <img
                                        src={images[comic.id][0].secure_url}
                                        alt={comic.title}
                                        className="w-72 h-96 object-cover object-center p-4"
                                    />
                                ) : (
                                    <div className="w-72 h-96 flex items-center justify-center bg-gray-200">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                            </div>
                            <div className="opacity-0 absolute inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-0 hover:opacity-100 hover:bg-opacity-70 rounded-xl duration-300">
                                <p className="text-center mt-4 text-lg font-bold uppercase">{comic.description}</p>
                            </div>
                        </div>
                        <p className="text-lg text-gray-400">{comic.categoryname}</p>
                        <h1 className="font-sans text-3xl font-bold mt-2 w-72 text-center text-yellow-400">{comic.title}</h1>
                        <p className="font-sans text-2xl text-white">{comic.author}</p>
                        <p className="text-lg font-bold uppercase text-rose-700">{comic.data_post}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default CreatorDetailPage;