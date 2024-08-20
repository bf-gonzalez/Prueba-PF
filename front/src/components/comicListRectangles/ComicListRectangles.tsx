import { IComic, IComicListProps, IComicTest } from "@/interface";
import { Josefin_Sans } from "next/font/google";
import ComicCard from "../comicCard/ComicCard";
import ComicRectangle from "../comicRectangle/ComicRectangle";
import { shuffleArray, sixComics } from "public/data";

const josefin = Josefin_Sans({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-josefin',
})

function ComicListRectangles ({comics, limit}: IComicListProps) {

    const randomComics = shuffleArray(comics).slice(0,limit)

    return(
        <main className="pt-12 pb-24 ml-12 mr-12 max-w-8xl">
            <section className="flex flex-row flex-wrap  justify-evenly">
                {randomComics.map((comic: IComic) => (
                    <ComicRectangle comic={comic} key={comic.title} />
                ))}
            </section>
        </main>
    );
}

export default ComicListRectangles;