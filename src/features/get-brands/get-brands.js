import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { apiUrl } from "../../shared/lib/utilits"

export const getBrands = createAsyncThunk("brand/getBrands", async () => {
    const { data } = await axios.get(`${apiUrl}/Brand/get-brands`)
    return data.data
})