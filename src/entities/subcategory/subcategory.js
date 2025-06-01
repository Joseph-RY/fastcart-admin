import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubCategories = createAsyncThunk("subcategory/getSubCategories", async () => {
    const { data } = await axios.get(`${apiUrl}/SubCategory/get-sub-category`)
    return data.data
})

export const subCategorySlice = createSlice({
    name: "subcategory",
    initialState: {
        data: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubCategories.fulfilled, (state, action) => {
                state.data = action.payload
            })
    }
})