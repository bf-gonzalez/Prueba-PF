'use client';

import { UserContext } from "@/context/userContext";
import decodeGJwt from "@/utils/decodeGJWT";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function GLogin() {
    const [email, setEmail] = useState<string | null>(null);
    const [pfp, setPfp] = useState<string | null>(null);

    const router = useRouter();
    const {signIn} = useContext(UserContext);
    

    async function handleSuccess(googleCredentialsResponse: CredentialResponse) {
        const userData = decodeGJwt();
        console.log("googleCredentialsResponse", googleCredentialsResponse);
        if (googleCredentialsResponse.credential) {

            const decodedToken = decodeGJwt();
            localStorage.setItem("googleToken", googleCredentialsResponse.credential);

            if (decodedToken) {

                const { payload } = decodedToken;
                console.log("payload credential", payload);

                setEmail(payload.email);
                setPfp(payload.picture);
                
                const loginSuccess = await signIn({
                    email: payload.email,
                    password: userData.userId || "",
                });

                if (loginSuccess) {
                    router.push('/home')
                } else {
                    router.push('/profile-complete')
                }
                
            } else {
                console.error("No se pudo decodificar el token.");
                
            }
        }
    }

    function handleError() {
        console.log("Login por Google Fallido");
    }

    return (
        <div>
            {email === null && <GoogleLogin onError={handleError} onSuccess={handleSuccess} />}

            {/* {email && <p>Has inicado sesión con tu correo de google: {email} !</p>}

            {pfp && <img src={pfp} className="rounded-xl bg-yellow-400 p-1 bg-opacity-50"></img>} */}
        </div>
    );
}

// 'use client';

// import { UserContext } from "@/context/userContext";
// import decodeGJwt from "@/utils/decodeGJWT";
// import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
// import { useRouter } from "next/navigation";
// import { useContext, useEffect, useState } from "react";

// export default function GLogin() {

//     interface ITryLoginResponse {
//         token: string | null;
//     }

//     const [email, setEmail] = useState<string | null>(null);
//     const [pfp, setPfp] = useState<string | null>(null);

//     const router = useRouter();
//     const {signIn} = useContext(UserContext);

//     const tryLogin = ({ token }: ITryLoginResponse) => {
//         const router = useRouter();
//         const { signUp } = useContext(UserContext);
//         const [profileValues, setProfileValues] = useState({
//             email: "",
//             password: "",
//         });
//         const [errors, setErrors] = useState({});
    
//         const [signUpValues, setSignUp] = useState({
//             email: "",
//             password: "",
//         });
    
//         useEffect(() => {
//             const userData = decodeGJwt();
//             if (userData) {
//                 setProfileValues((prevValues) => ({
//                     ...prevValues,
//                     email: userData.payload?.email || "",
//                     name: userData.payload?.name || `${userData.payload?.given_name || ""}`,
//                     password: userData.userId || "",
//                     confirmPassword: userData.userId || "",
//                 }));
//             }
//         }, [token]);


//     async function handleSuccess(googleCredentialsResponse: CredentialResponse) {
//         console.log("googleCredentialsResponse", googleCredentialsResponse);
//         if (googleCredentialsResponse.credential) {

//             const decodedToken = decodeGJwt();
//             localStorage.setItem("googleToken", googleCredentialsResponse.credential);

//             if (decodedToken) {

//                 const { payload } = decodedToken;
//                 console.log("payload credential", payload);

//                 setEmail(payload.email);
//                 setPfp(payload.picture);
                
//                 const loginSuccess = await signIn({
//                     email: payload.email,
//                     password: userData.userId || "",
//                 });

//                 if (loginSuccess) {
//                     router.push('/home')
//                 } else {
//                     router.push('/profile-complete')
//                 }
                
//             } else {
//                 console.error("No se pudo decodificar el token.");
                
//             }
//         }
//     }

//     function handleError() {
//         console.log("Login por Google Fallido");
//     }

//     return (
//         <div>
//             {email === null && <GoogleLogin onError={handleError} onSuccess={handleSuccess} />}

//             {/* {email && <p>Has inicado sesión con tu correo de google: {email} !</p>}

//             {pfp && <img src={pfp} className="rounded-xl bg-yellow-400 p-1 bg-opacity-50"></img>} */}
//         </div>
//     );
// }

// }



