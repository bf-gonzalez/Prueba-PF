"use client";

import React, { useContext, useState } from "react";
import { validateRegister } from "@/helpers/validateRegister";
import { Bebas_Neue } from "next/font/google";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export const Register = () => {
    const router = useRouter();
    const { signUp } = useContext(UserContext);

    const [signUpValues, setSignUp] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
        dob: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUp({ ...signUpValues, [name]: value });

        const fieldErrors = validateRegister({ ...signUpValues, [name]: value });
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: fieldErrors[name] || ""
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const validationErrors = validateRegister(signUpValues);

        if (Object.keys(validationErrors).length === 0) {
            const user = {
                email: signUpValues.email,
                username: signUpValues.username,
                password: signUpValues.password,
                confirmPassword: signUpValues.confirmPassword,
                name: signUpValues.name,
                address: signUpValues.address,
                phone: Number(signUpValues.phone),
                dob: signUpValues.dob,
            };

            try {
                const success = await signUp(user);

                if (success) {
                    Swal.fire({
                        icon: "success",
                        title: "Bienvenido",
                        text: "Disfruta de lo mejor!",
                    });
                    router.push("/home");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Ya existe una cuenta con este email.",
                    });
                }
            } catch (error) {
                console.error("Error durante el registro:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hubo un problema con el registro. Por favor, inténtalo de nuevo.",
                });
            }
        } else {
            setErrors(validationErrors);
            console.log("Errores en el formulario:", validationErrors);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-custom-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        placeholder="Nombre"
                        value={signUpValues.name}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        value={signUpValues.email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        placeholder="Nombre de usuario"
                        value={signUpValues.username}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
                    />
                    {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Contraseña"
                        value={signUpValues.password}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleChange}
                        placeholder="Confirmar Contraseña"
                        value={signUpValues.confirmPassword}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        onChange={handleChange}
                        placeholder="Teléfono"
                        value={signUpValues.phone}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
                    />
                    {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={handleChange}
                        placeholder="Dirección"
                        value={signUpValues.address}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
                    />
                    {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-yellow-600 text-sm font-bold mb-2">Fecha de nacimiento:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        onChange={handleChange}
                        value={signUpValues.dob}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
                    />
                    {errors.dob && <p className="text-red-500 text-xs italic">{errors.dob}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}>Registrarse</button>
                    <div className="flex flex-col">
                        <p className="ml-12 text-base ">Ya tienes una cuenta?</p>
                        <button type="button"
                            className="text-blue-600 text-base text-end ml-4"
                            onClick={() => router.push('/login')}>Inicia sesión!</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
