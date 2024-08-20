import { MembershipCards } from "@/components/membershipCard/MembershipCard";
import styles from "../../components/regularBackground/RegularBackground.module.css";

export default function Checkout() {
    return (
        <main className={styles.fondo}>
            <div className="flex items-center justify-center min-h-screen pt-16">
                <div className="flex space-x-4 overflow-x-auto">
                    <MembershipCards />
                </div>
            </div>
        </main>
    );
}


