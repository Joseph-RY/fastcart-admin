import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";
import { getSubcategories } from "../get-subcategories/get-subcategories";

export const deleteSubcategory = createAsyncThunk("subcategory/deleteSubcategory", async (id, { dispatch }) => {
    const token = localStorage.getItem("access_token");
    await axios.delete(`${apiUrl}/SubCategory/delete-sub-category`, {
        params: { id },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    dispatch(getSubcategories());
});