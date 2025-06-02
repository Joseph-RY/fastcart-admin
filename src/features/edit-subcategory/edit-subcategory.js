import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";
import { getSubcategories } from "../get-subcategories/get-subcategories";

export const editSubcategory = createAsyncThunk("subcategory/editSubcategory", async ({ id, categoryId, subCategoryName }, { dispatch }) => {
    const token = localStorage.getItem("access_token");
    await axios.put(`${apiUrl}/SubCategory/update-sub-category?Id=${id}&CategoryId=${categoryId}&SubCategoryName=${subCategoryName}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    dispatch(getSubcategories());
});