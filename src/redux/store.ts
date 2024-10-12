import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartProductsReducer from "./slices/cartSlice";
import favoriteProductsReducer from "./slices/favoriteSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        favoriteProducts: favoriteProductsReducer,
        cartProducts: cartProductsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
