"use client";

import React, { useState, useContext } from "react";
import { validateLogin } from "@/helpers/validateLogin";
import { Bebas_Neue } from "next/font/google";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { UserContext } from "@/context/userContext";
import GLogin from "../logingGoogle/LoginGoogle";

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export const Login = () => {
    const router = useRouter();
    const { signIn } = useContext(UserContext);

    const [loginValue, setLoginValue] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginValue({ ...loginValue, [name]: value });

        const newErrors = validateLogin({ ...loginValue, [name]: value });
        setErrors({ ...errors, [name]: newErrors[name] });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateLogin(loginValue);

        if (Object.keys(validationErrors).length === 0) {
            const respuesta = await signIn(loginValue);
            if (respuesta) {
                Swal.fire({
                    icon: "success",
                    title: "Bienvenido",
                    text: "Disfrute de lo mejor!",
                });
                router.push("/home");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Tus credenciales no son correctas!",
                });
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-custom-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        value={loginValue.email}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Contraseña"
                        value={loginValue.password}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="flex items-center justify-between w-[32vw]">
                    <button type="submit" className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}>Iniciar Sesión</button>
                <div className="flex flex-col w-[20vw] mr-4">
                <p className="text-base text-center">No tienes una cuenta?</p>
                <button type="button"
                className="text-blue-600 text-base"
                onClick={() => router.push('/register')} >Registrate aquí!</button>
                </div>
                </div>
            </form>
            <div className="">
            <GLogin />
            
            </div>
        </div>
    );
};

export default Login;
