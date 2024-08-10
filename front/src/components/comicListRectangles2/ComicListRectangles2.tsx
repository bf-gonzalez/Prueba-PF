"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from "@/components/backgrounds/experiment.module.css";
import { Bebas_Neue } from "next/font/google";
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/searchBar/SearchBar';
import DateFilter from '../../components/DateFilter';
import CategoryFilter from '../../components/CategoryFilter';

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

export default function comicListRectangles2 () {
  const [comics, setComics] = useState([]);
  const [images, setImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [comicsPerPage] = useState(8); // Número de cómics por página
  const [searchQuery, setSearchQuery] = useState('');
  const [dateOrder, setDateOrder] = useState<'newest' | 'oldest'>('newest');
  const [categoryFilter, setCategoryFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comics`);
        setComics(response.data);
        console.log("Fetched Comics:", response.data)
        response.data.forEach(comic => {
          console.log("FolderName:", comic.folderName)
          if (isValidUrl(comic.folderName)) {
            setImages(prevImages => ({ ...prevImages, [comic.id]: [{ secure_url: comic.folderName }] }));
          } else {
            fetchImages(comic.folderName, comic.id);
          }
        });
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    };

    const fetchImages = async (folderName, comicId) => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/images?folder=${folderName}`);
        setImages(prevImages => ({ ...prevImages, [comicId]: response.data }));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchComics();
  }, []);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  };

  const handleComicClick = (comicId) => {
    router.push(`/all-comics/${comicId}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilterChange = (order) => {
    setDateOrder(order);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
  };

  const filteredComics = comics
    .filter(comic => comic.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(comic => !categoryFilter || comic.categoryname === categoryFilter)
    .sort((a, b) => {
      if (dateOrder === 'newest') {
        return new Date(b.data_post) - new Date(a.data_post);
      } else {
        return new Date(a.data_post) - new Date(b.data_post);
      }
    });

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredComics.length / comicsPerPage);

  // Obtener los cómics para la página actual
  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentComics = filteredComics.slice(indexOfFirstComic, indexOfLastComic);

  return (
    <main className={styles.fondo}>
      <section className="flex flex-col items-center pt-36 pb-40 ">
        <div className="flex flex-row flex-wrap justify-center mt-20 w-screen">
          {currentComics.map((comic, index) => (
            <div key={index} className="flex flex-col items-center mb-8 mx-6">
              <div 
                className="relative p-2 border-4 border-red-800 border-opacity-60 shadow-lg w-72 h-96 cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => handleComicClick(comic.id)}
              >
                <div className="absolute inset-0 flex items-center justify-center ">
                  {images[comic.id]?.[0] && (
                    <img 
                      src={images[comic.id][0].secure_url} 
                      alt={images[comic.id][0].public_id} 
                      className="w-72 h-96 object-cover object-center p-4" 
                    />
                  )}
                </div>
                <div className="opacity-0 absolute inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-0 hover:opacity-100 hover:bg-opacity-70 rounded-xl duration-300">
                  <p className={`${bebas.variable} text-center mt-4 text-lg font-bold uppercase`}>{comic.description}</p>
                </div>
              </div>
              <p className="text-lg text-gray-400">{comic.categoryname}</p>
              <h1 className={`${bebas.variable} font-sans text-3xl font-bold mt-2 w-72 text-center text-yellow-400 `}>{comic.title}</h1>
              <p className={`${bebas.variable} font-sans text-2xl text-white`}>{comic.author}</p>
              <p className={`${bebas.variable} text-lg font-bold uppercase text-rose-700`}>{comic.data_post}</p>
            </div>
          ))}
        </div>
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