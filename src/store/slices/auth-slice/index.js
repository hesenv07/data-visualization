import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authToken: "",
    user: {}
};

const authSlice = createSlice({
    name: "CommonSlice",
    initialState,
    reducers: {
        setAuthToken: (state, { payload }) => {
            state.authToken = payload
        },
        setUserData: (state, { payload }) => {
          state.user = payload
        },
        resetUserData: (state) => {
            state.user = {}
        }
    }
});

export const authReducer = authSlice.reducer;
export const { setAuthToken, setUserData, resetUserData } = authSlice.actions;
