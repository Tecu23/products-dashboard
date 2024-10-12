import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, CartProductsState } from "../../utils/types";

const initialState: CartProductsState = {
    products: [],
};

// Favorite Products slice
const cartProductsSlice = createSlice({
    name: "cartProducts",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
    },
});

export const { addToCart } = cartProductsSlice.actions;
export default cartProductsSlice.reducer;
