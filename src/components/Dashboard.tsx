import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../redux/store";

import { fetchProducts } from "../redux/slices/productsSlice";

import ProductList from "./ProductList";
import ProductViewer from "./ProductViewer";
import ProductListLoading from "./ProductListLoading";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, selectedProduct, loading } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <main className="container mx-auto flex flex-row pt-10 lg:py-20 gap-8 h-[85vh] max-h-[1000px]">
            {products.length == 0 && loading && <ProductListLoading />}
            {products.length > 0 && <ProductList products={products} loading={loading} />}

            {selectedProduct != null && <ProductViewer product={selectedProduct} />}
            {selectedProduct == null && !loading && (
                <div className="flex items-center justify-center h-full w-full p-4 bg-gray-200 rounded-lg shadow-md">
                    <p className="text-xl font-semibold text-gray-500">Select a product to view its details</p>
                </div>
            )}
        </main>
    );
};

export default Dashboard;
