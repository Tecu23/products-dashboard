import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../redux/store";

import { fetchProducts } from "../redux/slices/productsSlice";

import ProductList from "./ProductList";
import ProductViewer from "./ProductViewer";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading } = useSelector((state: RootState) => state.products);

    console.log(products);

    useEffect(() => {
        console.log("Here");
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <main className="container mx-auto flex flex-row py-20 gap-16">
            <ProductList products={products} loading={loading} />
            <ProductViewer />
        </main>
    );
};

export default Dashboard;
