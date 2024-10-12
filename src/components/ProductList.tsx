import ProductCard from "./ProductCard";
import ProductListLoading from "./ProductListLoading";

import { Product } from "../utils/types";

type Props = {
    products: Product[];
    loading: boolean;
};

const ProductList = ({ products, loading }: Props) => {
    return (
        <div className="w-full max-w-2xl pr-4 flex flex-col items-center gap-8 overflow-auto">
            {products.length == 0 && loading && <ProductListLoading />}
            {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
