import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addMoney,
  resetPassword,
  resetPasswordRequest,
  userLoginData,
  userLogout,
  userSignupData,
  userVerification,
  userVerificationComplete,
} from "./userApi";

const initialState = {
  loggedinUser: null,
  status: "idle",
  error: null,
  loginStatus: null,
  mailSent: false,
  passwordReset: false,
  userVerification: false,
  user: null,
};

const userSignupDataAsync = createAsyncThunk("signUpdata", async (data) => {
  const response = await userSignupData(data);
  return response;
});

const userVerificationAsync = createAsyncThunk("verify", async (data) => {
  const response = await userVerification(data);
  return response;
});

const userVerificationCompleteAsync = createAsyncThunk(
  "verified",
  async (data) => {
    const response = await userVerificationComplete(data);
    return response;
  }
);

const resetPasswordAsync = createAsyncThunk("resetPassword", async (data) => {
  const response = await resetPassword(data);
  return response;
});

const resetPasswordRequestAsync = createAsyncThunk(
  "resetPasswordRequest",
  async (data) => {
    const response = await resetPasswordRequest(data);
    return response;
  }
);

const userLoginDataAsync = createAsyncThunk("loginData", async (data) => {
  const response = await userLoginData(data);
  return response;
});

const userLogoutAsync = createAsyncThunk("logoutUser", async (data) => {
  const response = await userLogout(data);
  return response;
});

const addMoneyAsync = createAsyncThunk("addMoney", async (data) => {
  const response = await addMoney(data);
  return response;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state, action) => {
      state.loginStatus = null;
    },
    loginUser: (state, action) => {
      state.loggedinUser = JSON.parse(localStorage.getItem("user"));
    },
    resetVerified: (state, action) => {
      state.mailSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignupDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userSignupDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedinUser = action.payload;
        state.loginStatus = "done";
      })
      .addCase(userSignupDataAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(userLoginDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedinUser = action.payload;
        state.loginStatus = "done";
      })
      .addCase(userLoginDataAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(userLogoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedinUser = null;
      })
      .addCase(userLogoutAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.mailSent = true;
        state.error = "";
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(userVerificationAsync.pending, (state, action) => {
        state.error = null;
        state.mailSent = false;
      })
      .addCase(userVerificationAsync.fulfilled, (state, action) => {
        state.mailSent = true;
        state.error = null;
      })
      .addCase(userVerificationAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(userVerificationCompleteAsync.fulfilled, (state, action) => {
        state.userVerification = true;
        state.user = action.payload;
      })
      .addCase(userVerificationCompleteAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(addMoneyAsync.fulfilled, (state, action) => {
        state.loggedinUser = action.payload;
      })
      .addCase(addMoneyAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});
export const { resetError, loginUser, resetVerified } = userSlice.actions;
export default userSlice.reducer;
export {
  userSignupDataAsync,
  userLoginDataAsync,
  userVerificationAsync,
  userVerificationCompleteAsync,
  addMoneyAsync,
  userLogoutAsync,
  resetPasswordAsync,
  resetPasswordRequestAsync,
};
