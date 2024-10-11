import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

const ProductCard = () => {
    return (
        <button className="flex flex-row items-start bg-neutral-100 rounded-lg shadow-md px-8 py-4 hover:shadow-lg max-w-2xl mx-auto">
            {/* Product Image */}
            <div className="w-24 h-24 rounded-full bg-white flex justify-center items-center">
                <img src={"/empty_product.avif"} alt={"Empty"} className="h-24 w-24" />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-3/4 md:pl-6 flex flex-col gap-2 justify-around">
                {/* Title, Description, and Rating */}
                <div className="flex flex-row justify-between">
                    <h3 className="text-xl font-bold text-gray-800">Product Title</h3>
                    <div className="text-lg font-semibold text-gray-800">
                        $20
                        <span className="text-sm text-gray-500 line-through ml-2">${(20 * (100 + 40)) / 100}</span>
                    </div>
                </div>
                <p className="text-xs font-semibold text-gray-600 mt-1 text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                {/* Ratings */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center mt-2">
                        {[...Array(5)].map(() => (
                            <StarIcon className="h-6 w-6 text-yellow-400" />
                        ))}
                    </div>

                    {/* Add to Cart Button and Favorite Button */}
                    <div className="flex items-center space-x-4">
                        <button className="py-2 px-4 rounded-md transition duration-300 bg-cyan-600 text-white hover:bg-cyan-700">Add to Cart</button>
                        <button className="">
                            <OutlineStarIcon className="h-6 w-6 text-gray-500 hover:text-yellow-400" />
                        </button>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default ProductCard;
