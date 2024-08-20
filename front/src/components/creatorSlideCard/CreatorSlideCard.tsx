'use client'
import { IComicProps, ICreatorProps } from "@/interface";
import { useRouter } from "next/navigation";
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

function CreatorSlideCard({ creator }: ICreatorProps) {
    const router = useRouter();
    const handleCreatorClick = () => {
        router.push(`/creator/${creator.id}`);
    };

    return (
        <main className="flex flex-col items-center text-center pl-6 pr-6">
            <button onClick={handleCreatorClick}
            className="hover:scale-105 duration-300 relative">

                
                <div className="relative">
                    <img
                        src={creator.pfp}
                        alt={creator.username}
                        className="rounded-full border-2 h-[50vh] w-[25vw] object-cover object-center border-blue-700 border-opacity-70 p-2"
                        height={600}
                    />

            
                    <div className="opacity-0 absolute inset-0 flex flex-col justify-end items-center p-12 bg-black bg-opacity-0 rounded-full hover:opacity-100 hover:bg-opacity-65 duration-300">
                        <h2 className={`${bebas.variable} font-sans text-5xl text-yellow-400 `}>
                            {creator.username}
                        </h2>
                    </div>
                </div>
            </button>
        </main>
    );
}

export default CreatorSlideCard;
