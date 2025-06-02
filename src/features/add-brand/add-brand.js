import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";
import { getBrands } from "../get-brands/get-brands";

export const addBrand = createAsyncThunk("brand/addBrand", async (BrandName, { dispatch }) => {
    const token = localStorage.getItem("access_token");
    const { data } = await axios.post(`${apiUrl}/Brand/add-brand?BrandName=${BrandName}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    dispatch(getBrands());
    return data.data;
});