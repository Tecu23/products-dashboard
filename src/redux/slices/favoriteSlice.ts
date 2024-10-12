import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, FavoriteProductsState } from "../../utils/types";

const initialState: FavoriteProductsState = {
    products: [],
};

const favoriteProductsSlice = createSlice({
    name: "favoriteProducts",
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        removeFromFavorite: (state, action: PayloadAction<{ id: number }>) => {
            const { id } = action.payload;
            state.products = state.products.filter((p) => p.id !== id);
        },
    },
});

export const { addToFavorite, removeFromFavorite } = favoriteProductsSlice.actions;
export default favoriteProductsSlice.reducer;
