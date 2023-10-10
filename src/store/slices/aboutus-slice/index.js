import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    aboutUsInfos: ""
};

const aboutUsSlice = createSlice({
    name: "AboutUsSlice",
    initialState,
    reducers: {
        setAboutUs: (state, { payload }) => {
            state.aboutUsInfos = payload
        }
    }
});

export const aboutUsReducer = aboutUsSlice.reducer;
export const { setAboutUs } = aboutUsSlice.actions;
