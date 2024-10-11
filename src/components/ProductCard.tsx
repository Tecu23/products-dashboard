import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const ProductCard = () => {
    return (
        <button className="flex flex-row gap-4 items-center bg-neutral-100 rounded-lg shadow-md px-4 lg:px-8 py-4 hover:shadow-lg w-full max-w-2xl">
            {/* Product Image */}
            <div className="w-24 h-24 rounded-full flex justify-center items-center">
                <img src={"/empty_product.avif"} alt={"Empty"} className="object-fill" />
            </div>

            <div className="lg:pl-6 flex flex-col gap-2 justify-around flex-grow">
                {/* Title, Description, and Rating */}
                <div className="flex flex-row justify-between">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800">Product Title</h3>
                    <div className="text-sm lg:text-lg font-semibold text-gray-800">
                        $20
                        <span className="text-xs lg:text-sm text-gray-500 line-through ml-2">${(20 * (100 + 40)) / 100}</span>
                    </div>
                </div>
                <p className="text-xs font-semibold text-gray-600 mt-1 text-left w-3/4 overflow-hidden overflow-ellipsis line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                {/* Ratings */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center mt-2">
                        {[...Array(5)].map(() => (
                            <StarIcon className="h-4 lg:h-6 w-4 lg:w-6 text-yellow-400" />
                        ))}
                    </div>

                    {/* Add to Cart Button and Favorite Button */}
                    <div className="flex items-center gap-2">
                        <button className="h-8 p-2 flex justify-center items-center rounded-lg transition duration-300 bg-cyan-600 text-white hover:bg-cyan-700 text-xs lg:text-sm font-semibold">
                            <p className="hidden lg:inline-block">Add to Cart</p>
                            <ShoppingBagIcon className="inline-block lg:hidden h-4 w-4" />
                        </button>
                        <button className="">
                            <OutlineStarIcon className="h-4 lg:h-6 w-4 lg:w-6 text-gray-500 hover:text-yellow-400" />
                        </button>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default ProductCard;
