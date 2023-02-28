import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { URL } from "../App";

export const getOrderDetails = createAsyncThunk(
  "orderDetails/getOrderDetails",
  async (orderInfo) => {
    // const { getState } = thunkAPI; add above as second arg if need to use getState from thunkAPI
    try {
      // setTimeout(() => console.log(orderInfo, "orderInfo from REDUCER"), 2000);
      // setTimeout(() => console.log(orderInfo.orderId, "orderInfo.orderId from REDUCER"), 3000);
      // setTimeout(() => console.log(orderInfo.user.token, "orderInfo.user.token from REDUCER"), 4000);

      const response = await fetch(
        `${URL}/api/v1/orders/${orderInfo.orderId}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${orderInfo.user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      // const { orderDetails } = getState();
      // const thunkResult = orderDetails.orderDetails;

      // console.log(thunkResult, "from thunkAPI (OrderReducer.js)");
      console.log(json, "from json (OrderReducer.js)");

      // return thunkResult._id === orderInfo.orderId ? thunkResult : json;

      return json;
      // return;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  orderDetails:
    window.localStorage["orderDetails"] !== undefined
      ? JSON.parse(window.localStorage.getItem("orderDetails"))
      : null,
  isLoading: false,
  hasError: false,
  isSuccess: false,
};

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
        state.isSuccess = false;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
        action.payload.message === undefined &&
          localStorage.setItem("orderDetails", JSON.stringify(action.payload));
        state.isLoading = false;
        state.hasError = false;
        state.isSuccess = true;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

// Action creators are generated for each case reducer function

export const selectOrderDetails = (state) => state.orderDetails.orderDetails;

export default orderDetailsSlice.reducer;
