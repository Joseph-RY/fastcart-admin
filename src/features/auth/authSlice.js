import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const logIn = createAsyncThunk("auth/logIn", async (userData) => {
    const res = await axios.post("https://store-api.softclub.tj/Account/login", userData);
    return res.data.data;
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