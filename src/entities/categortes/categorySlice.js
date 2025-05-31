import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { apiUrl } from "../../shared/lib/utilits";

export const getCategory = createAsyncThunk("category/getCategory", async () => {
    const { data } = await axios.get(`${apiUrl}/Category/get-categories`)
    return data.data
})

export const addCategory = createAsyncThunk("category/addCategory", async (newCategory, { dispatch }) => {
    const token = localStorage.getItem("access_token")
    const { data } = await axios.post(`${apiUrl}/Category/add-category`, newCategory, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        }
    })
    dispatch(getCategory())
    return data.data
})

export const editCategory = createAsyncThunk("category/editCategory", async (formData, { dispatch }) => {
    const token = localStorage.getItem("access_token");
    try {
        await axios.put(`${apiUrl}/Category/update-category`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getCategory());
    } catch (error) {
        console.error(error);
        throw error;
    }
}
);

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id) => {
    const token = localStorage.getItem("access_token")

    await axios.delete(`${apiUrl}/Category/delete-category?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
})


export const categorySlice = createSlice({
    name: "category",
    initialState: {
        data: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
    }
})

export default categorySlice.reducer