import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const logIn = createAsyncThunk("auth/logIn", async (userData, { rejectWithValue }) => {
    const response = await axios.post(`${apiUrl}/Account/login`, userData);
    const data = response.data;

    return data.data;
});



export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("access_token") || null
    },
    reducers: {
        logout(state) {
            state.token = null
            localStorage.removeItem("access_token")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                state.token = action.payload
                localStorage.setItem("access_token", action.payload)
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer