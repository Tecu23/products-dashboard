import { StarIcon as OutlineStarIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import { addToFavorite } from "../redux/slices/favoriteSlice";
import { setSelectedProduct } from "../redux/slices/productsSlice";

import Rating from "./shared/Rating";

import { Product } from "../utils/types";
import { StarIcon } from "@heroicons/react/24/solid";
import { addToCart } from "../redux/slices/cartSlice";

const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { products: favoriteProducts } = useSelector((state: RootState) => state.favoriteProducts);
    const { products: cartProducts } = useSelector((state: RootState) => state.cartProducts);

    const isFavorite = favoriteProducts.filter((p) => p.id === product.id)[0] != undefined;
    const isInCart = cartProducts.filter((p) => p.id === product.id)[0] != undefined;
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
                <img src={product.thumbnail} className="object-fill" />
            </div>

            <div className="lg:pl-6 flex flex-col gap-2 justify-around flex-grow">
                {/* Title, Description, and Rating */}
                <div className="flex flex-row justify-between">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800">{product.title}</h3>
                    <div className="text-sm lg:text-lg font-semibold text-gray-800">
                        ${product.price}
                        <span className="text-xs lg:text-sm text-gray-500 line-through ml-2">${((product.price * (100 + product.discountPercentage)) / 100).toFixed(2)}</span>
                    </div>
                </div>
                <p className="text-xs font-semibold text-gray-600 mt-1 text-left w-3/4 overflow-hidden overflow-ellipsis line-clamp-2">{product.description}</p>

                {/* Ratings */}
                <div className="flex justify-between items-center">
                    <Rating rating={product.rating} />

                    {/* Add to Cart Button and Favorite Button */}
                    <div className="flex items-center gap-2">
                        <button
                            disabled={isInCart}
                            onClick={() => dispatch(addToCart(product))}
                            className="h-8 p-2 flex justify-center items-center rounded-lg transition duration-300 bg-cyan-600 text-white hover:bg-cyan-700 text-xs lg:text-sm font-semibold"
                        >
                            {<p className="hidden lg:inline-block">{isInCart ? "In Cart" : "Add to Cart"}</p>}
                            <ShoppingBagIcon className="inline-block lg:hidden h-4 w-4" />
                        </button>
                        <button disabled={isFavorite} onClick={() => dispatch(addToFavorite(product))} className="">
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
