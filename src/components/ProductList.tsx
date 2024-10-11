import ProductCard from "./ProductCard";

const ProductList = () => {
    return (
        <div className="flex flex-col items-center gap-8">
            {/* Example product cards */}
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    );
};

export default ProductList;
