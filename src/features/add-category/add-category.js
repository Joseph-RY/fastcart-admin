import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { apiUrl } from "../../shared/lib/utilits";
import { getCategories } from "../get-categories/get-categories";


export const addCategory = createAsyncThunk("category/addCategory", async (newCategory, { dispatch }) => {
    const token = localStorage.getItem("access_token")
    const { data } = await axios.post(`${apiUrl}/Category/add-category`, newCategory, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        }
    })
    dispatch(getCategories())
    return data.data
})