import ProductCard from "./ProductCard";
import ProductListLoading from "./ProductListLoading";

import { Product } from "../utils/types";
import { LegacyRef } from "react";

type Props = {
    products: Product[];
    loading: boolean;
    targetRef: LegacyRef<HTMLDivElement> | null;
};

const ProductList = ({ products, loading, targetRef }: Props) => {
    return (
        <div className="w-full max-w-2xl px-4 lg:pr-4 flex flex-col items-center gap-8 overflow-auto">
            {products.length == 0 && loading && <ProductListLoading />}
            {products.map((product, idx) => (
                <div key={product.id} ref={idx === products.length - 1 ? targetRef : null} className="w-full">
                    <ProductCard product={product} />
                </div>
            ))}
            {loading && (
                <div className="w-full h-8 flex justify-center items-center gap-4">
                    <div className="h-8 w-8 border-b-2 border-cyan-500 animate-spin rounded-full"></div>
                    <div className="text-xl font-semibold">Loading more...</div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
