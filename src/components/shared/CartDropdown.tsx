import { useDispatch } from "react-redux";
import { updateQuantity } from "../../redux/slices/cartSlice";
import { CartProduct } from "../../utils/types";
import { AppDispatch } from "../../redux/store";

type Props = { products: CartProduct[] };

function CartDropdown({ products }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-4">
                {products.length === 0 ? (
                    <p className="text-gray-500 text-sm">Your cart is empty</p>
                ) : (
                    <ul>
                        {products.map((product: CartProduct) => (
                            <li key={product.id} className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0 flex-grow-0">
                                        <img src={product.thumbnail} className="object-fill" />
                                    </div>
                                    <p className="text-sm font-bold">{product.title}</p>
                                </div>
                                <div className="flex items-center font-semibold text-sm">
                                    <button onClick={() => dispatch(updateQuantity({ id: product.id, quantity: product.quantity - 1 }))} className="text-gray-500 pr-2">
                                        -
                                    </button>
                                    <span className="text-sm">{product.quantity}</span>
                                    <button onClick={() => dispatch(updateQuantity({ id: product.id, quantity: product.quantity + 1 }))} className="text-gray-500 pl-2">
                                        +
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {products.length > 0 && (
                <div className="border-t border-gray-200 p-4">
                    <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600">Go to Checkout</button>
                </div>
            )}
        </div>
    );
}

export default CartDropdown;
