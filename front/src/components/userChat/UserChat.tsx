import { Josefin_Sans } from "next/font/google";
import SearchBar from "../searchBar/SearchBar";

const josefin = Josefin_Sans({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-josefin',
})

function UserChat() {
    // Ejemplo de datos de usuarios y mensajes
    const chats = [
        { id: 1, userName: "User1", lastMessage: "Hello there!" },
        { id: 2, userName: "User2", lastMessage: "How are you?" },
        { id: 3, userName: "User3", lastMessage: "Let's meet up." },
        // Puedes agregar más usuarios y mensajes aquí
    ];

    return (
        <main className="flex flex-row justify-evenly w-screen">

            {/* MAPEO DE USUARIOS QUE TE HAN ENVIADO MENSAJE */}
            <section className="h-[90vh] bg-gray-800 bg-opacity-70 w-[20vw] rounded-xl p-[2vh] overflow-y-auto py-[3vh] ">
                <div>
                    <h1 className="text-[2vw] font-bold">Chats</h1>
                </div>

                <div className="mt-[2vh]">
                    {/* Barra de búsqueda */}
                </div>

                {/* Lista de chats */}
                <div className="mt-[2vh]">
                    {chats.map((chat) => (
                        <div key={chat.id} className="p-[1vh] hover:bg-gray-700 cursor-pointer rounded-lg">
                            <h2 className="text-[1.5vw] font-medium">{chat.userName}</h2>
                            <p className="text-[1vw] text-gray-400">{chat.lastMessage}</p>
                        </div>
                    ))}
                </div>
            </section>




            {/* SECCIÓN DE LOS MENSAJES ENTRE USUARIOS */}
            <section className="h-[90vh] bg-gray-800 bg-opacity-90 w-[55vw] rounded-xl">
                <div className="flex flex-row border-b-4 border-black border-opacity-40 h-[16vh] items-center pl-[2vw]">
                    <img
                        src="/images/userIcon2.png"
                        className="w-[5vw] h-[10vh] rounded-full object-cover"
                    />
                    <h1 className="text-[2vw] ml-[1vw] lowercase">AQUÍ VA EL NOMBRE DE QUIEN MANDA MENSAJE</h1>
                </div>
                <div className="">
                <h1>AQUÍ VAN LOS MENSAJES EXTERNOS</h1>
                </div>
 
                <div className="">
                <h1>AQUÍ VAN LOS MENSAJES DEL USUARIO</h1>
                </div>

            </section>



            {/* SECCIÓN QUE MUESTRA EL USUARIO QUE TE HA MANDADO MENSAJE AL DAR CLICK EN SU NOMBRE */}
            <section className="h-[34vh] bg-gray-800 bg-opacity-90 w-[20vw] rounded-xl">
            <div className="flex flex-col justify-center items-center text-center h-[34vh] ">
            <img
                        src="/images/userIcon2.png"
                        className="w-[5vw] h-[10vh] rounded-full object-cover my-[2vh]"
            />
            <h2 className="text-[1.5vw] font-medium">USERNAME LLEVA AL PERFIL</h2>
            </div>
            </section>
        </main>
    );
}

export default UserChat;
