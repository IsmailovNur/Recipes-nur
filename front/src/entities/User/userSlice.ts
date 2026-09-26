import type { GlobalError, User, ValidationError } from "./types.ts";
import { createSlice } from "@reduxjs/toolkit";
import { googleLogin, loginUser, registerUser } from "./userThunk.ts";

interface UserState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | GlobalError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    unsetUser: (state: UserState) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerError = null;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload || null;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginError = null;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload || null;
      })

      .addCase(googleLogin.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginError = null;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload || null;
      });
  },

  selectors: {
    selectUser: (state) => state.user,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
  }
})

export const {
  selectUser,
  selectRegisterLoading,
  selectRegisterError,
  selectLoginLoading,
  selectLoginError,
} = userSlice.selectors;


export const {unsetUser} = userSlice.actions;
export const userReducer = userSlice.reducer;