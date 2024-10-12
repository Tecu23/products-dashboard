import { useState, useEffect, useRef } from "react";

import gsap from "gsap";

import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import CartDropdown from "./shared/CartDropdown";
import FavoriteDropdown from "./shared/FavoriteDropdown";

const Navbar = () => {
    const [openCartDropdown, setOpenCartDropdown] = useState(false);
    const [openFavoriteDropdown, setOpenFavoriteDropdown] = useState(false);

    const { products: favoriteProducts } = useSelector((state: RootState) => state.favoriteProducts);
    const { products: cartProducts } = useSelector((state: RootState) => state.cartProducts);

    const cartDropdownRef = useRef<HTMLDivElement | null>(null);
    const favoriteDropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (cartDropdownRef.current && openCartDropdown) {
            gsap.fromTo(
                cartDropdownRef.current,
                {
                    y: -20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out",
                },
            );
        }
    }, [openCartDropdown]);

    useEffect(() => {
        if (favoriteDropdownRef.current && openFavoriteDropdown) {
            gsap.fromTo(
                favoriteDropdownRef.current,
                {
                    y: -20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out",
                },
            );
        }
    }, [openFavoriteDropdown]);

    return (
        <nav className="container mx-auto py-4 px-4 lg:px-0 flex justify-between items-center">
            <div className="">
                <p className="text-3xl font-bold">Logo</p>
            </div>

            <div className="relative">
                <input type="text" className="w-48 lg:w-80 border rounded-md py-2 px-4 focus:outline-none" placeholder="Search..." />
                <MagnifyingGlassIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            </div>

            <div className="flex gap-4">
                <div className="relative">
                    <button
                        onClick={() => {
                            setOpenFavoriteDropdown(false);
                            setOpenCartDropdown(!openCartDropdown);
                        }}
                        className="h-6 w-6"
                    >
                        <ShoppingCartIcon className="h-6 w-6" />
                    </button>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 flex justify-center items-center rounded-full text-xs font-semibold text-white">
                        {cartProducts.length}
                    </div>
                    {openCartDropdown && (
                        <div ref={cartDropdownRef} className="absolute right-0 mt-2 w-64 z-20">
                            <CartDropdown products={cartProducts} />{" "}
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button
                        onClick={() => {
                            setOpenCartDropdown(false);
                            setOpenFavoriteDropdown(!openFavoriteDropdown);
                        }}
                        className="h-6 w-6"
                    >
                        <StarIcon className="h-6 w-6" />
                    </button>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 flex justify-center items-center rounded-full text-xs font-semibold text-white">
                        {favoriteProducts.length}
                    </div>
                    {openFavoriteDropdown && (
                        <div ref={favoriteDropdownRef} className="absolute right-0 mt-2 w-64 z-20">
                            <FavoriteDropdown products={favoriteProducts} />{" "}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
