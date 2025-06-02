import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../../features/get-categories/get-categories";
// import { addCategory } from "../../features/add-category/add-category";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        data: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.data = action.payload
            })
    }
})

export default categorySlice.reducer