import ProductCard from "./ProductCard";
import { Product } from "../utils/types";

type Props = {
    products: Product[];
    loading: boolean;
};

const ProductList = ({ products, loading }: Props) => {
    console.log(products, loading);
    return (
        <div className="w-full max-w-4xl px-4 flex flex-col items-center gap-8">
            {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
