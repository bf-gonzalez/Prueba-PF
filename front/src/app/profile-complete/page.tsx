'use client'
import Register from "@/components/register/Register"
import styles from "../../components/backgrounds/justice.module.css"
import CompleteProfile from "@/components/registerCompleteProfile/RegisterCompleteProfile"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/userContext"
import { Bebas_Neue } from "next/font/google"

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

const CompleteProfilePage: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);
    const {isLogged, logOut} = useContext(UserContext);

    useEffect(() => {
        const storedToken = localStorage.getItem("googleToken");

        if (storedToken) {
            setToken(storedToken); 
        } else {
            console.error("Token de Google no encontrado en LocalStorage");
        }
    }, []);

    return ( 
        <main className={styles.fondo}>
        {isLogged || !token ? ( 
            <div className="text-center pt-[34vh] pl-[60vw] pr-[2vw]">
                <h1
                className="text-3xl uppercase bg-black rounded-xl text-red-800 p-[3vw] border-2 border-red-800 bg-opacity-70 border-opacity-50"
                >No puedes acceder a esta vista si no tienes un token de google o ya haz completado tu perfil</h1>
            </div>
        ) : (

    <div className="flex h-screen">
    <div className="flex-1"></div>
    <div className="p-12 mx-38 mt-8 w-2/4">
    <h1
                className={`${bebas.variable} font-sans text-5xl uppercase text-center text-slate-200`}
                >COMPLETA TU PERFIL PARA CONTINUAR!</h1>
    <CompleteProfile token={token}/>
    </div>
    </div>
        )}

    </main>
        
    )

}

export default CompleteProfilePage;
