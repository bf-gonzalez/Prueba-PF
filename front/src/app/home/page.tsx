'use client'
import Carrousel from "@/components/carrousel/Carrousell";
import ComicList from "@/components/comicListTest/ComicListTest";
import CreatorList from "@/components/creatorListTest/CreatorListTest";
import TrendingComics from "@/components/trendingComics/TrendingComics";
import TrendingCreators from "@/components/trendingCreators/TrendingCreators";
import { comicsPreload, creatorsPreload, trendingPreload } from "public/data";
import styles from "@/components/backgrounds/experiment.module.css";
import { usePathname, useRouter } from "next/navigation";
import ChatbotIcon from '@/components/Chatbot/ChatbotIcon';
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

function home() {

  const router = useRouter();

  const pathname = usePathname();

  return (
    <main className={styles.fondo}>
      <div className="pt-24 md:pt-36">
        <Carrousel />
      </div>

      <ChatbotIcon />

      <section>
        <img
          src="/images/tendencia.png"
          className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto pt-20 md:pt-56 pb-6 md:pb-4"
          alt="Tendencia"
        />
        <div className="flex flex-row md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
          <TrendingComics comics={trendingPreload} />
        </div>
      </section>

      <section className="flex flex-col md:flex-row pb-16 mt-2 md:mt-4 space-y-6 md:space-y-0 md:justify-end md:pr-28">

        <div className="flex flex-col text-center self-end">
        <h1 className={`${bebas.variable} font-sans text-5xl md:text-6xl`}>VER TODOS >>></h1>
        <button
          type="button"
          onClick={() => router.push('/all-comics')}
          className="mx-auto"
        >
          <img
            src="/images/comicsBtn.png"
            className="max-w-xs sm:max-w-md md:max-w-sm lg:max-w-xs transition-all custom-transition duration-500 hover:scale-105"
            alt="Comics"
          />
        </button>
        </div>
      </section>

      <section className="mt-10 md:mt-6">
        <img
          src="/images/creadoresPopulares.png"
          className="max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl mx-auto"
          alt="Creadores Populares"
        />
        <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6 mt-6">
          <TrendingCreators creators={creatorsPreload} />
        </div>
      </section>


    </main>
  );
}

export default home;
