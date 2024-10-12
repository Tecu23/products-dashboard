import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartDropdown from "./shared/CartDropdown";
import { useState } from "react";
import FavoriteDropdown from "./shared/FavoriteDropdown";

const Navbar = () => {
    const [openCartDropdown, setOpenCartDropdown] = useState(false);
    const [openFavoriteDropdown, setOpenFavoriteDropdown] = useState(false);

    const { products: favoriteProducts } = useSelector((state: RootState) => state.favoriteProducts);
    const { products: cartProducts } = useSelector((state: RootState) => state.cartProducts);

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
                    <button onClick={() => setOpenCartDropdown(!openCartDropdown)} className="h-6 w-6">
                        <ShoppingCartIcon className="h-6 w-6" />
                    </button>
                    <div className="absolute -top-1 -right-1 px-1 bg-red-500 rounded-full text-xs font-semibold text-white">{cartProducts.length}</div>
                    {openCartDropdown && <CartDropdown products={cartProducts} />}
                </div>
                <div className="relative">
                    <button onClick={() => setOpenFavoriteDropdown(!openFavoriteDropdown)} className="h-6 w-6">
                        <StarIcon className="h-6 w-6" />
                    </button>
                    <div className="absolute -top-1 -right-1 px-1 bg-red-500 rounded-full text-xs font-semibold text-white">{favoriteProducts.length}</div>
                    {openFavoriteDropdown && <FavoriteDropdown products={favoriteProducts} />}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
