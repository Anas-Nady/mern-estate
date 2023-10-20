import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV === "development",
});
