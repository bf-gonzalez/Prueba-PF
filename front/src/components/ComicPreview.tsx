import { useRouter } from 'next/navigation';
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

const ComicPreview = ({ comic }) => {
  const router = useRouter();

  const handleComicClick = () => {
    router.push(`/all-comics/${comic.id}`);
  };

  return (
    <div className="flex flex-col items-center mb-8 mx-6">
      <div 
        className="relative p-2 border-4 border-red-800 border-opacity-60 shadow-lg w-72 h-96 cursor-pointer overflow-hidden rounded-2xl"
        onClick={handleComicClick}
      >
        <div className="absolute inset-0 flex items-center justify-center ">
          {comic.image && (
            <img 
              src={comic.image} 
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
  );
};

export default ComicPreview;