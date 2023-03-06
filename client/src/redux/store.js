import { configureStore } from "@reduxjs/toolkit";
import twitter from "./mainSlice";

export const store = configureStore({
  reducer: twitter,
});
