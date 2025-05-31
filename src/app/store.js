import { configureStore } from "@reduxjs/toolkit";
import authReducer from "/src/features/auth/authSlice";
import productReducer from "../entities/products/productSlice";
import categoryReducer from "../entities/categortes/categorySlice";
import brandReducer from "../entities/brands/brandSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        category: categoryReducer,
        brand: brandReducer
    }
})