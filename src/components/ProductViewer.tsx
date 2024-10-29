import { useRef, useState } from "react";

import { formatDistance } from "date-fns";

import { ArrowsPointingOutIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

import gsap from "gsap";

import Rating from "./shared/Rating";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

import { addToCart } from "../redux/slices/cartSlice";
import { addToFavorite } from "../redux/slices/favoriteSlice";

import { Product } from "../utils/types";

const ProductViewer = ({ product, openImageModal }: { product: Product; openImageModal: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { products: favoriteProducts } = useSelector((state: RootState) => state.favoriteProducts);
    const { products: cartProducts } = useSelector((state: RootState) => state.cartProducts);

    const isFavorite = favoriteProducts.filter((p) => p.id === product.id)[0] != undefined;
    const isInCart = cartProducts.filter((p) => p.id === product.id)[0] != undefined;

    const addToCartButtonRef = useRef<HTMLButtonElement | null>(null);
    const addToFavoriteButtonRef = useRef<HTMLButtonElement | null>(null);

    const [reviewIndex, setReviewIndex] = useState(0);

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
        <>
            <div className="bg-white rounded p-6 shadow-lg w-full h-full flex gap-8">
                <div className="flex flex-col w-[calc(50% - 16px)] flex-shrink-0 flex-grow-0">
                    <div className="relative w-full flex justify-center items-center">
                        <img src={product.thumbnail} alt={product.title} className="w-full" />
                        <button
                            aria-label="Open image modal"
                            onClick={() => openImageModal()}
                            className="absolute top-4 right-4 bg-white text-gray-700 p-2 rounded-md shadow-md hover:bg-gray-100"
                        >
                            <ArrowsPointingOutIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex flex-row">
                        {product.images.map((img) => (
                            <img src={img} className="w-20 h-20" />
                        ))}
                    </div>

                    <div className="w-full py-8 overflow-auto h-full">
                        <div className="relative">
                            {product.reviews.map((review, idx) => (
                                <div
                                    key={idx}
                                    className={`w-full min-h-[130px] relative flex-shrink-0 ${idx !== reviewIndex ? "hidden" : ""}  p-4 rounded-lg shadow-md flex flex-col justify-between gap-4 bg-gray-50`}
                                >
                                    <p className="text-[#1C1C1C] text-xs xl:text-base font-semibold flex-grow self-center flex justify-center items-center">{review.comment}</p>

                                    <div className="w-full flex flex-row justify-between items-end">
                                        <Rating rating={review.rating} size={"small"} />
                                        <div className="flex flex-col items-end justify-between self-end">
                                            <p className="text-[#1C1C1C] text-xl lg:text-sm font-semibold">{review.reviewerName}</p>
                                            <p className="text-[#1C1C1C] text-xs">{formatDistance(review.date, new Date(), { addSuffix: true })}</p>
                                        </div>
                                    </div>
                                    {product.reviews.length > 1 && (
                                        <button
                                            onClick={() => {
                                                setReviewIndex((reviewIndex - 1 + product.reviews.length) % product.reviews.length);
                                            }}
                                            className="absolute top-1/2 left-0 transform -translate-y-1/2"
                                            aria-label="Show previous review"
                                        >
                                            <ChevronLeftIcon className="w-6 h-6" />
                                        </button>
                                    )}
                                    {product.reviews.length > 1 && (
                                        <button
                                            onClick={() => setReviewIndex((reviewIndex - 1 + product.reviews.length) % product.reviews.length)}
                                            className="absolute top-1/2 right-0 transform -translate-y-1/2"
                                            aria-label="Show next review"
                                        >
                                            <ChevronRightIcon className="w-6 h-6" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 relative">
                    <div className="absolute top-0 right-0 rounded-md border border-[#DEE2E7] w-10 h-10 flex items-center justify-center">
                        <button aria-label="Add product to favorites" ref={addToFavoriteButtonRef} disabled={isFavorite} onClick={handleAddToFavorite} className="">
                            {!isFavorite && <OutlineHeartIcon className="h-4 xl:h-6 w-4 xl:w-6 text-[#0D6EFD] hover:text-blue-700" />}
                            {isFavorite && <HeartIcon className="h-4 xl:h-6 w-4 xl:w-6 text-red-500" />}
                        </button>
                    </div>
                    <h2 className="text-xl font-bold text-[#1C1C1C]">{product.title}</h2>
                    <Rating rating={product.rating} size="large" />
                    <div className="text-lg font-medium pb-6 border-b border-[#EFF2F4] text-[#1C1C1C]">
                        ${product.price}
                        <span className="text-[#8B96A5] line-through ml-2">${((product.price * (100 + product.discountPercentage)) / 100).toFixed(2)}</span>
                    </div>

                    <button
                        ref={addToCartButtonRef}
                        disabled={isInCart}
                        onClick={handleAddToCart}
                        aria-label="Add product to cart"
                        className="py-2 px-4 rounded-md transition duration-300 bg-cyan-700 text-white hover:bg-cyan-800"
                    >
                        {isInCart ? "In Cart" : "Add to Cart"}
                    </button>
                    <div className="flex flex-col gap-2 pt-10">
                        <h2 className="text-xl font-bold text-[#1C1C1C]">Description</h2>
                        <p className="text-[#1C1C1C] font-light text-base">{product.description}</p>
                        <div className="flex flex-col gap-2">
                            <div>
                                <h3 className="text-lg font-semibold text-[#1C1C1C]">Dimensions</h3>
                                <p className="text-[#1C1C1C] font-light">{product.dimensions.width + " x " + product.dimensions.height + " x " + product.dimensions.depth}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#1C1C1C]">Weight</h3>
                                <p className="text-[#1C1C1C] font-light">{product.weight} kg</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductViewer;
