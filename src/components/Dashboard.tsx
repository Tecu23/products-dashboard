import { useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../redux/store";

import { fetchProducts } from "../redux/slices/productsSlice";

import ProductList from "./ProductList";
import ProductViewer from "./ProductViewer";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { products, selectedProduct, loading, page, hasMore } = useSelector((state: RootState) => state.products);

    const observer = useRef<IntersectionObserver | null>(null);
    const observerTarget = useRef<HTMLDivElement | null>(null);

    // only first initial fetch
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts(page));
        }
    }, [page, dispatch, products.length]);

    useEffect(() => {
        // exit early if we are already fetching or there are not more items
        if (loading || !hasMore) return;

        // disconnect previously set observer
        if (observer.current) observer.current.disconnect();

        // check if target is in viewport and fetch data
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                dispatch(fetchProducts(page));
            }
        });

        // if target exist then observe it
        if (observerTarget.current) {
            observer.current.observe(observerTarget.current);
        }

        // cleanup
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading, dispatch, page, hasMore]);

    console.log(loading);

    return (
        <main className="container mx-auto flex flex-row pt-10 lg:py-20 gap-8 h-[85vh] max-h-[90%]">
            <ProductList targetRef={observerTarget} products={products} loading={loading} />

            {selectedProduct != null && <ProductViewer product={selectedProduct} />}
            {selectedProduct == null && !loading && (
                <div className="hidden lg:flex items-center justify-center h-full w-full p-4 bg-gray-200 rounded-lg shadow-md">
                    <p className="text-xl font-semibold text-gray-500">Select a product to view its details</p>
                </div>
            )}
        </main>
    );
};

export default Dashboard;
