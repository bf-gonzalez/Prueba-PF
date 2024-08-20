'use client'
import { IComic, IComicProps, IComicTest } from "@/interface";
import { useRouter } from "next/navigation";
import { Bebas_Neue, Josefin_Sans } from "next/font/google";

const  josefin = Josefin_Sans({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});
const  bebas = Bebas_Neue({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

interface ComicPageProps {
    comic: IComic;
  }

function ComicCard({comic}: IComicProps) {
    const router = useRouter();
    const handleComicClick = () => {
        router.push(`/comic/${comic.title}`);
    };

    return (
        <main className="flex flex-col text-center pl-6 pr-6 pb-10">
            <button onClick={handleComicClick}
            className="hover:scale-105 duration-300">

            <img src= {comic.url} alt={comic.title}
            className="rounded-xl border-2 h-96 border-rose-900 p-2
            object-cover object-center w-64"
            height={400} />

            </button>

            <h2 className={`${bebas.variable} font-sans 
            text-3xl text-yellow-400 pt-4 max-w-64 flex-wrap
            `}>
                {comic.title}
            </h2>
            <p className={`${bebas.variable} font-sans 
            text-xl text-white  max-w-64 flex-wrap
            `}>
                {comic.author}
            </p>

        </main>
    )
}

export default ComicCard;