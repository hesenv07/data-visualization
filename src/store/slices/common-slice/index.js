import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDomainCount: 0,
  userHostingCount: 0,
  userServiceCount: 0,
  userVPSCount: 0,
  userBalance: 0,
  cropControls: { 
    crop: {},
    rotate: 0,
    zoom: 1
  },
  countryCode: "+994",
  croppedImageRef: ''
};

const commonSlice = createSlice({
  name: "CommonSlice",
  initialState,
  reducers: {
    setCountryCode: (state, { payload }) => {
      state.countryCode = payload;
    },
    setCount(state, { payload: { key, value }}) {
      state[key] = value
    },
    setUserBalance(state, { payload }) {
      state.userBalance = payload
    },
    setCropControls(state, { payload }) {
      state.cropControls = {
        ...state.cropControls,
        ...payload
      }
    },
    setCroppedImageRef(state, { payload }) {
      state.croppedImageRef = payload
    }
  },
});

export const commonReducer = commonSlice.reducer;
export const { 
  setCropControls, 
  setCountryCode, 
  setCount, 
  setUserBalance,
  setCroppedImageRef
} =
  commonSlice.actions;
