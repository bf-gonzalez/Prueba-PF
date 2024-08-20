// "use client";

// import React, { useState, useContext, useEffect } from "react";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
// import { UserContext } from "@/context/userContext";
// import { Bebas_Neue } from "next/font/google";
// import { validateCompleteProfile } from "@/helpers/validateRegister";
// import decodeJwt from "@/utils/decodeGJWT";
// import { validateCompleteProfile } from "@/helpers/validateCompleteProfile"; 

// const bebas = Bebas_Neue({
//     subsets: ['latin'],
//     weight: ['400'],
//     variable: '--font-bebas',
// });

// export const CompleteProfile = ({ token }) => {
//     const router = useRouter();
//     const { completeProfile } = useContext(UserContext);
//     const [profileValues, setProfileValues] = useState({
//         email: "",
//         username: "",
//         name: "",
//         password: "",
//         confirmPassword: "",
//         address: "",
//         phone: "",
//         dob: ""
//     });
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         const userData = decodeJwt(token);
//         setProfileValues((prevValues) => ({
//             ...prevValues,
//             email: userData.email || "",
//             name: userData.name || `${userData.given_name} ${userData.family_name}` || "",
//             username: userData.email.split('@')[0] || "",
//         }));
//     }, [token]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setProfileValues({ ...profileValues, [name]: value });
//         const newErrors = validateCompleteProfile({ ...profileValues, [name]: value });
//         setErrors(newErrors);
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const validationErrors = validateCompleteProfile(profileValues);

//         if (Object.keys(validationErrors).length === 0) {
//             const user = {
//                 email: profileValues.email,
//                 username: profileValues.username,
//                 password: profileValues.password,
//                 confirmPassword: profileValues.confirmPassword,
//                 name: profileValues.name,
//                 address: profileValues.address,
//                 phone: Number(profileValues.phone),
//                 dob: profileValues.dob,
//             };

//             console.log('Datos del formulario:', user);
//             try {
//                 const success = await completeProfile(user);

//                 if (success) {
//                     Swal.fire({
//                         icon: "success",
//                         title: "Perfil Completo",
//                         text: "¡Ahora tienes acceso a todas las funciones!",
//                     });
//                     router.push("/home");
//                 } else {
//                     Swal.fire({
//                         icon: "error",
//                         title: "Oops...",
//                         text: "No se pudo completar tu perfil. Inténtalo de nuevo.",
//                     });
//                 }
//             } catch (error) {
//                 console.error("Error al completar el perfil:", error);
//             }
//         } else {
//             console.log("Errores en el formulario:", validationErrors);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10">
//             <form onSubmit={handleSubmit} className="bg-custom-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4">
                
//                 <input type="hidden" name="name" value={profileValues.name} />
//                 <input type="hidden" name="email" value={profileValues.email} />
//                 <input type="hidden" name="username" value={profileValues.username} />



//                 <div className="mb-4">
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         onChange={handleChange}
//                         placeholder="Contraseña"
//                         value={profileValues.password}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
//                     />
//                     {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
//                 </div>
//                 <div className="mb-4">
//                     <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         onChange={handleChange}
//                         placeholder="Confirmar Contraseña"
//                         value={profileValues.confirmPassword}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
//                     />
//                     {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
//                 </div>
//                 <div className="mb-4">
//                     <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         onChange={handleChange}
//                         placeholder="Teléfono"
//                         value={profileValues.phone}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
//                     />
//                     {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
//                 </div>
//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         id="address"
//                         name="address"
//                         onChange={handleChange}
//                         placeholder="Dirección"
//                         value={profileValues.address}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
//                     />
//                     {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="dob" className="block text-yellow-600 text-sm font-bold mb-2">Fecha de nacimiento:</label>
//                     <input
//                         type="date"
//                         id="dob"
//                         name="dob"
//                         onChange={handleChange}
//                         value={profileValues.dob}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input placeholder-black"
//                     />
//                     {errors.dob && <p className="text-red-500 text-xs italic">{errors.dob}</p>}
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <button type="submit" className={`${bebas.variable} font-sans 
//                     login cursor-pointer
//                     text-4xl text-white hover:text-yellow-400
//                     transition-all custom-transition duration-300`}>Completar Perfil</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CompleteProfile;
