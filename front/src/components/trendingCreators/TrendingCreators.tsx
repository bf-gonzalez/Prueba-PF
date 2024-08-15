import { useEffect, useState } from "react";
import axios from "axios";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-josefin',
});

interface Creator {
    id: string;
    username: string;
    profilePicture: string;
}

function TrendingCreators() {
    const [creators, setCreators] = useState<Creator[]>([]);

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
            <section className="flex flex-row flex-wrap justify-evenly">
                {creators.map((creator) => (
                    <div key={creator.id} className="flex flex-col items-center m-4">
                        <img
                            src={creator.profilePicture}
                            alt={creator.username}
                            className="rounded-full border-2 h-32 w-32 object-cover"
                        />
                        <h2 className="text-xl mt-2 text-white">{creator.username}</h2>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default TrendingCreators;