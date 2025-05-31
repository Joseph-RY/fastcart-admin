import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { apiUrl } from "../../shared/lib/utilits";

export const getBrands = createAsyncThunk("brands,getBrands", async () => {
    const { data } = await axios.get(`${apiUrl}/Brand/get-brands`)
    return data.data
})

export const brandSlice = createSlice({
    name: "brand",
    initialState: {
        data: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.fulfilled, (state, action) => {
                state.data = action.payload
            })
    },
})

export default brandSlice.reducer