import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Product } from "../../utils/types";

const initialState: ProductsState = {
    products: [],
    selectedProduct: null,
    loading: false,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    return data.products;
});

// Products slice
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
            state.selectedProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.products = [...state.products, ...action.payload];
            state.loading = false;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
