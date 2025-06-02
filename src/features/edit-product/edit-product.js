import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";

export const updateProduct = createAsyncThunk("editProduct/updateProduct", async (product) => {
    const token = localStorage.getItem("access_token");
    await axios.put(`${apiUrl}/Product/update-product`, product, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return product;
});




