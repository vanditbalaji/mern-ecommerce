import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addOrder,
  cancelOrder,
  fetchAllOrders,
  orderMail,
  returnOrder,
  updateOrder,
} from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  orderPlaced: null,
  allOrders: [],
};

const addOrderAsync = createAsyncThunk("addOrder", async (data) => {
  const response = await addOrder(data);
  return response;
});

const orderMailAsync = createAsyncThunk("mailOrder", async (data) => {
  const response = await orderMail(data);
  return response;
});

const fetchAllOrdersAsync = createAsyncThunk("fetchOrder", async () => {
  const response = await fetchAllOrders();
  return response;
});

const updateOrderAsync = createAsyncThunk("updateOrder", async (data) => {
  const response = await updateOrder(data);
  return response;
});

const cancelOrderAsync = createAsyncThunk("cancelOrder", async (data) => {
  const response = await cancelOrder(data);
  return response;
});

const returnOrderAsync = createAsyncThunk("returnOrder", async (data) => {
  const response = await returnOrder(data);
  return response;
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.orderPlaced = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allOrders = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders[index] = action.payload;
      })
      .addCase(orderMailAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orderMailAsync.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
export {
  addOrderAsync,
  orderMailAsync,
  fetchAllOrdersAsync,
  updateOrderAsync,
  cancelOrderAsync,
  returnOrderAsync,
};
