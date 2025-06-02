import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { apiUrl } from "../../shared/lib/utilits";

export const getCategories = createAsyncThunk("category/getCategories", async () => {
    const { data } = await axios.get(`${apiUrl}/Category/get-categories`)
    return data.data
})