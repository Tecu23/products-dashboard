import { Product } from "../../utils/types";

type Props = { products: Product[] };

function FavoriteDropdown({ products }: Props) {
    return (
        <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-4">
                {products.length === 0 ? (
                    <p className="text-gray-500 text-sm">Your cart is empty</p>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {products.map((product: Product) => (
                            <li key={product.id} className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 flex-grow-0">
                                    <img src={product.thumbnail} className="object-fill" />
                                </div>
                                <p className="text-sm font-bold">{product.title}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default FavoriteDropdown;
