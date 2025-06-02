import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { apiUrl } from "../../shared/lib/utilits";
import { getCategories } from "../get-categories/get-categories";

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id, { dispatch }) => {
    const token = localStorage.getItem("access_token")

    await axios.delete(`${apiUrl}/Category/delete-category?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    dispatch(getCategories())
})