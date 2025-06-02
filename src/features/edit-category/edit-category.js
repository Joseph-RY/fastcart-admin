import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";
import { getCategories } from "../get-categories/get-categories";

export const editCategory = createAsyncThunk("category/editCategory", async (formData, { dispatch }) => {
    const token = localStorage.getItem("access_token");
    await axios.put(`${apiUrl}/Category/update-category`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    dispatch(getCategories());
});