"use client"

import React, { useState } from 'react';

export default function SearchComic() {
    const [comics, setComics] = useState([]);
    const [images, setImages] = useState({});

    const fetchComics = async (author) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comics`);
            const allComics = await response.json();
            const filteredComics = allComics.filter(c => c.author === author);
            setComics(filteredComics);

            filteredComics.forEach(comic => {
                fetchImages(comic.url, comic.id);
            });
        } catch (error) {
            console.error('Error fetching comics:', error);
        }
    };

    const fetchImages = async (folderName, comicId) => {
        try {
            const response = await fetch(`/api/images?folder=${folderName}`);
            const data = await response.json();
            setImages(prevImages => ({ ...prevImages, [comicId]: data }));
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <button 
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                onClick={() => fetchComics('Carlos')}
            >
                mostrar comics de Carlos
            </button>
            <button 
                className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => fetchComics('Diego')}
            >
                mostrar comics de Diego
            </button>
            {comics.length > 0 && (
                <div className="mt-4">
                    {comics.map(comic => (
                        <div key={comic.id} className="mb-8">
                            <h1 className="text-2xl font-bold">{comic.title}</h1>
                            <div className="flex flex-wrap space-x-4">
                                {images[comic.id]?.map((image, index) => (
                                    <img key={index} src={image.secure_url} alt={image.public_id} className="w-48 h-64 object-cover" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}