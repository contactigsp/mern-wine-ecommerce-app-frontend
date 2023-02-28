import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../App";

export const getWineDetails = createAsyncThunk(
  "wineDetails/getWineDetails",
  async (id) => {
    try {
      const response = await axios.get(`${URL}/api/v1/product/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  wineDetails: [],
  isLoading: false,
  hasError: false,
  isSuccess: false,
};

export const wineDetailsSlice = createSlice({
  name: "wineDetails",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWineDetails.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
        state.isSuccess = false;
      })
      .addCase(getWineDetails.fulfilled, (state, action) => {
        state.wineDetails = action.payload;
        state.isLoading = false;
        state.hasError = false;
        state.isSuccess = true;
      })
      .addCase(getWineDetails.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

// Action creators are generated for each case reducer function

export const selectWineDetails = (state) => state.wineDetails.wineDetails;

export default wineDetailsSlice.reducer;
