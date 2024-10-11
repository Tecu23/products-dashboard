import ProductCard from "./ProductCard";

const ProductList = () => {
    return (
        <div className="w-full max-w-4xl px-4 flex flex-col items-center gap-8">
            {/* Example product cards */}
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    );
};

export default ProductList;
