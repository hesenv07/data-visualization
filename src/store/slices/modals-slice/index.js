import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crop_image: false,
  fullscreen_image: false,
  fullscreenImage: "",
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
