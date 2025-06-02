import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";

export const updateProduct = createAsyncThunk("editProduct/updateProduct", async (pro) => {
    const token = localStorage.getItem("access_token");
    try {
        await axios.put(`${apiUrl}/Product/update-product?Id=${pro.Id}&BrandId=${pro.BrandId}&ColorId=${pro.ColorId}&ProductName=${pro.ProductName}&Description=${pro.Description}&Quantity=${pro.Quantity}&Size=${pro.Size}&Weight=${pro.Weight}&Code=${pro.Code}&Price=${pro.Price}&HasDiscount=${pro.HasDiscount}&DiscountPrice=${pro.DiscountPrice}&SubCategoryId=${pro.SubCategoryId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        console.error(error)
    }
});
