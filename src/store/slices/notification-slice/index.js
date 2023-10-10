import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "NotificationSlice",
  initialState,
  reducers: {
    setNotifications: (state, { payload }) => {
      state.notifications = payload;
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
export const { setNotifications } = notificationSlice.actions;
