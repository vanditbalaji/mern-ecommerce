import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteUserCart,
  fetchUserCart,
  resetUsercart,
  updateUserCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};
const addToCartAsync = createAsyncThunk("addtoCart", async (data) => {
  const response = await addToCart(data);
  return response.data;
});

const fetchUserCartAsync = createAsyncThunk("userCart", async (id) => {
  const response = await fetchUserCart(id);
  return response;
});
const updateUserCartAsync = createAsyncThunk("updateCart", async (data) => {
  const response = await updateUserCart(data);
  return response;
});
const deleteUserCartAsync = createAsyncThunk("deleteCart", async (id) => {
  const response = await deleteUserCart(id);
  return response;
});

const resetUserCartAsync = createAsyncThunk("restCart", async (id) => {
  const response = await resetUsercart(id);
  return response;
});
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchUserCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateUserCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteUserCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(resetUserCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetUserCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
export {
  addToCartAsync,
  fetchUserCartAsync,
  updateUserCartAsync,
  deleteUserCartAsync,
  resetUserCartAsync,
};
