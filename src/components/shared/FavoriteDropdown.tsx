import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Product } from "../../utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { removeFromFavorite } from "../../redux/slices/favoriteSlice";
import { addToCart } from "../../redux/slices/cartSlice";

type Props = { products: Product[] };

function FavoriteDropdown({ products }: Props) {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-4">
                {products.length === 0 ? (
                    <p className="text-gray-500 text-sm">Your list is empty</p>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {products.map((product: Product) => (
                            <li key={product.id} className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 flex-grow-0">
                                    <img src={product.thumbnail} className="object-fill" />
                                </div>
                                <p className="text-sm font-bold">{product.title}</p>
                                <button
                                    onClick={() => {
                                        dispatch(removeFromFavorite({ id: product.id }));
                                        dispatch(addToCart(product));
                                    }}
                                    className="h-8 p-2 flex justify-center items-center rounded-lg transition duration-300 bg-cyan-700 text-white hover:bg-cyan-800 text-xs lg:text-sm font-semibold"
                                    aria-expanded="false"
                                    aria-label="Add product to cart from favorite list"
                                >
                                    <ShoppingBagIcon className="w-4 h-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default FavoriteDropdown;
