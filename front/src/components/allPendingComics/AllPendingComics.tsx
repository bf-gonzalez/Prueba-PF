"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from "@/components/backgrounds/experiment.module.css";
import { Bebas_Neue } from "next/font/google";
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/searchBar/SearchBar';
import DateFilter from '../../components/DateFilter';
import CategoryFilter from '../../components/CategoryFilter';
import DeleteComicButton from '../deleteComicBtn/DeleteComicBtn';
import AcceptComicButton from '../acceptComicBtn/AcceptComicBtn';

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const AllPendingComicsComponent: React.FC = () => {
  const [comics, setComics] = useState<any[]>([]); 
  const [images, setImages] = useState<{ [key: string]: any[] }>({}); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comicsPerPage] = useState<number>(12); 
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  ); 
  const [dateOrder, setDateOrder] = useState<'newest' | 'oldest'>(
    (localStorage.getItem('dateOrder') as 'newest' | 'oldest') || 'newest'
  ); 
  const [categoryFilter, setCategoryFilter] = useState<string[]>(
    JSON.parse(localStorage.getItem('categoryFilter') || '[]')
  ); 
  const router = useRouter();

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    const savedDateOrder = localStorage.getItem('dateOrder');
    const savedCategoryFilter = localStorage.getItem('categoryFilter');

    if (savedSearchQuery) setSearchQuery(savedSearchQuery);
    if (savedDateOrder) setDateOrder(savedDateOrder as 'newest' | 'oldest');
    if (savedCategoryFilter) setCategoryFilter(JSON.parse(savedCategoryFilter));

    const fetchComics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/comics/inactive');
        setComics(response.data);
        console.log("Fetched Comics:", response.data);
        response.data.forEach((comic: any) => {
          console.log("FolderName:", comic.folderName);
          if (isValidUrl(comic.folderName)) {
            setImages((prevImages) => ({
              ...prevImages,
              [comic.id]: [{ secure_url: comic.folderName }],
            }));
          } else {
            fetchImages(comic.folderName, comic.id);
          }
        });
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    };

    const fetchImages = async (folderName: string, comicId: string) => {
      try {
        const response = await axios.get(`/api/images?folder=${folderName}`);
        setImages((prevImages) => ({ ...prevImages, [comicId]: response.data }));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchComics();
  }, []);

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleComicClick = (comicId: string) => {
    router.push(`/all-comics/${comicId}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    localStorage.setItem('searchQuery', query.toLowerCase());
  };

  const handleFilterChange = (order: 'newest' | 'oldest') => {
    setDateOrder(order);
    localStorage.setItem('dateOrder', order);
  };

  const handleCategoryChange = (categories: string[]) => {
    setCategoryFilter(categories);
    localStorage.setItem('categoryFilter', JSON.stringify(categories));
  };

  const filteredComics = comics
    .filter((comic) =>
      comic.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((comic) => {
      const categoryMatches = categoryFilter.filter((category) =>
        (comic.categoryname || '').includes(category)
      ).length;
      return { ...comic, categoryMatches };
    })
    .sort((a, b) => b.categoryMatches - a.categoryMatches)
    .filter((comic) => categoryFilter.length === 0 || comic.categoryMatches > 0)
    .sort((a, b) => {
      if (dateOrder === 'newest') {
        return new Date(b.data_post).getTime() - new Date(a.data_post).getTime();
      } else {
        return new Date(a.data_post).getTime() - new Date(b.data_post).getTime();
      }
    });

  const totalPages = Math.ceil(filteredComics.length / comicsPerPage);

  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentComics = filteredComics.slice(
    indexOfFirstComic,
    indexOfLastComic
  );

  return (
    <main>
      <section className="flex flex-col items-center pt-16 pb-12">
        <div className="flex flex-col self-center pl-12">
          <SearchBar onSearch={handleSearch} initialQuery={searchQuery} placeholder={'Buscar Comics'} />
          <DateFilter onFilterChange={handleFilterChange} initialOrder={dateOrder} />
        </div>
        
        {currentComics.length === 0 ? (
          <div className="text-center  pb-20 pt-20">
            <h2 className={`${bebas.variable} font-sans text-8xl font-bold text-white`}>Bien hecho!</h2>
            <p className="mt-4 text-5xl text-white">No hay comics por aceptar en este momento</p>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap justify-center mt-10 w-screen">
            {currentComics.map((comic, index) => (
              <div key={index} className="flex flex-row items-center mb-8 bg-gray-800 bg-opacity-60 rounded-3xl mx-4 my-4">
                <div
                  className="relative p-2 border-opacity-60 shadow-lg w-44 h-52 cursor-pointer overflow-hidden hover:scale-105 duration-300"
                  onClick={() => handleComicClick(comic.id)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {images[comic.id]?.[0] && (
                      <img
                        src={images[comic.id][0].secure_url}
                        alt={images[comic.id][0].public_id}
                        className="w-72 h-96 object-contain object-center p-4 rounded-2xl"
                      />
                    )}
                  </div>
                </div>

                <section className='flex flex-col text-center'>
                  <p className="text-lg text-gray-400">{comic.categoryname}</p>
                  <h1 className={`${bebas.variable} font-sans text-3xl font-bold mt-2 w-72 text-center text-yellow-400 `}>{comic.title}</h1>
                  <p className={`${bebas.variable} font-sans text-2xl text-white`}>{comic.author}</p>
                  <p className={`${bebas.variable} text-lg font-bold uppercase text-rose-700`}>{comic.data_post}</p>
                  <AcceptComicButton comicId={comic.id} isDeleted={comic.isDeleted} />
                </section>
              </div>
            ))}
          </div>
        )}

        <div className='flex self-end ml-auto pr-8'>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      </section>
    </main>
  );
};

export default AllPendingComicsComponent;
