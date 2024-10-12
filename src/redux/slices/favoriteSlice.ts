import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, FavoriteProductsState } from "../../utils/types";

const initialState: FavoriteProductsState = {
    products: [],
};

// Favorite Products slice
const favoriteProductsSlice = createSlice({
    name: "favoriteProducts",
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
    },
});

export const { addToFavorite } = favoriteProductsSlice.actions;
export default favoriteProductsSlice.reducer;
