'use client'
import { IComicProps, IComicTest, ICreatorProps, ICreatorTest } from "@/interface";
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

interface CreatorPageProps {
    creator: ICreatorTest;
  }

function CreatorCard({creator}: ICreatorProps) {
    const router = useRouter();
    const handleCreatorClick = () => {
        router.push(`/creator/${creator.id}`);
    };

    return (
        <main className="flex flex-col text-center pl-6 pr-6 pb-10">
            <button onClick={handleCreatorClick}
            className="hover:scale-105 duration-300">

            <img src= {creator.pfp} alt={creator.username}
            className="rounded-xl border-2 h-96 border-rose-900 p-2
            object-cover object-center w-64"
            height={400} />

            </button>

            <h2 className={`${bebas.variable} font-sans 
            text-3xl text-yellow-400 pt-4 max-w-64 flex-wrap
            `}>
                {creator.username}
            </h2>

        </main>
    )
}

export default CreatorCard;