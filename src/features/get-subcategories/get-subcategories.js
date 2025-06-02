import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { apiUrl } from "../../shared/lib/utilits"

export const getSubcategories = createAsyncThunk("subcategory/getSubCategories", async () => {
    const { data } = await axios.get(`${apiUrl}/Category/get-categories`)
    return data.data
})