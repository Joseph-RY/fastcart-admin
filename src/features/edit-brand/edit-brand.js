import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";
import { getBrands } from "../get-brands/get-brands";

export const editBrand = createAsyncThunk("brand/editBrand", async ({ id, BrandName }, { dispatch }) => {
    const token = localStorage.getItem("access_token");
    const { data } = await axios.put(
        `${apiUrl}/Brand/update-brand?id=${id}&BrandName=${BrandName}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    );

    dispatch(getBrands());
    return data.data;
});