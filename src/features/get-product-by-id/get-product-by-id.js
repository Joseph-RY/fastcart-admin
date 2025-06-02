import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";

export const getProductById = createAsyncThunk("product/getProductById", async (id) => {
    const data = await axios.get(`${apiUrl}/Product/get-product-by-id?id=${id}`)
    return data.data
})