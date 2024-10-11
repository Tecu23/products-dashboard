import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

const ProductViewer = () => {
    return (
        <div className="hidden lg:block bg-gray-200 rounded-lg p-8 shadow-md w-full h-[700px] max-w-4xl mx-auto">
            <div className="flex gap-16">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Product Title</h2>
                        <div className="flex flex-col md:items-end">
                            <div className="text-2xl font-semibold text-gray-900">
                                $20
                                <span className="text-sm text-gray-500 line-through ml-2">${(20 * (100 + 40)) / 100}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="relative mb-6">
                            <img src={"/empty_product.avif"} alt={"Empty"} className="w-full h-64 md:h-80 object-cover rounded-lg" />
                            <button className="absolute top-4 right-4 bg-white text-gray-700 p-2 rounded-md shadow-md hover:bg-gray-100">⤢</button>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Product Description</h3>
                        <p className="text-gray-700 text-base mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Dimensions</h4>
                                <p className="text-gray-600">Dimensions</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Weight</h4>
                                <p className="text-gray-600">Weight</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-end gap-2 w-3/5 flex-grow ">
                    <div className="flex flex-col gap-4 items-end w-full">
                        <div className="flex mt-2">
                            {[...Array(5)].map(() => (
                                <StarIcon className="h-6 w-6 text-yellow-400" />
                            ))}
                        </div>

                        <div className="w-full ">
                            <div className="space-y-4">
                                {["Product Review"].map((review, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                                        <p className="text-gray-700">{review}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="py-2 px-4 rounded-md transition duration-300 bg-cyan-600 text-white hover:bg-cyan-700">Add to Cart</button>
                        <button className="">
                            <OutlineStarIcon className="h-6 w-6 text-gray-500 hover:text-yellow-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductViewer;
