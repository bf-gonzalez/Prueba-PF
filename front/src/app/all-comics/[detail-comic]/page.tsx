"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import styles from "@/components/backgrounds/experiment.module.css";
import { Bebas_Neue, Josefin_Sans } from 'next/font/google';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-josefin',
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const ComicDetailPage = () => {
  const params = useParams();
  const detailComic = params?.['detail-comic'];
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [topComics, setTopComics] = useState([]);

  useEffect(() => {
    const decodedUser = localStorage.getItem('decodedUser');
    if (decodedUser) {
      setUser(JSON.parse(decodedUser));
    }
  }, []);

  useEffect(() => {
    if (detailComic) {
      const fetchComic = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/comics/${detailComic}`);
          setComic(response.data);
          setLoading(false);

          if (isValidUrl(response.data.folderName)) {
            setImages([{ secure_url: response.data.folderName }]);
          } else {
            fetchImages(response.data.folderName);
          }

          const commentsWithUsernames = await Promise.all(
            response.data.comment.map(async (comment) => {
              const commentResponse = await axios.get(`http://localhost:3000/comment/${comment.id}`);
              const userResponse = await axios.get(`http://localhost:3000/users/${commentResponse.data.user.id}`);
              return {
                ...comment,
                username: commentResponse.data.user.username,
                user: {
                  ...commentResponse.data.user,
                  profilePicture: userResponse.data.profilePicture || "/images/defaultProfile.png",
                },
              };
            })
          );

          setComments(commentsWithUsernames);
        } catch (error) {
          console.error('Error fetching comic:', error);
          setLoading(false);
        }
      };

      fetchComic();
    }
  }, [detailComic]);

  useEffect(() => {
    const fetchTopComics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/comics?limit=5');
        setTopComics(response.data);
      } catch (error) {
        console.error('Error fetching top comics:', error);
      }
    };

    fetchTopComics();
  }, []);

  const fetchImages = async (folderName) => {
    try {
      const response = await axios.get(`/api/images?folder=${folderName}`);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleCommentSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('decodedUser'));
    if (!user || !user.id) {
      console.error('User not found in localStorage');
      return;
    }

    const commentData = {
      userId: user.id,
      content: newComment,
    };

    try {
      const response = await axios.post(`http://localhost:3000/comment/${detailComic}`, commentData);
      setNewComment('');
      setComments([...comments, {
        id: response.data.id,
        content: response.data.content,
        created_at: response.data.created_at,
        username: response.data.user.username,
        user: response.data.user,
      }]);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!comic) {
    return <div>Comic not found</div>;
  }

  const isLimitedUser = !user || !['monthly_member', 'annual_member', 'creator'].includes(user.MembershipType);

  return (
    <main className={styles.fondo}>
      <section className="pt-36 flex flex-col items-center p-4 ">
        <div className="flex flex-row pb-16 ">
          {images.length > 0 && (
            <img
              src={images[0].secure_url}
              alt={comic.title}
              className=" ml-auto rounded-xl border-2 h-[72vh] border-rose-900 p-2 object-cover object-center w-[24vw]"
              height={350}
            />
          )}
          <div className="self-center w-[50vw] ml-20">
            <h1 className={`${bebas.variable} font-sans text-8xl text-yellow-400 text-center`}>{comic.title}</h1>
            <p className={`${josefin.variable} font-sans text-4xl text-white pb-14 pt-6 text-center uppercase`}>{comic.description}</p>
            <div className='flex flex-row'>
              <p className={`${bebas.variable} font-sans text-4xl text-rose-700 pr-3`}>Autor:</p>
              <button
                className={`${bebas.variable} font-sans text-4xl text-white hover:text-yellow-400 duration-300`}
                onClick={() => router.push(`/creator/${comic.user.id}`)}
              >
                {comic.author}
              </button>
            </div>
            <div className='flex flex-row'>
              <p className={`${bebas.variable} font-sans text-4xl text-rose-700 pr-3`}>Categoria:</p>
              <p className={`${bebas.variable} font-sans text-4xl text-white`}>{comic.categoryname || 'N/A'}</p>
            </div>
            <div className='flex flex-row'>
              <p className={`${bebas.variable} font-sans text-4xl text-rose-700 pr-3`}>Fecha de publicación:</p>
              <p className={`${bebas.variable} font-sans text-4xl text-white`}>{comic.data_post}</p>
            </div>
            <div className='flex flex-row'>
              <p className={`${bebas.variable} font-sans text-4xl text-rose-700 pr-3`}>Tipo de Cómic:</p>
              <p className={`${bebas.variable} font-sans text-4xl text-white`}>{comic.typecomic || 'N/A'}</p>
            </div>
            <div className='flex flex-row'>
              <p className={`${bebas.variable} font-sans text-4xl text-rose-700 pr-3`}>Idioma:</p>
              <p className={`${bebas.variable} font-sans text-4xl text-white`}>{comic.idioma || 'N/A'}</p>
            </div>
            {isLimitedUser && (
              <p className={`${bebas.variable} font-sans text-4xl text-yellow-400 text-center mt-16`}>
                Para disfrutar de este contenido compra una subscripción!
              </p>
            )}
          </div>
        </div>
        {images.length > 0 && (
          <div className={`mt-4 grid grid-cols-10 gap-2 border-2 border-yellow-400 border-opacity-60 p-2 rounded-xl`}>
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.secure_url}
                  alt={`Comic image ${index + 1}`}
                  className={`w-[10vw] h-[28vh] cursor-pointer ${isLimitedUser && index >= 2 ? 'blur-sm' : ''}`}
                  onClick={() => !isLimitedUser && router.push(`/upload/${comic.folderName}?page=${index + 1}`)}
                />
                <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white px-2 py-1 rounded-tl">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 w-full flex flex-col pl-8 pb-16">
          <h2 className="text-xl font-bold mb-4">Comentarios</h2>
          <input
            type="text"
            placeholder="Escribe tu comentario"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-4 mb-4 border-2 border-rose-900 rounded bg-[#01061A] text-white placeholder-gray-500 w-[30vw] h-[12vh]"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 w-[10vw] h-[8vh] rounded-xl"
          >
            Enviar Comentario
          </button>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="mb-4 p-4 border-2 border-rose-900 rounded bg-[#01061A]">
                <div className="flex items-center mb-2">
                  <img
                    src={comment.user.profilePicture || "/images/defaultProfile.png"}
                    alt="Profile Picture"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <p className="text-sm text-gray-500">{comment.username}</p>
                </div>
                <p>{comment.content}</p>
                <p className="text-sm text-gray-500">Fecha: {new Date(comment.created_at).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p className='text-center text-3xl pt-8'>No hay comentarios aún.</p>
          )}
        </div>
        <img src="/images/masComics.png"
          className="max-w-sm ml-auto mr-auto pb-4 "
          height={400} />
        <div className="flex flex-row flex-wrap justify-center mt-20 w-screen">
          {topComics.slice(0, 8).map((comic, index) => (
            <div key={index} className="flex flex-col items-center mb-8 mx-6">
              <div
                className="relative p-2 border-4 border-red-800 border-opacity-60 shadow-lg w-72 h-96 cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => router.push(`/all-comics/${comic.id}`)}
              >
                <div className="absolute inset-0 flex items-center justify-center ">
                  {comic.folderName.startsWith('http') ? (
                    <img
                      src={comic.folderName}
                      alt={comic.title}
                      className="w-72 h-96 object-cover object-center p-4"
                    />
                  ) : (
                    <img
                      src={`/api/images?folder=${comic.folderName}`}
                      alt={comic.title}
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
      </section>
    </main>
  );
};

export default ComicDetailPage;