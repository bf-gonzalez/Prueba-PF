"use client"

import { Bebas_Neue } from "next/font/google";
import { IoLogoDiscord } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

function Footer() {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const decodedUser = localStorage.getItem("decodedUser");
    if (decodedUser) {
      const user = JSON.parse(decodedUser);
      setUserName(user.name);
    }
  }, []);

  if (pathname === '/') {
    return null;
  }

  return (
    <footer className="bg-[#01061A] text-white py-6 w-full overflow-hidden">
      <div className="container mx-auto grid grid-cols-4 gap-4">
        <div className="text-left">
          <Image src="/images/ccLogo.png" alt="logo" className="logo duration-500 hover:scale-105 cursor-pointer ml-2 mt-4" height={100} width={200}/>
        </div>
        <div className="text-left">
          <h2 className="font-bold text-xl">Soporte</h2>
          <ul className="mt-2 text-lg">
            <li><Link href="/contact">Contactanos</Link></li>
            <li><Link href="/terms-of-service">Términos de Servicios</Link></li>
            <li><Link href="/privacy-policy">Nuestra política de privacidad</Link></li>
          </ul>
        </div>
        <div className="text-left">
          <h2 className="font-bold text-xl">Sobre Nosotros</h2>
          <ul className="mt-2 text-lg">
            <li>¿Quieres unirte?</li>
          </ul>
        </div>
        <div className="text-left">
          <h2 className="font-bold text-xl">Comunidad</h2>
          <ul className="mt-2 text-lg flex space-x-4">
            <li className="flex items-center space-x-2 bg-blue-900 p-2 rounded transition-transform transform hover:scale-110 duration-500">
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <IoLogoDiscord className="text-2xl text-white" />
              </a>
            </li>
            <li className="flex items-center space-x-2 bg-blue-900 p-2 rounded transition-transform transform hover:scale-110 duration-500">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <BsTwitterX className="text-2xl text-white" />
              </a>
            </li>
            <li className="flex items-center space-x-2 bg-blue-900 p-2 rounded transition-transform transform hover:scale-110 duration-500">
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="text-2xl text-white" />
              </a>
            </li>
          </ul> 
        </div>
      </div>
      <div className="text-center mt-4 text-sm opacity-70">
        {userName ? `Bienvenido ${userName}` : "Bienvenido"}
      </div>
      <div className="text-center mt-4 text-sm opacity-70">
        © ComiCraft. All Rights Reserved. Trademarks and characters are property of their respective owners.
      </div>
    </footer>
  );
}

export default Footer;