import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";
import { getBrands } from "../get-brands/get-brands";

export const deleteBrand = createAsyncThunk("brand/deleteBrand", async (id, { dispatch }) => {
    const token = localStorage.getItem("access_token");
    const { data } = await axios.delete(`${apiUrl}/Brand/delete-brand?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    dispatch(getBrands())
    return data.data
})