import { useRef } from "react";

import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

import gsap from "gsap";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

import { addToCart } from "../redux/slices/cartSlice";
import { addToFavorite } from "../redux/slices/favoriteSlice";
import { setSelectedProduct } from "../redux/slices/productsSlice";

import Rating from "./shared/Rating";

import { Product } from "../utils/types";
import { StarIcon } from "@heroicons/react/24/solid";

const ProductCard = ({ product }: { product: Product }) => {
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
        <div
            role="button"
            onClick={() => {
                dispatch(setSelectedProduct(product));
            }}
            className="flex flex-row gap-4 items-center bg-neutral-100 rounded-lg shadow-md px-4 lg:px-8 py-4 hover:shadow-lg w-full max-w-2xl"
        >
            {/* Product Image */}
            <div className="w-24 h-24 flex-shrink-0 flex-grow-0 flex-auto rounded-full flex justify-center items-center bg-white-100 bg-white">
                <img src={product.thumbnail} className="object-fill" alt={`thumbnail-${product.id}`} />
            </div>

            <div className="lg:pl-6 flex flex-col gap-2 justify-around flex-grow">
                {/* Title, Description, and Rating */}
                <div className="flex flex-row justify-between">
                    <h2 className="text-lg lg:text-xl font-bold text-gray-800">{product.title}</h2>
                    <div className="text-sm lg:text-lg font-semibold text-gray-800">
                        ${product.price}
                        <span className="text-xs lg:text-sm text-gray-600 line-through ml-2">${((product.price * (100 + product.discountPercentage)) / 100).toFixed(2)}</span>
                    </div>
                </div>
                <p className="text-xs font-semibold text-gray-600 mt-1 text-left w-3/4 overflow-hidden overflow-ellipsis line-clamp-2">{product.description}</p>

                {/* Ratings */}
                <div className="flex justify-between items-center">
                    <Rating rating={product.rating} />

                    {/* Add to Cart Button and Favorite Button */}
                    <div className="flex items-center gap-2">
                        <button
                            ref={addToCartButtonRef}
                            disabled={isInCart}
                            onClick={handleAddToCart}
                            aria-label="Add product to cart"
                            className="h-8 p-2 flex justify-center items-center rounded-lg transition duration-300 bg-cyan-700 text-white hover:bg-cyan-800 text-xs lg:text-sm font-semibold"
                        >
                            {<p className="inline-block">{isInCart ? "In Cart" : "Add to Cart"}</p>}
                        </button>
                        <button aria-label="Add product to favorites" ref={addToFavoriteButtonRef} disabled={isFavorite} onClick={handleAddToFavorite} className="">
                            {!isFavorite && <OutlineStarIcon className="h-4 lg:h-6 w-4 lg:w-6 text-gray-500 hover:text-yellow-500" />}
                            {isFavorite && <StarIcon className="h-4 lg:h-6 w-4 lg:w-6 text-yellow-500" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
