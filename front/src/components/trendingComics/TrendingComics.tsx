"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IComic } from "@/interface";
import { Josefin_Sans } from "next/font/google";
import ComicSlideCard from "../comicSlideCard/ComicSlideCard";

const josefin = Josefin_Sans({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-josefin',
});

function TrendingComics() {
    const [comics, setComics] = useState<IComic[]>([]);
    const [images, setImages] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comics`);
                const allComics = response.data;
                const randomComics = getRandomComics(allComics, 5); // Obtener 5 cómics aleatorios
                setComics(randomComics);

                randomComics.forEach(comic => {
                    if (isValidUrl(comic.folderName)) {
                        setImages(prevImages => ({ ...prevImages, [comic.id]: [{ secure_url: comic.folderName }] }));
                    } else {
                        fetchImages(comic.folderName, comic.id);
                    }
                });
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        };

        const fetchImages = async (folderName, comicId) => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/images?folder=${folderName}`);
                setImages(prevImages => ({ ...prevImages, [comicId]: response.data }));
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        const isValidUrl = (string) => {
            try {
                new URL(string);
                return true;
            } catch (_) {
                return false;
            }
        };

        const getRandomComics = (comics, count) => {
            const shuffled = comics.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };

        fetchComics();
    }, []);

    const handleComicClick = (comicId) => {
        router.push(`/all-comics/${comicId}`);
    };

    return (
        <main className="pt-12 pb-24 ml-12 mr-12 max-w-8xl">
            <section className="flex flex-row flex-wrap justify-evenly">
                {comics.map((comic: IComic) => (
                    <div key={comic.id} onClick={() => handleComicClick(comic.id)}>
                        <ComicSlideCard comic={comic} />
                    </div>
                ))}
            </section>
        </main>
    );
}

export default TrendingComics;