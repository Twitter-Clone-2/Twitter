import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateFeedCounter: 0,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateFeed: (state) => {
      state.updateFeedCounter++;
    },
  },
});

export const { updateFeed } = mainSlice.actions;

export default mainSlice.reducer;
