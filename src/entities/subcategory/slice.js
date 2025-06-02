import { createSlice } from "@reduxjs/toolkit";
import { getSubcategories } from "../../features/get-subcategories/get-subcategories";
import { addSubcategory } from "../../features/add-subcategory/model/add-subcategory";

export const subcategorySlice = createSlice({
    name: "subcategory",
    initialState: {
        data: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubcategories.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(addSubcategory.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
    }
})

export default subcategorySlice.reducer