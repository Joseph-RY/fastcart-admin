import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../shared/lib/utilits";

export const getColors = createAsyncThunk("color/getColors", async () => {
    const { data } = await axios.get(`${apiUrl}/Color/get-colors`)
    return data.data
})