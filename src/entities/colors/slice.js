import { createSlice } from "@reduxjs/toolkit"
import { getColors } from "../../features/get-colors/get-colors"

export const colorSlice = createSlice({
    name: "color",
    initialState: {
        data: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getColors.fulfilled, (state, action) => {
                state.data = action.payload
            })
    }
})

export default colorSlice.reducer