import styles from "../../components/regularBackground/RegularBackground.module.css"
import { IoIosMail } from "react-icons/io"

export default function contact() {
    return (
        <main className={styles.fondo}>
            <div>
                <div className="w-full bg-gradient-to-r from-[#F5C702]/70 to-[#01061A]/70 p-4 mt-32">
                    <h1 className="text-3xl font-bold mb-4">Contacto</h1>
                </div>
                <div className="flex justify-center mt-4">
                    <div className="bg-blue-500 bg-opacity-50 p-4">
                        <h2 className="text-xl font-semibold mb-2">Puedes encontrarnos</h2>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019112484123!2d144.9630579153167!3d-37.8141079797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1b1f1b1f1b1!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1611810192000!5m2!1sen!2sau"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <div className="bg-blue-500 bg-opacity-50 p-4 text-center">
                        <p className="text-lg">Envia un mensaje a nuestro correo electrónico en caso de algún problema</p>
                        <IoIosMail className="mx-auto my-2" size={64} />
                        <p className="text-lg font-bold">comicraft2024@gmail.com</p>
                    </div>
                </div>
            </div>
        </main>
    )
}