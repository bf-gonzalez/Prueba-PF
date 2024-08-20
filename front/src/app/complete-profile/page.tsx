import Register from "@/components/register/Register"
import styles from "../../components/backgrounds/justice.module.css"
// import CompleteProfile from "../../components/completeProfile/CompleteProfile"

export default function CompleteProfilePage() {
    return (
        <main className={styles.fondo}>
            <div className="flex h-screen">
                <div className="flex-1"></div>
                <div className="p-12 mx-38 mt-8 w-2/4">
                    {/* <CompleteProfile/> */}
                </div>
            </div>
        </main>
    )
}