import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products:
    window.localStorage["currentCart"] !== undefined
      ? JSON.parse(window.localStorage.getItem("currentCart"))
      : [],
  shippingAddress:
    window.localStorage["shippingAddress"] !== undefined
      ? JSON.parse(window.localStorage.getItem("shippingAddress"))
      : {
          address: "",
          city: "",
          postalCode: "",
          country: "",
        },
  paymentMethod:
    window.localStorage["paymentMethod"] !== undefined
      ? JSON.parse(window.localStorage.getItem("paymentMethod"))
      : null,

  isOpen:
    window.localStorage["paymentMethod"] !== undefined
      ? JSON.parse(window.localStorage.getItem("paymentMethod"))
      : true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleIsOpen: (state, action) => {
      state.isOpen = !state.isOpen;
      localStorage.setItem("isOpen", JSON.stringify(state.isOpen));
    },
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      // console.log(action.payload);
      if (item) {
        item.quantity += action.payload.quantity;
        localStorage.setItem("currentCart", JSON.stringify(state.products));
      } else {
        state.products.push(action.payload);
        localStorage.setItem("currentCart", JSON.stringify(state.products));
      }
    },

    subtractFromCart: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);
      // console.log(action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("currentCart", JSON.stringify(state.products));
      }
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("currentCart", JSON.stringify(state.products));
    },
    resetCart: (state) => {
      state.products = [];
      localStorage.removeItem("currentCart");
    },
    saveAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
    // saveOrders: (state, action) => {
    //   state.orders.push(action.payload);
    //   localStorage.setItem(
    //     "orders",
    //     JSON.stringify([...state.orders, action.payload])
    //   );
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  subtractFromCart,
  removeItem,
  resetCart,
  saveAddress,
  savePaymentMethod,
  saveOrders,
  toggleIsOpen
} = cartSlice.actions;

export default cartSlice.reducer;
