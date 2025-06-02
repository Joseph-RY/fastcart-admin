import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";
import { getProducts } from "../get-products/get-products";

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id, { dispatch }) => {
    const token = localStorage.getItem("access_token")
    await axios.delete(`${apiUrl}/Product/delete-product?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    dispatch(getProducts())
})