import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../App";

export const getWineList = createAsyncThunk(
  "wineList/getWineList",
  async () => {
    try {
      const response = await axios.get(`${URL}/api/v1/products`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  wineList: [],
  isLoading: false,
  hasError: false,
  isSuccess: false,
};

export const wineListSlice = createSlice({
  name: "wineList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWineList.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
        state.isSuccess = false;
      })
      .addCase(getWineList.fulfilled, (state, action) => {
        state.wineList = action.payload;
        state.isLoading = false;
        state.hasError = false;
        state.isSuccess = true;
      })
      .addCase(getWineList.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

// Action creators are generated for each case reducer function

export const selectWineList = (state) => state.wineList.wineList;

export default wineListSlice.reducer;
