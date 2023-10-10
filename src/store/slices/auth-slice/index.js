import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const authSlice = createSlice({
  name: "CommonSlice",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.user = payload;
    },
    resetUserData: (state) => {
      state.user = {};
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUserData, resetUserData } = authSlice.actions;
