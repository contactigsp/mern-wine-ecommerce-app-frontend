import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../App";

export const getOrderPay = createAsyncThunk(
  "orderPay/getOrderPay",
  async (paymentResult) => {
    //use inside orderInfo, cuz here it wont work whatsoever
    try {
      // setTimeout(() => console.log(orderInfo, "orderInfo from REDUCER"), 2000);
      // setTimeout(() => console.log(orderInfo.orderId, "orderInfo.orderId from REDUCER"), 3000);
      // setTimeout(() => console.log(orderInfo.user.token, "orderInfo.user.token from REDUCER"), 4000);

      const response = await fetch(
        `${URL}/api/v1/orders/${paymentResult.data.orderId}/updateOrderToPaid`,
        {
          method: "POST",
          body: JSON.stringify(paymentResult.data),
          headers: {
            authorization: `Bearer ${paymentResult.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      if (response.ok) {
        // console.log(response.ok, "from response.ok (OrderPayReducer)");
        // console.log(response, "from response (OrderPayReducer)");
        // console.log(json, "from json (OrderPayReducer)");
        return json;
      }
      // return json;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  // orderPay:
  //   window.localStorage["orderPay"] !== undefined
  //     ? JSON.parse(window.localStorage.getItem("orderPay"))
  //     : null,
  // isLoading: false,
  // hasError: false,
  orderPay:
    window.localStorage["orderPay"] !== undefined
      ? JSON.parse(window.localStorage.getItem("orderPay"))
      : {},
};

export const orderPaySlice = createSlice({
  name: "orderPay",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrderPay.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
        state.successPay = false;
      })
      .addCase(getOrderPay.fulfilled, (state, action) => {
        // state.orderPay = action.payload;
        // action.payload.message === undefined &&
        // localStorage.setItem("orderPay", JSON.stringify(action.payload));
        state.isLoading = false;
        state.hasError = false;
        state.successPay = true;
        state.orderPay = action.payload;
        action.payload.message === undefined &&
          localStorage.setItem("orderPay", JSON.stringify(action.payload));
      })
      .addCase(getOrderPay.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
        state.successPay = false;
      });
  },
});

// Action creators are generated for each case reducer function

export const selectOrderPay = (state) => state.orderPay.orderPay;

export default orderPaySlice.reducer;
