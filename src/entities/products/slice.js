import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../features/get-products/get-products";
import { getProductById } from "../../features/get-product-by-id/get-product-by-id";

export const productSlice = createSlice({
    name: "products",
    initialState: {
        data: null,
        product: {}
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.product = action.payload
            })
    },
})

export default productSlice.reducer