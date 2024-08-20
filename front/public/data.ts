import { IComicTest, ICreatorTest } from "@/interface";

export const comicsPreload: IComicTest[] = [
  {
    id: 1,
    name: "The boys #1",
    image: "https://m.media-amazon.com/images/I/71I509tOf2L._SY466_.jpg",
    author: "Dynamite entertainment",
  },
  {
    id: 2,
    name: "Marvel Secret Wars",
    image: "https://m.media-amazon.com/images/I/71tlAZgcXsL._SY466_.jpg",
    author: "Marvel Comics",
  },
  {
    id: 3,
    name: "Old Man Logan",
    image: "https://m.media-amazon.com/images/I/91Z1FuafxKL._SY466_.jpg",
    author: "Marvel Comics",
  },
  {
    id: 4,
    name: "Batman: Court of Owls 1",
    image: "https://m.media-amazon.com/images/I/910q7HA-VwL._SY466_.jpg",
    author: "DC Comics",
  },
  {
    id: 5,
    name: "Deadpool Kills The Marvel Universe",
    image: "https://m.media-amazon.com/images/I/51r+PUoxLJL._SY445_SX342_.jpg",
    author: "Marvel Comics",
  },
  {
    id: 6,
    name: "Planet Hulk",
    image: "https://m.media-amazon.com/images/I/81gTTH-LSLL._SY466_.jpg",
    author: "Marvel Comics",
  },
  {
    id: 7,
    name: "Uzumaki",
    image: "https://m.media-amazon.com/images/I/51Ef1f4UnqL._SY445_SX342_.jpg",
    author: "Junji Ito",
  },
  {
    id: 8,
    name: "Berserk #1",
    image: "https://m.media-amazon.com/images/I/51N8ux5C+HL._SY445_SX342_.jpg",
    author: " Kentaro Miura",
  },
  {
    id: 9,
    name: "Dragon Ball #1",
    image: "https://m.media-amazon.com/images/I/515-EdWvVaL._SY445_SX342_.jpg",
    author: " Akira Toriyama",
  },

  {
    id: 10,
    name: "BATMAN BEYOND",
    image: "https://m.media-amazon.com/images/I/51GfFmlDuGL._SY445_SX342_.jpg",
    author: " DC Comics",
  },
  {
    id: 11,
    name: "THE BOYS HEROGASM",
    image: "https://m.media-amazon.com/images/I/81aXHtxv7pL._SY466_.jpg",
    author: " Dynamite Entertainment",
  },
  {
    id: 12,
    name: "MILES MORALES #1",
    image: "https://i.redd.it/y6psp2bbh0821.jpg",
    author: " Marvel Comics",
  },
  {
    id: 13,
    name: "JUJUTSU KAISEN #5",
    image:
      "https://preview.redd.it/ka8zimxbfrq71.jpg?width=1526&format=pjpg&auto=webp&s=837cae6d596d034de77f9d259e9ee863fd868af5",
    author: "Gege Akutami",
  },
  {
    id: 14,
    name: "DAREDEVIL DEVIL´S REIGN",
    image:
      "https://pbs.twimg.com/media/E_fTA0EWQAM5Vys?format=jpg&name=4096x4096",
    author: " Marvel Comics",
  },
];

export const trendingPreload: IComicTest[] = [
  {
    id: 10,
    name: "BATMAN BEYOND",
    image: "https://m.media-amazon.com/images/I/51GfFmlDuGL._SY445_SX342_.jpg",
    author: " DC Comics",
  },
  {
    id: 11,
    name: "THE BOYS HEROGASM",
    image: "https://m.media-amazon.com/images/I/81aXHtxv7pL._SY466_.jpg",
    author: " Dynamite Entertainment",
  },
  {
    id: 12,
    name: "MILES MORALES #1",
    image: "https://i.redd.it/y6psp2bbh0821.jpg",
    author: " Marvel Comics",
  },
  {
    id: 13,
    name: "JUJUTSU KAISEN #5",
    image:
      "https://preview.redd.it/ka8zimxbfrq71.jpg?width=1526&format=pjpg&auto=webp&s=837cae6d596d034de77f9d259e9ee863fd868af5",
    author: "Gege Akutami",
  },
  {
    id: 14,
    name: "DAREDEVIL DEVIL'S REIGN",
    image:
      "https://pbs.twimg.com/media/E_fTA0EWQAM5Vys?format=jpg&name=4096x4096",
    author: " Marvel Comics",
  },

];

export const creatorsPreload: ICreatorTest[] = [
  {
    id: "1c",
    username: "Marvel Comics",
    pfp: "https://m.media-amazon.com/images/I/91nxjwMsaZL._AC_SX679_.jpg",
  },

  {
    id: "2c",
    username: "DC Comics",
    pfp: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/02/dc-comics-1876595.jpg?tf=1200x",
  },
  {
    id: "3c",
    username: "Dynamite Entertainment",
    pfp: "https://m.media-amazon.com/images/I/61189R+UonL._SY445_SX342_.jpg",
  },
];

export const sixComics = comicsPreload.slice(0, 6);
export const trendingComics = comicsPreload.slice(0, 5);

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
