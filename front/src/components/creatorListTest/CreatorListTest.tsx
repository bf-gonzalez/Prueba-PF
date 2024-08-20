import { IComicListProps, IComicTest, ICreatorListProps, ICreatorTest } from "@/interface";
import { Josefin_Sans } from "next/font/google";
import ComicCard from "../comicCard/ComicCard";
import CreatorCard from "../creatorCard/CreatorCard";

const josefin = Josefin_Sans({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-josefin',
})

function CreatorList ({creators}: ICreatorListProps) {
    return(
        <main className="pt-12 pb-24 ml-12 mr-12 max-w-8xl">
            <section className="flex flex-row flex-wrap justify-evenly">
                {creators.map((creator: ICreatorTest) => (
                    <CreatorCard creator={creator} key={creator.id} />
                ))}
            </section>
        </main>
    );
}

export default CreatorList;