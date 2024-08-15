'use client'
import { Bebas_Neue } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import Swal from 'sweetalert2';

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

function Navbar() {
    const { isLogged, logOut, user } = useContext(UserContext);
    const [membershipType, setMembershipType] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const decodedUser = localStorage.getItem("decodedUser");
        if (decodedUser) {
            const user = JSON.parse(decodedUser);
            setMembershipType(user.MembershipType);

            const adminUsername = "ComiCraft2024";
            setIsAdmin(user.username === adminUsername);
        } else {
            setMembershipType(null);
        }
    }, [user]);

    const handleLogOut = () => {
        logOut();
        router.push("/");
    };

    const handleMembershipClick = () => {
        if (!isLogged) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Debes iniciar sesión para comprar una membresía!",
                confirmButtonText: "Iniciar sesión",
                cancelButtonText: "Cancelar",
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/login');
                }
            });
        } else {
            router.push('/membership');
        }
    };

    const showSubscriptionButton = pathname !== '/newusername' && pathname !== '/newpassword' && pathname !== '/profile-complete' && pathname !== '/membership' && pathname !== '/login' && pathname !== '/register' && !['annual_member', 'monthly_member', 'creator'].includes(membershipType);
    const showUploadButton = pathname !== '/upload' && pathname !== '/newusername' && pathname !== '/newpassword' && pathname !== '/profile-complete' && pathname !== '/membership' && pathname !== '/login' && pathname !== '/register' && !['creator'].includes(membershipType) || isAdmin;
    

    return (
<main>
    {pathname !== '/' && (
        <div className="absolute top-0 flex flex-col md:flex-row w-full items-center p-4 md:space-x-8 justify-between">
            <section className="flex justify-start w-full md:w-auto items-center md:space-x-10">
                <button type="button" onClick={() => router.push('/home')}>
                    <img src="/images/ccLogo.png" alt="logo" className="h-16 md:h-24 logo duration-500 hover:scale-105 cursor-pointer" />
                </button>
                {showSubscriptionButton && (
                    <button type="button" className="flex flex-row items-center justify-center border-2 border-yellow-400 rounded-2xl w-full md:w-60 h-12 md:h-16 bg-black bg-opacity-0 hover:bg-opacity-80 p-4 md:p-6" onClick={handleMembershipClick}>
                        <img src="/images/crown.png" className="w-8 md:w-10 h-6 md:h-8" alt="crown" />
                        <h1 className={`${bebas.variable} font-sans login cursor-pointer text-2xl md:text-4xl text-white hover:text-yellow-400 transition-all custom-transition duration-300 pl-2`}>SUSCRIBIRSE</h1>
                    </button>
                )}
            </section>

            <section className="flex flex-row justify-end w-full md:w-auto space-x-4 md:space-x-12">


            {showUploadButton && (
                    <button type="button" onClick={() => router.push('/upload')}>
                        <h1 className={`${bebas.variable} font-sans login cursor-pointer text-2xl md:text-4xl text-white hover:text-yellow-400 transition-all custom-transition duration-300 pl-2`}>SUBIR CÓMIC</h1>
                    </button>
                )}


                {pathname !== '/all-comics' && pathname !== '/profile-complete' && (
                    <button type="button" onClick={() => router.push('/all-comics')}>
                        <h1 className={`${bebas.variable} font-sans login cursor-pointer text-2xl md:text-4xl text-white hover:text-yellow-400 transition-all custom-transition duration-300`}>COMICS</h1>
                    </button>
                )}

                {pathname !== '/register' && pathname !== '/profile-complete' && !isLogged && (
                    <button type="button" onClick={() => router.push('/register')}>
                        <h1 className={`${bebas.variable} font-sans login cursor-pointer text-2xl md:text-4xl text-white hover:text-yellow-400 transition-all custom-transition duration-300`}>REGISTRARSE</h1>
                    </button>
                )}

                {pathname !== '/login' && pathname !== '/profile-complete' && !isLogged && (
                    <button type="button" onClick={() => router.push('/login')}>
                        <h1 className={`${bebas.variable} font-sans login cursor-pointer text-2xl md:text-4xl text-white hover:text-yellow-400 transition-all custom-transition duration-300`}>INICIAR SESIÓN</h1>
                    </button>
                )}

                {pathname !== '/dashboard' && isLogged && (
                    <button type="button" onClick={() => router.push('/dashboard')}>
                        <h1 className={`${bebas.variable} font-sans login cursor-pointer text-2xl md:text-4xl text-white hover:text-yellow-400 transition-all custom-transition duration-300`}>PERFIL</h1>
                    </button>
                )}

                {pathname !== '/adm-dshb' && isAdmin && (
                    <button type="button" onClick={() => router.push('/adm-dshb')}>
                        <h1 className={`${bebas.variable} font-sans login cursor-pointer text-2xl md:text-4xl text-white hover:text-yellow-400 transition-all custom-transition duration-300`}>PANEL ADMIN.</h1>
                    </button>
                )}

                {pathname !== '/' && isLogged && (
                    <button type="button" onClick={handleLogOut}>
                        <p className={`${bebas.variable} font-sans home cursor-pointer text-2xl md:text-4xl text-white rounded-xl p-2 hover:text-red-600 transition-all custom-transition duration-300`}>CERRAR SESIÓN</p>
                    </button>
                )}
            </section>
        </div>
    )}
</main>

    );
}

export default Navbar;
