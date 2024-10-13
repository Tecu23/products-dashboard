import { useEffect, useState, useRef } from "react";

import gsap from "gsap";

import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../redux/store";

import { fetchProducts } from "../redux/slices/productsSlice";

import ProductList from "./ProductList";
import ProductViewer from "./ProductViewer";
import ImageModalCarousel from "./shared/ImageModal";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { products, selectedProduct, loading, page, hasMore } = useSelector((state: RootState) => state.products);

    const observer = useRef<IntersectionObserver | null>(null);
    const observerTarget = useRef<HTMLDivElement | null>(null);

    const productViewerRef = useRef<HTMLDivElement | null>(null);

    const [openImageModal, setOpenImageModal] = useState(false);
    const [imageCurrentIndex, setImageCurrentIndex] = useState(0);

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
            if (entries[0].isIntersecting) {
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

    useEffect(() => {
        if (productViewerRef.current && selectedProduct) {
            gsap.fromTo(
                productViewerRef.current,
                {
                    x: 300, // Start state
                    opacity: 0,
                    scale: 0.9,
                },
                {
                    x: 0, // End state
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                },
            );
        }
    }, [selectedProduct]);

    return (
        <main className="container mx-auto flex flex-row pt-10 lg:py-20 gap-8 h-[85vh] max-h-[90%]">
            <ProductList targetRef={observerTarget} products={products} loading={loading} />

            {selectedProduct != null && (
                <div ref={productViewerRef} className="max-w-4xl w-[1200px] h-full hidden lg:block ">
                    <ProductViewer product={selectedProduct} openImageModal={() => setOpenImageModal(true)} />
                </div>
            )}
            {selectedProduct != null && openImageModal && (
                <ImageModalCarousel images={selectedProduct.images} currentIndex={imageCurrentIndex} onClose={() => setOpenImageModal(false)} />
            )}
        </main>
    );
};

export default Dashboard;
