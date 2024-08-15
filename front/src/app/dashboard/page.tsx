'use client'
import AlertSignIn from "@/components/alertSignIn/AlertSignIn";
import { UserContext } from "@/context/userContext";
import { Bebas_Neue, Josefin_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from "@/components/backgrounds/experiment.module.css";
import ProfilePictureModal from '@/components/ProfilePictureModal';
import axios from 'axios';
import decodeGJwt from "@/utils/decodeGJWT";
import BanUserButton from "@/components/banUserBtn/BanUserBtn";
import AllComicsComponent from "../../components/allComicsComponent/AllComicsComponent";
import AllUsersComponent from "@/components/allUsersComponent/AllUsersComponent";

const josefin = Josefin_Sans({
    subsets:['latin'],
    weight: ['600'],
    variable: '--font-bebas',
});
const bebas = Bebas_Neue({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export default function dashboard() {

    const { isLogged, user, setUser } = useContext(UserContext);
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(user?.name || null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profilePicture, setProfilePicture] = useState<string | null>(user?.profilePicture || "/images/userIcon2.png");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [membershipType, setMembershipType] = useState<string | null>(null);
    const [userComics, setUserComics] = useState([]);
    const [images, setImages] = useState({});

    useEffect(() => {
        const decodedUser = localStorage.getItem("decodedUser");
        if (decodedUser) {

          const user = JSON.parse(decodedUser);
          setUserName(user.username);
          setMembershipType(user.MembershipType);


            // Fetch user data from backend
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`)
                .then(response => {
                    const userData = response.data;
                    setProfilePicture(userData.profilePicture === "none" ? "/images/userIcon2.png" : userData.profilePicture);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });

            // Fetch user comics
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comics`)
                .then(response => {
                    const comics = response.data;
                    const userComics = comics.filter(comic => comic.user.id === user.id);
                    setUserComics(userComics);

                    userComics.forEach(comic => {
                        fetchImages(comic.folderName, comic.id);
                    });
                })
                .catch(error => {
                    console.error("Error fetching comics:", error);
                });
        }
    }, [user]);

    const fetchImages = async (folderName, comicId) => {
        try {
            const response = await axios.get(`/api/images?folder=${folderName}`);
            setImages(prevImages => ({ ...prevImages, [comicId]: response.data }));
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleOpenModal = async () => {
        setIsModalOpen(true);
        const decodedUser = localStorage.getItem("decodedUser");
        if (decodedUser) {
            const user = JSON.parse(decodedUser);
            try {
                const response = await axios.get(`http://localhost:3000/users/${user.id}`);
                const userData = response.data;
                setProfilePicture(userData.profilePicture);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleImageSelect = (file) => {
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'ml_default');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dx1kqmh8v/image/upload', formData);
            const imageUrl = response.data.secure_url;
            setProfilePicture(imageUrl);

            // Guardar la URL en el backend
            const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
            const userId = decodedToken.id;
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/profile-picture`, {
                profilePicture: imageUrl
            });

            // Actualizar la imagen de perfil en tiempo real
            setUser(prevUser => ({ ...prevUser, profilePicture: imageUrl }));

            handleCloseModal();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
      
      const fetchUsers = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
          .then(response => {
            const usersData = response.data; 
            setUsers(usersData); 
          })
          .catch(error => {
            console.error("Error fetching users:", error); 
          });
      };
  
      fetchUsers(); 
    }, []);


    const [googleToken, setGoogleToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("googleToken");

        if (storedToken) {
            setGoogleToken(storedToken); 
        } else {
            console.error("Token de Google no encontrado en LocalStorage");
        }
    }, []);

    const handleUploadSuccess = (imageUrl) => {
        console.log("Upload successful, image URL:", imageUrl);
    };


    return (
        <div className={styles.fondo} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

        {!isLogged ? (<AlertSignIn></AlertSignIn>) : (

<main className="flex flex-col max-w-screen-2xl pt-44 pb-36 items-center">

<section className="flex flex-col md:flex-row-reverse justify-evenly items-center w-full">

<div className="flex flex-col flex-wrap max-w-screen-xl items-center text-wrap text-center md:text-left">
<p className={`${bebas.variable} font-sans 
            text-4xl text-rose-800
            self-center pb-6
            `}>
  {membershipType === 'monthly_member' ? 'Miembro Mensual' : membershipType === 'annual_member' ? 'Miembro Anual' : membershipType === 'creator' ? 'CREADOR' : 'Miembro sin membresía'}
</p>
<h1 className={`${josefin.variable} font-sans 
            text-5xl text-white pb-1
            `}>BIENVENIDO/A</h1>
<h2 className={`${josefin.variable} font-sans 
            text-5xl text-white uppercase self-center
            `}> {userName} </h2>


{/* 
{['monthly_member', 'annual_member', 'creator'].includes(membershipType) && (
  <section className="flex flex-row space-x-12 self-center pt-6">
    <p className={`${bebas.variable} font-sans 
                text-3xl text-yellow-400 max-w-96
    `}>(NÚMERO) SEGUIDORES</p>    
    <p className={`${bebas.variable} font-sans 
                text-3xl text-yellow-400 max-w-96
    `}>(NÚMERO) COMICS</p>    
  </section>
)}
  */}
</div>

<div className="flex flex-col items-center">
    <img
        src={profilePicture || "/images/userIcon2.png"}
        className="w-64 h-64 rounded-xl object-cover object-center border-4 border-rose-800"
        alt={`${userName} Profile Picture`}
    />
    <button onClick={handleOpenModal}>
        <p className={`${josefin.variable} font-sans uppercase text-white max-w-60 hover:text-blue-500 duration-300 self-center text-3xl pt-10`}>Cambiar foto de perfil</p>
    </button>
</div>

</section>

{/* EXCLUSIVO PARA ADMINISTRADORES  */}
{/* <section className="flex flex-col items-center">

  <img 
    src="/images/usuariosAsset.png" 
    className="max-w-[23vw] pt-12 pb-16 mx-auto" 
    alt="Usuarios"
  />

  <AllUsersComponent />
</section> */}

{/* EXCLUSIVO PARA ADMINISTRADORES  */}
{/* <section className="flex flex-col items-center">

  <img 
    src="/images/comicsBtn.png" 
    className="max-w-[23vw] pt-12 pb mx-auto" 
    alt="COMICS"
  />
  <AllComicsComponent />
</section> */}

<section className="pt-[6vh] text-center">

{isLogged && !googleToken && (
<a href="http://localhost:3001/newusername">
  <h2 className={`${josefin.variable} font-sans 
  text-yellow-400 cursor-pointer text-5xl pb-[2vh] `}>
  CAMBIAR NOMBRE DE USUARIO</h2>
</a>
)}

{isLogged && !googleToken && (

<a href="http://localhost:3001/newpassword">
  <h2 className={`${josefin.variable} font-sans 
  text-yellow-400 cursor-pointer text-5xl`}>
  CAMBIAR CONTRASEÑA</h2>
</a>
)}

</section>

{membershipType === 'creator' && (
  <section className="w-full">
    <img src="/images/contenidoSubido.png" className="max-w-lg flex ml-auto mr-auto pt-12 "/>   
    
    <div className="flex flex-col max-w-9xl flex-wrap pt- items-center">
      <h1 className={`${josefin.variable} font-sans text-6xl text-rose-800 max-w-[60vw] text-center pb-6`}>
        AÚN NO HAS SUBIDO COMICS!
      </h1>
      <button type="button" onClick={() => router.push('/upload')}>
        <img src="/images/subirExample.png" alt="añadir" className="subir w-96 duration-500 hover:scale-105 cursor-pointer pb-5 "/>
        <h1 className={`${josefin.variable} font-sans text-center`}>AÑADE MÁS CONTENIDO!</h1>
      </button>
    </div>   

    {userComics.filter(comic => !comic.isActive).length > 0 && (
      <div>
        <h2 className={`${josefin.variable} font-sans text-4xl text-rose-800 text-center pt-10`}>Comics Pendientes</h2>
        <div className="flex flex-row flex-wrap justify-center mt-10 w-screen">
          {userComics.filter(comic => !comic.isActive).map((comic, index) => (
            <div key={index} className="flex flex-col items-center mb-8">
              <div
                className="relative p-2 border-4 border-red-800 border-opacity-60 shadow-lg w-72 h-96 cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => router.push(`/all-comics/${comic.id}`)}
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
                  <p className={`${bebas.variable} text-center mt-4 text-lg font-bold uppercase`}>
                    {comic.description}
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-400">{comic.categoryname}</p>
              <h1 className={`${bebas.variable} font-sans text-3xl font-bold mt-2 w-72 text-center text-yellow-400 `}>
                {comic.title}
              </h1>
              <p className={`${bebas.variable} font-sans text-2xl text-white`}>{comic.author}</p>
              <p className={`${bebas.variable} text-lg font-bold uppercase text-rose-700`}>{comic.data_post}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {userComics.filter(comic => comic.isActive).length > 0 && (
      <div>
        <h2 className={`${josefin.variable} font-sans text-4xl text-rose-800 text-center pt-10`}>Comics Aprobados</h2>
        <div className="flex flex-row flex-wrap justify-center mt-10 w-screen">
          {userComics.filter(comic => comic.isActive).map((comic, index) => (
            <div key={index} className="flex flex-col items-center mb-8 mx-6">
              <div
                className="relative p-2 border-4 border-red-800 border-opacity-60 shadow-lg w-72 h-96 cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => router.push(`/all-comics/${comic.id}`)}
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
                  <p className={`${bebas.variable} text-center mt-4 text-lg font-bold uppercase`}>
                    {comic.description}
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-400">{comic.categoryname}</p>
              <h1 className={`${bebas.variable} font-sans text-3xl font-bold mt-2 w-72 text-center text-yellow-400 `}>
                {comic.title}
              </h1>
              <p className={`${bebas.variable} font-sans text-2xl text-white`}>{comic.author}</p>
              <p className={`${bebas.variable} text-lg font-bold uppercase text-rose-700`}>{comic.data_post}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </section>
)}

{/* APARTADO DESCARTADO DE BIBLIOTECA PARA TODOS LOS USERS: 
<section className="">
<img src="/images/biblioteca.png" className="max-w-sm flex  ml-auto mr-auto pt-2 "/>

<div className="flex flex-col max-w-9xl flex-wrap pt-10 items-center ">

<h1 className={`${josefin.variable} font-sans 
            text-6xl text-rose-800 max-w-[60vw] text-center pb-6
`}>AÚN NO HAS AÑADIDO COMICS!</h1>

<button type="button" onClick={() => router.push('/home')}>
            <img src="/images/subirExample.png" alt="añadir"
            className="subir w-96
            duration-500 hover:scale-105 cursor-pointer pb-5 "/>
<h1 className={`${josefin.variable} font-sans text-center`}>DESCUBRE MÁS CONTENIDO!</h1>
</button>
</div>   

</section>                            */}

</main>

        )}

        <ProfilePictureModal isOpen={isModalOpen} onClose={handleCloseModal} onImageSelect={handleImageSelect} handleUpload={handleUpload} setUser={setUser} onUploadSuccess={handleUploadSuccess} />

        </div>
    )
}