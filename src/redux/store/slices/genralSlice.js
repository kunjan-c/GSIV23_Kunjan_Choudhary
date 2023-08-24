import { createSlice } from "@reduxjs/toolkit";
const initialDataState = {
  listData: [],
  searchTermValue: "",
  clickedCardId : "",
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
    clickedCardId(state, action) {
      state.clickedCardId = action.payload;
    },
  },
});

export default genralSlice;