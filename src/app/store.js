import { configureStore } from "@reduxjs/toolkit";
import authReducer from "/src/features/auth/authSlice";
import productReducer from "../entities/products/slice";
import categoryReducer from "../entities/categories/slice";
import brandReducer from "../entities/brands/slice";
import subcategoryReducer from "../entities/subcategory/slice";
import colorReducer from "../entities/colors/slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        category: categoryReducer,
        brand: brandReducer,
        subcategory: subcategoryReducer,
        color: colorReducer,
    }
})