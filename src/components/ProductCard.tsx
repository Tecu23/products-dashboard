import React, { useRef } from "react";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

import gsap from "gsap";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

import { addToCart } from "../redux/slices/cartSlice";
import { addToFavorite } from "../redux/slices/favoriteSlice";
import { setSelectedProduct } from "../redux/slices/productsSlice";

import Rating from "./shared/Rating";

import { Product } from "../utils/types";

const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { products: favoriteProducts } = useSelector((state: RootState) => state.favoriteProducts);
    const { products: cartProducts } = useSelector((state: RootState) => state.cartProducts);

    const isFavorite = favoriteProducts.filter((p) => p.id === product.id)[0] != undefined;
    const isInCart = cartProducts.filter((p) => p.id === product.id)[0] != undefined;

    const addToCartButtonRef = useRef<HTMLButtonElement | null>(null);
    const addToFavoriteButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
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
            className="flex flex-col gap-2 items-center bg-white rounded-lg shadow-md p-2 hover:shadow-lg max-w-[180px] md:max-w-64"
        >
            <div className="w-3/4 flex-shrink-0 flex-grow-0 flex-auto flex justify-center items-center border-b border-[#EFF2F4]">
                <img src={product.thumbnail} className="object-fill" alt={`thumbnail-${product.id}`} />
            </div>

            <div className="flex flex-col w-full px-1 py-3 gap-2 relative">
                <div className="absolute top-2 right-2 rounded-md border border-[#DEE2E7] w-8 h-8 flex items-center justify-center">
                    <button aria-label="Add product to favorites" ref={addToFavoriteButtonRef} disabled={isFavorite} onClick={handleAddToFavorite} className="">
                        {!isFavorite && <OutlineHeartIcon className="h-4 xl:h-6 w-4 xl:w-6 text-[#0D6EFD] hover:text-blue-700" />}
                        {isFavorite && <HeartIcon className="h-4 xl:h-6 w-4 xl:w-6 text-red-500" />}
                    </button>
                </div>
                <h2 className="text-[13px] font-light text-[#606060] max-w-40 overflow-hidden text-ellipsis whitespace-nowrap">{product.title}</h2>
                <div className="text-base font-semibold text-[#1C1C1C]">
                    ${product.price}
                    <span className="text-[#8B96A5] line-through ml-2">${((product.price * (100 + product.discountPercentage)) / 100).toFixed(2)}</span>
                </div>
                <div className="flex flex-row justify-between items-center pr-3">
                    <Rating rating={product.rating} size="small" />
                    <button
                        ref={addToCartButtonRef}
                        disabled={isInCart}
                        onClick={handleAddToCart}
                        aria-label="Add product to cart"
                        className="flex justify-center items-center text-cyan-700 hover:text-cyan-800 text-xs font-semibold"
                    >
                        {isInCart ? "In Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
