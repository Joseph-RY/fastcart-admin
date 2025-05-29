import { configureStore } from "@reduxjs/toolkit";
import authReducer from "/src/features/auth/authSlice";
import productReducer from "../entities/products/productSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer
    }
})