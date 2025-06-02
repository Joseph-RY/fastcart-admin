import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";

export const addProduct = createAsyncThunk("products/addProduct", async (formData) => {
    const token = localStorage.getItem("access_token");
    const { data } = await axios.post(`${apiUrl}/Product/add-product`, formData, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });

    return data.data;
});
