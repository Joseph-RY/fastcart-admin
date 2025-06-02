import { createSlice } from "@reduxjs/toolkit";
import { getBrands } from "../../features/get-brands/get-brands";

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