import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mastercard: false,
  million: false,
  emanat: false,
  portmanat: false,
  resetHostingPassword: false,
  increaseHostingTime: false,
  increaseServerTime: false,
  increaseVPSTime: false,
  changeDomainNS: false,
  renewDomain: false,
  paracoin: false,
  stripe: false,
  square: false,
  change_currency: false,
  increaseResellerTime: false,
  crop_image: false,
  userVerification: false,
  payriff: false,
  fullscreen_image: false,
  fullscreenImage: "",
  domain: {},
  hosting: {},
  server: {},
  vps: {},
  new_currency: "",
  reseller: {},
  file: {
    src: "",
    name: "",
  },
};

const modalsSlice = createSlice({
  name: "ModalSlice",
  initialState,
  reducers: {
    openModal(state, { payload }) {
      state[payload] = true;
    },
    closeModal(state, { payload }) {
      state[payload] = false;
    },
    setModalData(state, { payload: { key, value } }) {
      state[key] = value;
    },
  },
});

export const modalsReducer = modalsSlice.reducer;
export const { openModal, closeModal, setModalData } = modalsSlice.actions;
