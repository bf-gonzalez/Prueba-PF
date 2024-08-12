'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

const HomeButtons: React.FC = () => {
    const router = useRouter()
    const {isLogged} = useContext(UserContext);

    return(
        <main className="w-screen h-screen relative">
            <div className="flex flex-wrap flex-col max-w-3xl max-h-screen absolute inset-x-0 bottom-6 ml-20 space-x-24 space-y-4"> 

            {!isLogged && (

                <div className="flex flex-row space-x-12">

                <button type="button" onClick={() => router.push('/login')}>
                    <img src="/images/iniciarBtn.png"
                    className=" h-16 hover:scale-105 
                    transition-all custom-transition duration-500">
                    </img>
                </button>

                <button type="button" onClick={() => router.push('/register')}>
                    <img src="/images/registrarseBtn.png"
                    className=" h-16 hover:scale-105 
                    transition-all custom-transition duration-500">
                    </img>
                </button>
                </div>
            )}
                <button type="button" onClick={() => router.push('/home')}>
                    <img src="/images/inicioBtn.png"
                    className=" h-16 hover:scale-105 pl-44
                    transition-all custom-transition duration-500 ">
                    </img>
                </button>

            </div>
        </main>
    )
}

export default HomeButtons;