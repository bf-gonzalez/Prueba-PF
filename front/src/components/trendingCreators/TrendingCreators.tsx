import { useEffect, useState } from "react";
import axios from "axios";
import { Josefin_Sans } from "next/font/google";
import { Bebas_Neue } from "next/font/google";
import { useRouter } from "next/navigation";

const josefin = Josefin_Sans({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-josefin',
});

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

interface Creator {
    id: string;
    username: string;
    profilePicture: string;
}

function TrendingCreators() {
    const [creators, setCreators] = useState<Creator[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const membershipsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/membership`);
                const memberships = membershipsResponse.data;

                const creatorPromises = memberships
                    .filter((membership: any) => membership.type === 'creator')
                    .map((membership: any) => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${membership.user.id}`));

                const creatorsResponses = await Promise.all(creatorPromises);
                const creatorsData = creatorsResponses.map(response => response.data);

                setCreators(creatorsData);
            } catch (error) {
                console.error('Error fetching creators:', error);
            }
        };

        fetchCreators();
    }, []);

    return (
        <main className="pt-12 pb-24 ml-12 mr-12 max-w-8xl">
            <img src="/images/creadoresPopulares.png" alt="Creadores Populares" className="mx-auto mb-8 w-1/2" />
            <section className="flex flex-row flex-wrap justify-evenly">
                {creators.map((creator) => (
                    <div key={creator.id} className="flex flex-col items-center m-4">
                        <img
                            src={creator.profilePicture === "none" ? "/images/userIcon2.png" : creator.profilePicture}
                            className="rounded-full border-2 border-blue-700 h-32 w-32 object-cover cursor-pointer"
                            onClick={() => router.push(`/creator/${creator.id}`)}
                        />
                        <h2 className={`${bebas.variable} font-sans text-2xl text-white mt-2 cursor-pointer`} onClick={() => router.push(`/creator/${creator.id}`)}>
                            {creator.username}
                        </h2>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default TrendingCreators;