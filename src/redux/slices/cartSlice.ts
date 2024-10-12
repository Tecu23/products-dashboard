import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, CartProductsState } from "../../utils/types";

const initialState: CartProductsState = {
    products: [],
};

const cartProductsSlice = createSlice({
    name: "cartProducts",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const fountProduct = state.products.filter((p) => p.id === action.payload.id)[0];
            if (fountProduct) {
                fountProduct.quantity += 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;

            const foundItem = state.products.filter((p) => p.id == id)[0];

            if (foundItem && quantity > 0) {
                foundItem.quantity = quantity;
            } else if (foundItem && quantity === 0) {
                state.products = state.products.filter((p) => p.id !== id);
            }
        },
    },
});

export const { addToCart, updateQuantity } = cartProductsSlice.actions;
export default cartProductsSlice.reducer;
