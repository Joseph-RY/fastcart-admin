import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../shared/lib/utilits";
import { getSubcategories } from "../../get-subcategories/get-subcategories";


export const addSubcategory = createAsyncThunk("subcategory/addSubCategory", async ({ SubCategoryName, CategoryId }, { dispatch }) => {
    const token = localStorage.getItem("access_token");
    const { data } = await axios.post(`${apiUrl}/SubCategory/add-sub-category?CategoryId=${CategoryId}&SubCategoryName=${SubCategoryName}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    dispatch(getSubcategories());
    return data.data;
});