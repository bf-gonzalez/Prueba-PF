"use client";
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../components/regularBackground/RegularBackground.module.css';
import ImageUpload from '@/components/ImageUpload';
import { UserContext } from '@/context/userContext';
import CategorySelector from '@/components/ImageUploadHelper/CategorySelector';
import AlertSignIn from '@/components/alertSignIn/AlertSignIn';
import axios from 'axios';

export default function UploadPage() {
  const { isLogged, user } = useContext(UserContext);
  const [folderName, setFolderName] = useState('');
  const [description, setDescription] = useState('');
  const [comicData, setComicData] = useState(null); 
  const router = useRouter();
  const [uploadMode, setUploadMode] = useState('single'); 
  const [categories, setCategories] = useState({ categories: [], typeComic: null, language: null });
  const [membershipType, setMembershipType] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [folderNameError, setFolderNameError] = useState<string | null>(null);

  useEffect(() => {
    const decodedUser = localStorage.getItem("decodedUser");
    if (decodedUser) {
      const user = JSON.parse(decodedUser);
      setMembershipType(user.MembershipType);
      setIsAdmin(user.role.includes("admin"));
      console.log(user.membershipType);
    } else {
      setMembershipType(null);
    }
  }, [user]);

  const validateFolderName = (name: string) => {
    if (name.length < 3) {
      setFolderNameError('El nombre del cómic debe tener al menos 3 letras');
    } else {
      setFolderNameError(null);
    }
  };

  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFolderName(name);
    validateFolderName(name);
  };

  const handleComicDataChange = (data) => {
    setComicData(data);
  };

  const resetFields = () => {
    setFolderName('');
    setDescription('');
    setComicData(null);
    setCategories({ categories: [], typeComic: null, language: null });
  };

  const handleCategoryChange = (selectedCategories) => {
    setCategories(selectedCategories);
  };

  const showSubscriptionPage = isLogged && (['creator'].includes(membershipType) || isAdmin);

  return (
    <main className={styles.fondo}>
      {!showSubscriptionPage ? (
        <AlertSignIn />
      ) : (
        <section>
          <div className="flex flex-col items-center justify-center lg:mt-32 mt-32 p-2">
            <section className='flex'>
            <img
          src="/images/mis3.png"
          className="max-w-xs sm:max-w-md md:max-w-md lg:max-w-md mx-auto pb-6 md:pb-4"
          alt="Instrucciones"
        />
            </section>

            <div className="flex flex-col items-center">
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setUploadMode('single')}
                  className={`px-4 py-2 rounded ${uploadMode === 'single' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-300`}
                >
                  Subir Imágenes Individuales
                </button>
                <button
                  onClick={() => setUploadMode('folder')}
                  className={`px-4 py-2 rounded ${uploadMode === 'folder' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-300`}
                >
                  Subir Carpeta
                </button>
              </div>
              <div className="w-full mb-4">
                <input
                  type="text"
                  placeholder="Nombre del Cómic"
                  value={folderName}
                  onChange={handleFolderNameChange}
                  className="py-2 px-4 border-2 rounded-lg text-white border-rose-800 bg-black bg-opacity-30 w-full"
                />
                {folderNameError && (
                  <p className={`text-red-500 text-xs italic mt-2 ${folderNameError ? 'visible' : 'invisible'}`}>
                    {folderNameError}
                  </p>
                )}
              </div>
              <div className="w-full mb-4">
                <textarea
                  placeholder="Descripción del Cómic"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="py-2 px-4 border-2 rounded-lg text-white border-rose-800 bg-black bg-opacity-30 resize-none overflow-y-auto h-32 w-full"
                  maxLength={256}
                />
                <div className="text-right text-sm text-gray-500">{description.length}/256</div>
              </div>
            </div>
            <div className="w-full mb-4 flex flex-col items-center">
              <CategorySelector onChange={handleCategoryChange} />
            </div>
            <ImageUpload
              folderName={folderName}
              description={description}
              onComicDataChange={handleComicDataChange}
              onUploadSuccess={resetFields}
              uploadMode={uploadMode}
              categories={categories}
              isUploadDisabled={folderName.length < 3}
              setFolderNameError={setFolderNameError}
            />
          </div>
        </section>
      )}
    </main>
  );
}