"use client";
import { ICreatorTest } from "@/interface";
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

interface CreatorPageProps {
  creator: ICreatorTest;
}

const CreatorPage: React.FC<CreatorPageProps> = ({ creator }) => {
  return (
    <main className="">
      <section className="flex flex-row max-w-screen-2xl pt-44 pb-36 justify-evenly items-center">
        <img
          src={creator.profilePicture}
          alt={creator.username}
          className="rounded-xl border-2 h-[48vh] border-rose-900 p-2
            object-cover object-center w-[50vw]"
          height={700}
        />

        <h2 className={`${bebas.variable} uppercase font-sans text-9xl text-yellow-400 max-w-2xl flex-wrap text-center`}>
          {creator.username}
        </h2>
      </section>
    </main>
  );
};

export default CreatorPage;