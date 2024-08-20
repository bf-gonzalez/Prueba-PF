"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "@/components/backgrounds/experiment.module.css";
import { Bebas_Neue } from "next/font/google";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/searchBar/SearchBar";
import DateFilter from "../../components/DateFilter";
import CategoryFilter from "../../components/CategoryFilter";
import DeleteComicButton from "../deleteComicBtn/DeleteComicBtn";
import BanUserButton from "../banUserBtn/BanUserBtn";
import UnBanUserButton from "../unBanUserButton/UnBanUserButton";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const AllUsersComponent: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [images, setImages] = useState<{ [key: string]: any[] }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(12);
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem("searchQuery") || ""
  );
  const [dateOrder, setDateOrder] = useState<"newest" | "oldest">(
    (localStorage.getItem("dateOrder") as "newest" | "oldest") || "newest"
  );
  const [categoryFilter, setCategoryFilter] = useState<string[]>(
    JSON.parse(localStorage.getItem("categoryFilter") || "[]")
  );

  const router = useRouter();

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem("searchQuery");
    const savedDateOrder = localStorage.getItem("dateOrder");
    const savedCategoryFilter = localStorage.getItem("categoryFilter");

    if (savedSearchQuery) setSearchQuery(savedSearchQuery);
    if (savedDateOrder) setDateOrder(savedDateOrder as "newest" | "oldest");
    if (savedCategoryFilter) setCategoryFilter(JSON.parse(savedCategoryFilter));

    const fetchUsers = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        .then((response) => {
          const usersData = response.data;
          setUsers(usersData);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    };

    const fetchImages = async (folderName: string, userId: string) => {
      try {
        const response = await axios.get(`/api/images?folder=${folderName}`);
        setImages((prevImages) => ({ ...prevImages, [userId]: response.data }));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchUsers();
  }, []);

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleUserClick = (id: string) => {
    router.push(`/getUsers/${id}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    localStorage.setItem("searchQuery", query.toLowerCase());
  };

  const handleFilterChange = (order: "newest" | "oldest") => {
    setDateOrder(order);
    localStorage.setItem("dateOrder", order);
  };

  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((user) => {
      return { ...user };
    })
    .sort((a, b) => b.categoryMatches - a.categoryMatches)
    .sort((a, b) => {
      if (dateOrder === "newest") {
        return (
          new Date(b.data_post).getTime() - new Date(a.data_post).getTime()
        );
      } else {
        return (
          new Date(a.data_post).getTime() - new Date(b.data_post).getTime()
        );
      }
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <main className="">
      <div className="flex justify-evenly flex-wrap ">
        <section className="flex flex-col">
          <div className="flex flex-col self-center ">
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} placeholder={'Buscar Usuario'} />
            {/* <DateFilter onFilterChange={handleFilterChange} initialOrder={dateOrder} /> */}
          </div>
          <section className="flex flex-row flex-wrap justify-center pt-6 w-screen pb-12">
            
            {currentUsers.map((user) => {
              const isAdminUser = user.username === "ComiCraft2024"; // Verificar si es administrador

              return (
                <div
                  key={user.id}
                  className="flex flex-col items-center justify-center w-[240vw] max-w-md bg-gray-800 bg-opacity-60 p-4 m-4 rounded-lg shadow-lg h-[40vh]"
                >
                  <h1 className={`${bebas.variable} font-sans text-center text-3xl uppercase mb-4 text-yellow-400`}>
                    ROL: {user.role}
                  </h1>

                  <div className="flex items-center">
                    {user.profilePicture === "none" ? (
                      <img
                        src="/images/userIcon2.png"
                        className="w-32 h-32 rounded-xl object-cover border-4 border-rose-800 mr-4"
                        alt={`${user.username} Profile Picture`}
                      />
                    ) : (
                      <img
                        src={user.profilePicture || "/images/userIcon2.png"}
                        className="w-32 h-32 rounded-xl object-cover border-4 border-rose-800 mr-4"
                        alt={`${user.username} Profile Picture`}
                      />
                    )}
                    <div className="flex flex-col justify-between h-32">
                      <button
                        onClick={() => handleUserClick(user.id)} // Asegúrate de pasar el id del usuario
                        className="text-3xl text-white hover:text-yellow-400 transition-colors duration-300 w-full truncate text-center"
                      >
                        {user.username}
                      </button>

                      {/* Renderizar los botones solo si no es un usuario administrador */}
                      {!isAdminUser && (
                        user.isDeleted ? (
                          <UnBanUserButton userId={user.id} isDeleted={user.isDeleted} />
                        ) : (
                          <BanUserButton userId={user.id} isDeleted={user.isDeleted} />
                        )
                      )}

                      {user.isDeleted && (
                        <h1 className="text-white">USUARIO BANNEADO</h1>
                      )}

                    </div>
                  </div>
                </div>
              );
            })}
          </section>
          <div className="flex self-end ml-auto ">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AllUsersComponent;
