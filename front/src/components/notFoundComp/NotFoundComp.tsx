import { useRouter } from "next/navigation"
import Image from "next/image"
import styles from "@/components/backgrounds/experiment.module.css";

function NotFoundComp () {
    const router = useRouter()
    
    return( 
        <main >
    <div className="bg-black">
    <img src="/images/errorTr.png" alt="Esta ruta no existe!"
    className="w-screen pt-[8vh] "  />         
    </div>

    <div className="flex self-end">

    <button type="button" onClick={() => router.push ('/home')} >
        <img src="/images/volverBtn.png" alt="Volver"
        className="volver transition-transform duration-300 hover:scale-105
        cursor-pointer flex  "  />
    </button>

    </div>
    </main>

)

}

export default NotFoundComp;