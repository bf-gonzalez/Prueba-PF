import { IComicListProps, IComicTest, IComic } from "@/interface";
import { Josefin_Sans } from "next/font/google";
import ComicCard from "../comicCard/ComicCard";

const josefin = Josefin_Sans({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-josefin',
})

function ComicList ({comics}: IComicListProps) {
    if (!Array.isArray(comics)) {
        return <div>No comics available</div>;
    }

    const numberOfComics = comics.length;

    return(
        <main className="pt-12 pb-24 ml-12 mr-12 max-w-8xl">

<div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Available Comics: {numberOfComics}</h2>
      </div>
            <section className="flex flex-row flex-wrap justify-evenly">
                {comics.map((comic: IComic) => (
                    <ComicCard comic={comic} key={comic.title} />
                ))}
            </section>
        </main>
    );
}

export default ComicList;