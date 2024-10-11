import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
    return (
        <nav className="container mx-auto py-4 flex justify-between items-center">
            <div className="">
                <p className="text-3xl font-bold">Logo</p>
            </div>

            <div className="relative">
                <input type="text" className="w-80 border rounded-md py-2 px-4 focus:outline-none" placeholder="Search..." />
                <MagnifyingGlassIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            </div>

            <div className="flex gap-4">
                <ShoppingCartIcon className="h-6 w-6" />
                <StarIcon className="h-6 w-6" />
            </div>
        </nav>
    );
};

export default Navbar;
