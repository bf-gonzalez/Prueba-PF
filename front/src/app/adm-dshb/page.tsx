"use client"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import ProfilePictureModal from '@/components/ProfilePictureModal';
import axios from 'axios';
import NotFoundComp from "@/components/notFoundComp/NotFoundComp";
import AllUsersComponent from "@/components/allUsersComponent/AllUsersComponent";
import AllPendingComicsComponent from "@/components/allPendingComics/AllPendingComics";
import AllComicsComponent from "@/components/allComicsComponent/AllComicsComponent";
import styles from "@/components/backgrounds/experiment.module.css";
import { useRouter } from "next/navigation";
import { Bebas_Neue, Josefin_Sans } from "next/font/google";

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

export default function AdminDashboard() {
    const { isLogged, user, setUser } = useContext(UserContext);
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [membershipType, setMembershipType] = useState<string | null>(null);
    const [userComics, setUserComics] = useState([]);
    const [images, setImages] = useState({});
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [users, setUsers] = useState([]);
    const [pendingComics, setPendingComics] = useState([]);
    const [activeComics, setActiveComics] = useState([]);
    const [updateFlag, setUpdateFlag] = useState<boolean>(false);

    useEffect(() => {
        const decodedUser = localStorage.getItem("decodedUser");
        if (decodedUser) {
            const user = JSON.parse(decodedUser);
            setUserName(user.username);
            setMembershipType(user.MembershipType);
            setIsAdmin(user.role.includes("admin"));

            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`)
                .then(response => {
                    const userData = response.data;
                    setProfilePicture(userData.profilePicture === "none" ? "/images/userIcon2.png" : userData.profilePicture);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });

            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comics`)
                .then(response => {
                    const comics = response.data;
                    const userComics = comics.filter(comic => comic.user.id === user.id);
                    setUserComics(userComics);

                    userComics.forEach(comic => {
                        fetchImages(comic.folderName, comic.id);
                    });

                    setActiveComics(comics.filter(comic => comic.isActive));
                })
                .catch(error => {
                    console.error("Error fetching comics:", error);
                });
        }
    }, []);

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

    const fetchPendingComics = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comics`);
            setPendingComics(response.data.filter(comic => !comic.isActive));
        } catch (error) {
            console.error('Error fetching pending comics:', error);
        }
    };

    useEffect(() => {
        fetchPendingComics();
    }, []);

    const fetchImages = async (folderName, comicId) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/images?folder=${folderName}`);
            setImages(prevImages => ({ ...prevImages, [comicId]: response.data }));
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
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

            const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
            const userId = decodedToken.id;
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/profile-picture`, {
                profilePicture: imageUrl
            });

            handleCloseModal();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleUploadSuccess = (imageUrl) => {
        console.log("Upload successful, image URL:", imageUrl);
    };

    const handleComicAccepted = (acceptedComicId) => {
        setPendingComics((prevComics) => prevComics.filter(comic => comic.id !== acceptedComicId));
        setActiveComics((prevComics) => {
            const acceptedComic = pendingComics.find(comic => comic.id === acceptedComicId);
            return acceptedComic ? [...prevComics, { ...acceptedComic, isActive: true }] : prevComics;
        });
        fetchActiveComics(); // Llamar a la función para actualizar los cómics activos
    };

    const fetchActiveComics = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comics`);
            setActiveComics(response.data.filter(comic => comic.isActive));
        } catch (error) {
            console.error("Error fetching active comics:", error);
        }
    };

    const handleComicDeleted = (deletedComicId) => {
        setPendingComics((prevComics) => prevComics.filter(comic => comic.id !== deletedComicId));
        setUpdateFlag((prevFlag) => !prevFlag); // Alternar el estado de actualización
        fetchPendingComics(); // Llamar a la función para actualizar los cómics pendientes
    };

    if (!isAdmin) {
        return <NotFoundComp />;
    }

    return (
        <div className={styles.fondo}>
            <main className="flex flex-col max-w-screen-2xl pt-44 pb-36">
                <section className="flex flex-row-reverse justify-evenly items-center">
                    <div className="flex flex-col flex-wrap max-w-screen-xl items-center text-wrap">
                        <p className={`${bebas.variable} font-sans text-4xl text-rose-800 self-center pb-6`}>
                            ADMINISTRADOR
                        </p>
                        <h1 className={`${josefin.variable} font-sans text-5xl text-white pb-1`}>BIENVENIDO/A</h1>
                        <h2 className={`${josefin.variable} font-sans text-5xl text-white uppercase self-center`}>
                            {userName}
                        </h2>
                        {membershipType === 'creator' && (
                            <section className="flex flex-row space-x-12 self-center pt-6">
                                <p className={`${bebas.variable} font-sans text-3xl text-yellow-400 max-w-96`}>
                                    (NÚMERO) SEGUIDORES
                                </p>
                                <p className={`${bebas.variable} font-sans text-3xl text-yellow-400 max-w-96`}>
                                    (NÚMERO) COMICS
                                </p>
                            </section>
                        )}
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            src={profilePicture || "/images/userIcon2.png"}
                            className="w-64 h-64 rounded-xl object-cover object-center border-4 border-rose-800"
                            alt={`${userName} Profile Picture`}
                        />
                        <button onClick={handleOpenModal}>
                            <p className={`${josefin.variable} font-sans uppercase text-white max-w-60 hover:text-blue-500 duration-300 self-center text-3xl pt-10`}>
                                Cambiar foto de perfil
                            </p>
                        </button>
                    </div>
                </section>
                <section className="flex flex-col items-center">
                    <img
                        src="/images/usuariosAsset.png"
                        className="max-w-[23vw] pt-12 pb-16 mx-auto"
                        alt="Usuarios"
                    />
                    <AllUsersComponent />
                </section>
                <section className="flex flex-col items-center">
                    <img
                        src="/images/pendingComics.png"
                        className="max-w-[60vw] pt-12 pb mx-auto"
                        alt="PENDING-COMICS"
                    />
                    <AllPendingComicsComponent pendingComics={pendingComics} onComicAccepted={handleComicAccepted} onComicDeleted={handleComicDeleted} fetchPendingComics={fetchPendingComics} setUpdateFlag={setUpdateFlag} />
                </section>
                <section className="flex flex-col items-center">
                    <img
                        src="/images/comicsBtn.png"
                        className="max-w-[23vw] pt-12 pb mx-auto"
                        alt="COMICS"
                    />
                    <AllComicsComponent comics={activeComics} onComicDeleted={handleComicDeleted} fetchPendingComics={fetchPendingComics} setUpdateFlag={setUpdateFlag} />
                </section>
                {membershipType === 'creator' && (
                    <section className="">
                        <img src="/images/contenidoSubido.png" className="max-w-lg flex ml-auto mr-auto pt-12" />
                        <div className="flex flex-col max-w-9xl flex-wrap pt- items-center">
                            <h1 className={`${josefin.variable} font-sans text-6xl text-rose-800 max-w-[60vw] text-center pb-6`}>
                                AÚN NO HAS SUBIDO COMICS!
                            </h1>
                            <button type="button" onClick={() => router.push('/upload')}>
                                <img src="/images/subirExample.png" className="max-w-md flex ml-auto mr-auto pt-6 hover:animate-bounce" />
                            </button>
                        </div>
                    </section>
                )}
            </main>
            {isModalOpen && (
                <ProfilePictureModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onImageSelect={handleImageSelect}
                    onUpload={handleUpload}
                    onUploadSuccess={handleUploadSuccess}
                    setUser={setUser}
                />
            )}
        </div>
    );
}