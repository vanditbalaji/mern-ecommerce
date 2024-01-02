import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchUserOrders,
  updateUserProfile,
  fetchUserProfile,
  updateUserData,
} from "./usersApi";

const initialState = {
  orders: [],
  status: "idle",
  userInfo: null,
};

const fetchUserOrdersAsync = createAsyncThunk(
  "userOrders",
  async (id) => {
    const response = await fetchUserOrders(id);
    return response;
  }
);
const fetchUserProfileAsync = createAsyncThunk(
  "fetchUserProfile",
  async (id) => {
    const response = await fetchUserProfile(id);
    return response;
  }
);
const updateUserDataAsync = createAsyncThunk(
  "updateUserData",
  async (data) => {
    const response = await updateUserData(data);
    return response;
  }
);
 const updateUserProfileAsync = createAsyncThunk(
  "UpdateuserProfile",
  async (data) => {
    const response = await updateUserProfile(data);
    return response;
  }
);

const userOrderSlice = createSlice({
  name: "userOrder",
  initialState,
  reducers: {},
  error: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      })
      .addCase(fetchUserProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserDataAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateUserProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export default userOrderSlice.reducer;
export {fetchUserOrdersAsync,updateUserDataAsync,fetchUserProfileAsync,updateUserProfileAsync}