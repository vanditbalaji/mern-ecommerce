import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./customer/product/productSlice";
import userSlice from "./customer/auth/userSlice";
import cartSlice from "./customer/cart/cartSlice";
import orderSlice from "./customer/orders/orderSlice";
import userOrderSlice from "./customer/user/usersSlice";

export const Store = configureStore({
  reducer: {
    product: productSlice,
    user: userSlice,
    cart: cartSlice,
    order: orderSlice,
    userOrder: userOrderSlice,
  },
});
