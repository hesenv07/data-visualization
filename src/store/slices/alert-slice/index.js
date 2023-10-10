import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  status: "",
};

const alertSlice = createSlice({
  name: "AlertSlice",
  initialState,
  reducers: {
    setAlertData: (_, { payload }) => {
      return payload;
    },
  },
});

export const alertReducer = alertSlice.reducer;
export const { setAlertData } = alertSlice.actions;
