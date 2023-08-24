import { createSlice } from "@reduxjs/toolkit";
const initialDataState = {
  listData: [],
  searchTermValue: "",
};

const genralSlice = createSlice({
  name: "genral",
  initialState: initialDataState,
  reducers: {
    listData(state, action) {
      state.listData = action.payload;
    },
    searchTermValue(state, action) {
      state.searchTermValue = action.payload;
    },
  },
});

export default genralSlice;