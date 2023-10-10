import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "LoadingSlice",
    initialState: {
        isLoading: false
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const loadingReducer = loadingSlice.reducer
export const { setIsLoading } = loadingSlice.actions