

export default function decodeGJwt() : {header?: any; payload?: any; userId?: string } | undefined {
    const token = localStorage.getItem("googleToken");
    if (token) {
        
        const parts = token.split(".");
        if(parts.length !== 3) {
            throw new Error("Invalid token format");
        }
    
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        const userId = payload.sub;
        return { header, payload, userId };
    }

    else {
        console.error('No se encontró el token en LocalStorage');
        return undefined;
    }
    
}

// export function decodeJwt2(token: string) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//         atob(base64)
//             .split('')
//             .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//             .join('')
//     );

//     return JSON.parse(jsonPayload);
// }


