import { configureStore } from "@reduxjs/toolkit";

import genralSlice from "redux/store/slices/genralSlice";

const store = configureStore({
  reducer: {
    data: genralSlice.reducer,
  },
});
export const genralSiceActions = genralSlice.actions;

export default store;