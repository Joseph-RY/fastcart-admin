import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { apiUrl } from "../../shared/lib/utilits"

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    const { data } = await axios.get(`${apiUrl}/Product/get-products`)
    return data.data
})