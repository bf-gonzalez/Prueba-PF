"use client";
import { IComicTest } from "@/interface";
import { Bebas_Neue, Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-bebas",
});
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

interface ComicPageProps {
  comic: IComicTest;
}

const ComicPage: React.FC<ComicPageProps> = ({ comic }) => {
  return (
    <main className="">
      <section className="flex flex-row max-w-screen-2xl pt-44 pb-36 justify-evenly items-center">
      <img
        src={comic.image}
        alt={comic.name}
        className="rounded-xl border-2 h-[72vh] border-rose-900 p-2
            object-cover object-top w-[25vw]"
        height={700}
      />
      <div className="flex flex-col">

      <h2 className={`${bebas.variable} uppercase font-sans text-9xl text-yellow-400 max-w-4xl flex-wrap`}>
        {comic.name}
      </h2>
      <div className="flex flex-row self-start pt-2 space-x-2">
      <p className={`${bebas.variable} font-sans text-6xl text-rose-800 max-w-2xl flex-wrap self-center`}>
        Subido por: 
      </p>
      <button className={`${bebas.variable} font-sans text-6xl text-white max-w-2xl flex-wrap self-center hover:text-yellow-400 duration-300`}>
      {comic.author}
      </button>
      </div>
      
      <p className={`${josefin.variable} font-sans pt-12 text-4xl text-white max-w-3xl flex-wrap text-end self-end border-b-2 border-yellow-400`}>
        DISFRUTALO CON TU SUBSCRIPCIÓN!</p>
        <button className="hover:scale-105 duration-300 self-end">
        <img src="/images/leerAlt.png" className="max-w-80 pt-4 "/>
        </button>
      </div>
      </section>
    </main>
  );
};

export default ComicPage;
