import React, { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { Bebas_Neue, Josefin_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});
 
const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-josefin',
});
 
function AlertSignIn() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);

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

  return (
    <main className="pt-56 pb-36">
      {!isLogged ? (
        <>
          <section className="text-center">
            <h1 className={`${bebas.variable} font-sans text-8xl text-yellow-400`}>
              No has iniciado sesión :(
            </h1>
            <h2 className={`${bebas.variable} font-sans text-7xl pt-6 text-rose-800`}>
              Inicia sesión o crea una cuenta aquí:
            </h2>
          </section>

          <section className="text-center space-x-10 mt-12">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className={`${bebas.variable} font-sans text-white text-5xl hover:scale-105 hover:shadow-lg cursor-pointer border-rose-800 border-4 w-72 h-24 rounded-xl transition duration-300 hover:text-yellow-400`}
            >
              INICIAR SESIÓN
            </button>

            <button
              type="button"
              onClick={() => router.push('/register')}
              className={`${bebas.variable} font-sans text-white text-5xl hover:scale-105 hover:shadow-lg cursor-pointer border-rose-800 border-4 w-72 h-24 rounded-xl transition duration-300 hover:text-yellow-400`}
            >
              REGISTRARSE
            </button>
          </section>
        </>
      ) : (
        <>
          <section className="text-center">
            <h1 className={`${bebas.variable} font-sans text-8xl text-yellow-400`}>
              Para acceder a esta herramienta
            </h1>
            <h2 className={`${bebas.variable} font-sans text-7xl pt-6 text-rose-800`}>
            necesitas una suscripción de creador!
            </h2>
          <button
              type="button"
              onClick={handleMembershipClick}
              className={`${bebas.variable} font-sans text-white text-5xl hover:scale-105 hover:shadow-lg cursor-pointer border-rose-800 border-4 w-80 h-24 rounded-xl transition duration-300 hover:text-yellow-400 bg-black bg-opacity-0 hover:bg-opacity-80 mt-6`}
            >
              CONSIGUE UNA AQUÍ
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default AlertSignIn;
