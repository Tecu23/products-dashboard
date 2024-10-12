import { formatDistance } from "date-fns";

import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

import Rating from "./shared/Rating";

import { Product } from "../utils/types";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addToFavorite } from "../redux/slices/favoriteSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { StarIcon } from "@heroicons/react/24/solid";

const ProductViewer = ({ product }: { product: Product }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { products: favoriteProducts } = useSelector((state: RootState) => state.favoriteProducts);
    const { products: cartProducts } = useSelector((state: RootState) => state.cartProducts);

    const isFavorite = favoriteProducts.filter((p) => p.id === product.id)[0] != undefined;
    const isInCart = cartProducts.filter((p) => p.id === product.id)[0] != undefined;

    return (
        <div className="hidden lg:block bg-gray-200 rounded-lg p-8 shadow-md h-[800px] w-[1200px] mx-auto">
            <div className="flex gap-10 h-full">
                <div className="flex flex-col gap-2 h-full w-3/5">
                    <div className="flex justify-between items-center">
                        <h2 className="w-60 text-2xl font-bold text-gray-800">{product.title}</h2>
                        <div className="flex flex-col md:items-end">
                            <div className="text-xl font-semibold text-gray-900">
                                ${product.price}
                                <span className="text-sm text-gray-500 line-through ml-2">${((product.price * (100 + product.discountPercentage)) / 100).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="relative">
                            <img src={product.thumbnail} alt={product.title} className="w-full h-64 md:w-80 md:h-80 object-cover rounded-lg" />
                            <button className="absolute top-4 right-4 bg-white text-gray-700 p-2 rounded-md shadow-md hover:bg-gray-100">⤢</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-gray-800 ">Description</h3>
                        <p className="text-gray-700 text-base">{product.description}</p>
                        <div className="flex flex-col gap-2">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Dimensions</h4>
                                <p className="text-gray-600">{product.dimensions.width + " x " + product.dimensions.height + " x " + product.dimensions.depth}</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">Weight</h4>
                                <p className="text-gray-600">{product.weight} kg</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-end gap-2 w-2/5 h-full">
                    <div className="flex flex-col gap-4 items-end w-full h-[90%]">
                        <div className="flex mt-2">
                            <Rating rating={product.rating} />
                        </div>

                        <div className="w-full py-2 overflow-auto h-full">
                            <div className="space-y-4 ">
                                {product.reviews.map((review, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-md flex-col justify-start items-start gap-4">
                                        <div className="flex justify-start items-center">
                                            <Rating rating={review.rating} />
                                        </div>

                                        <p className="text-gray-700 text-base font-semibold py-2">{review.comment}</p>
                                        <div className="flex flex-col items-end justify-between ">
                                            <p className="text-gray-700 text-sm font-semibold">{review.reviewerName}</p>
                                            <p className="text-gray-700">{formatDistance(review.date, new Date(), { addSuffix: true })}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            disabled={isInCart}
                            onClick={() => dispatch(addToCart(product))}
                            className="py-2 px-4 rounded-md transition duration-300 bg-cyan-600 text-white hover:bg-cyan-700"
                        >
                            {isInCart ? "In Cart" : "Add to Cart"}
                        </button>
                        <button disabled={isFavorite} className="" onClick={() => dispatch(addToFavorite(product))}>
                            {!isFavorite && <OutlineStarIcon className="h-4 lg:h-6 w-4 lg:w-6 text-gray-500 hover:text-yellow-500" />}
                            {isFavorite && <StarIcon className="h-4 lg:h-6 w-4 lg:w-6 text-yellow-500" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductViewer;
