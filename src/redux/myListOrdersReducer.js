import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { URL } from "../App";

export const getMyOrders = createAsyncThunk(
  "myOrders/getMyOrders",
  async (userInfo) => {
    try {
      const response = await fetch(`${URL}/api/v1/myorders`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      console.log(json, "from json (myOrdersReducer.js)");
      return json;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  myOrders:
    window.localStorage["myOrders"] !== undefined
      ? JSON.parse(window.localStorage.getItem("myOrders"))
      : [],
  isLoading: false,
  hasError: false,
  isSuccess: false,
};

export const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
        state.isSuccess = false;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.myOrders = action.payload;
        action.payload.message === undefined &&
          localStorage.setItem("myOrders", JSON.stringify(action.payload));
        state.isLoading = false;
        state.hasError = false;
        state.isSuccess = true;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

// Action creators are generated for each case reducer function

export const selectMyOrders = (state) => state.myOrders.myOrders;

export default myOrdersSlice.reducer;
