import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    const { data } = await axios.get(`${apiUrl}/Product/get-products`)
    return data.data
})

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
    const token = localStorage.getItem("access_token")
    await axios.delete(`${apiUrl}/Product/delete-product?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    getProducts()
})

export const productSlice = createSlice({
    name: "products",
    initialState: {
        data: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(deleteProduct.fulfilled, () => {

            })
    },
})

export default productSlice.reducer