import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { apiUrl } from "../../shared/lib/utilits";

export const getBrands = createAsyncThunk("brand/getBrands", async () => {
    const { data } = await axios.get(`${apiUrl}/Brand/get-brands`)
    return data.data
})

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

export const addBrands = createAsyncThunk("brand/addBrands", async (newBrand, { dispatch }) => {
    const token = localStorage.getItem("access_token");
    const { data } = await axios.post(`${apiUrl}/Brand/add-brand`, {}, {
        params: { BrandName: newBrand.BrandName },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    dispatch(getBrands());
    return data.data;
});

export const editBrand = createAsyncThunk("brand/editBrand", async ({ id, BrandName }, { dispatch }) => {
    const token = localStorage.getItem("access_token");
    const { data } = await axios.put(`${apiUrl}/Brand/update-brand`, {}, {
        params: { Id: id, BrandName },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    dispatch(getBrands());
    return data.data;
}
);


export const brandSlice = createSlice({
    name: "brand",
    initialState: {
        data: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.fulfilled, (state, action) => {
                state.data = action.payload
            })
    },
})

export default brandSlice.reducer