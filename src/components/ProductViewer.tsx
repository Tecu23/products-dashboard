import { useRef } from "react";

import { formatDistance } from "date-fns";

import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

import gsap from "gsap";

import Rating from "./shared/Rating";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

import { addToCart } from "../redux/slices/cartSlice";
import { addToFavorite } from "../redux/slices/favoriteSlice";

import { Product } from "../utils/types";

const ProductViewer = ({ product }: { product: Product }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { products: favoriteProducts } = useSelector((state: RootState) => state.favoriteProducts);
    const { products: cartProducts } = useSelector((state: RootState) => state.cartProducts);

    const isFavorite = favoriteProducts.filter((p) => p.id === product.id)[0] != undefined;
    const isInCart = cartProducts.filter((p) => p.id === product.id)[0] != undefined;

    const addToCartButtonRef = useRef<HTMLButtonElement | null>(null);
    const addToFavoriteButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleAddToCart = () => {
        if (addToCartButtonRef.current) {
            gsap.to(addToCartButtonRef.current, {
                scale: 1.5,
                duration: 0.5,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
                onComplete: () => {
                    gsap.to(addToFavoriteButtonRef.current, {
                        scale: 1,
                        duration: 0.3,
                    });
                    dispatch(addToCart(product));
                },
            });
        }
    };

    const handleAddToFavorite = () => {
        if (addToFavoriteButtonRef.current) {
            gsap.to(addToFavoriteButtonRef.current, {
                scale: 1.5,
                rotation: 360,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)",
                onComplete: () => {
                    gsap.to(addToFavoriteButtonRef.current, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                    });
                    dispatch(addToFavorite(product));
                },
            });
        }
    };

    return (
        <div className="hidden lg:block bg-gray-200 rounded-lg p-8 shadow-md w-full h-full">
            <div className="flex gap-10 h-full">
                <div className="flex flex-col gap-2 h-full w-3/5">
                    <div className="flex justify-between items-center">
                        <h2 className="w-60 text-2xl font-bold text-gray-800">{product.title}</h2>
                        <div className="flex flex-col md:items-end">
                            <div className="text-xl font-semibold text-gray-900">
                                ${product.price}
                                <span className="text-sm text-gray-600 line-through ml-2">${((product.price * (100 + product.discountPercentage)) / 100).toFixed(2)}</span>
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
                        <h2 className="text-xl font-bold text-gray-800 ">Description</h2>
                        <p className="text-gray-700 text-base">{product.description}</p>
                        <div className="flex flex-col gap-2">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Dimensions</h3>
                                <p className="text-gray-600">{product.dimensions.width + " x " + product.dimensions.height + " x " + product.dimensions.depth}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Weight</h3>
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
                            ref={addToCartButtonRef}
                            disabled={isInCart}
                            onClick={handleAddToCart}
                            aria-label="Add product to cart"
                            className="py-2 px-4 rounded-md transition duration-300 bg-cyan-700 text-white hover:bg-cyan-800"
                        >
                            {isInCart ? "In Cart" : "Add to Cart"}
                        </button>
                        <button aria-label="Add product to favorites" ref={addToFavoriteButtonRef} disabled={isFavorite} className="" onClick={handleAddToFavorite}>
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
