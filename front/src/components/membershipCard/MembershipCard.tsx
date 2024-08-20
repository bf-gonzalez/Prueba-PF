"use client";

import { membershipOptions } from '@/helpers/membrecias';
import { MembershipOption } from '@/interface';
import { Bebas_Neue } from 'next/font/google';
import { useContext } from 'react';
import { UserContext } from '@/context/userContext';
import Swal from 'sweetalert2';

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

const handleCheckout = async (product: MembershipOption, isLogged: boolean) => {
    if (!isLogged) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tienes que iniciar sesión para continuar.",
            showCancelButton: true,
            confirmButtonText: "Login",
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton: 'swal2-confirm-btn',
                cancelButton: 'swal2-cancel-btn'
            },
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/login';
            }
        });
        return;
    }

    try {
        const res = await fetch("/api/checkout", {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        const session = await res.json();
        console.log("Session:", session);

        if (session.url) {
            window.location.href = session.url;
        } else {
            throw new Error("Session URL is missing");
        }
    } catch (error) {
        console.error("Error during checkout:", error);
    }
};

const MembershipCard = ({ name, price, description, features, type }: MembershipOption) => {
    const priceInDollars = (price / 100).toFixed(2);
    const { isLogged } = useContext(UserContext);
    
    // Determine the unit based on the type of membership
    const priceUnit = name.toLowerCase().includes('anual') ? 'año' : 'mes';
    
    // For annual memberships, display the total cost rather than the monthly cost
    const displayPrice = name.toLowerCase().includes('anual') ? priceInDollars : `$${priceInDollars}`;

    return (
        <div className="w-80 p-4 rounded-lg shadow bg-custom-transparent">
            <h5 className="mb-4 text-xl font-medium text-custom-input text-yellow-500">{name}</h5>
            <div className="flex items-baseline text-yellow-500">
                <span className="text-3xl font-semibold">$</span>
                <span className="text-5xl font-extrabold tracking-tight">{displayPrice}</span>
                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/{priceUnit}</span>
            </div>
            <p className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 my-4">{description}</p>
            <ul className="space-y-5 my-7">
                {features.map((feature, index) => (
                    <li key={index} className={`flex items-center ${feature.isAvailable ? '' : 'line-through decoration-gray-500'}`}>
                        <svg
                            className={`flex-shrink-0 w-4 h-4 ${feature.isAvailable ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-500'}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                            {feature.text}
                        </span>
                    </li>
                ))}
            </ul>
            <button
                type="button"
                onClick={() => handleCheckout({ name, price, type, description, features }, isLogged)}
                className={`${bebas.variable} font-sans login cursor-pointer text-4xl text-white hover:text-yellow-400 transition-all custom-transition duration-300`}
            >
                Elegir plan
            </button>
        </div>
    );
};

export const MembershipCards = () => (
    <div className="flex space-x-4 overflow-x-auto">
        {membershipOptions.map((option, index) => (
            <MembershipCard key={index} {...option} />
        ))}
    </div>
);
