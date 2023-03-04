import { configureStore } from "@reduxjs/toolkit";
import wineListReducer from "./productReducer";
import wineDetailsReducer from "./productDetailsReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import orderDetailsReducer from "./ordersReducer";
import orderPayReducer from "./orderPayReducer";
import myListOrdersReducer from "./myListOrdersReducer";

export default configureStore({
  reducer: {
    wineList: wineListReducer,
    wineDetails: wineDetailsReducer,
    cart: cartReducer,
    auth: authReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrders: myListOrdersReducer,
  },
  devTools: true,
});
