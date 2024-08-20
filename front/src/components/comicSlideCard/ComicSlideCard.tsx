'use client'
import { IComicProps } from "@/interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bebas_Neue, Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
    subsets: ['latin'],
    weight: ['600'],
    variable: '--font-josefin',
});
const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

function ComicSlideCard({ comic }: IComicProps) {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState(comic.folderName.startsWith('http') ? comic.folderName : comic.image);

    useEffect(() => {
        const fetchImageFromCloudinary = async () => {
            if (!comic.folderName.startsWith('http')) {
                try {
                    const response = await axios.get(`/api/images?folder=${comic.folderName}`);
                    if (response.data.length > 0) {
                        setImageUrl(response.data[0].secure_url);
                    }
                } catch (error) {
                    console.error('Error fetching image from Cloudinary:', error);
                }
            }
        };

        fetchImageFromCloudinary();
    }, [comic.folderName]);

    const handleComicClick = () => {
        router.push(`/comic/${comic.id}`);
    };

    return (
        <main className="flex flex-col items-center text-center">
            <button onClick={handleComicClick}
            className="hover:scale-105 duration-300 relative pl-4 pr-4">

                <div className="relative">
                    <img
                        src={imageUrl}
                        alt={comic.title}
                        className="rounded-xl border-2 h-[70vh] w-48 object-cover object-center border-blue-700 border-opacity-70 p-2"
                        height={600}
                    />

                    <div className="opacity-0 absolute inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-0 hover:opacity-100 hover:bg-opacity-50 rounded-xl duration-300">
                        <h2 className={`${bebas.variable} font-sans text-4xl text-yellow-400`}>
                            {comic.title}
                        </h2>
                        <p className={`${bebas.variable} font-sans text-lg text-rose-600`}>
                            {comic.author}
                        </p>
                    </div>
                </div>
            </button>
        </main>
    );
}

export default ComicSlideCard;