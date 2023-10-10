import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProductCount: 0,
  cropControls: {
    crop: {},
    rotate: 0,
    zoom: 1,
  },
  countryCode: "+994",
  croppedImageRef: "",
};

const commonSlice = createSlice({
  name: "CommonSlice",
  initialState,
  reducers: {
    setCountryCode: (state, { payload }) => {
      state.countryCode = payload;
    },
    setCount(state, { payload: { key, value } }) {
      state[key] = value;
    },
    setCropControls(state, { payload }) {
      state.cropControls = {
        ...state.cropControls,
        ...payload,
      };
    },
    setCroppedImageRef(state, { payload }) {
      state.croppedImageRef = payload;
    },
  },
});

export const commonReducer = commonSlice.reducer;
export const { setCropControls, setCountryCode, setCount, setCroppedImageRef } =
  commonSlice.actions;
