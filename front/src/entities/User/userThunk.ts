import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GlobalError, LoginMutation,
  RegisterMutation,
  User,
  ValidationError
} from "./types.ts";
import axiosApi from "../../shared/axios/AxiosApi.ts";
import { isAxiosError } from "axios";


export const registerUser = createAsyncThunk<User, RegisterMutation, {
  rejectValue: ValidationError | GlobalError;
}>(
  'user/register',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      formData.append('username', registerMutation.username);
      formData.append('password', registerMutation.password);
      formData.append('displayName', registerMutation.displayName);

      if (registerMutation.avatar) {
        formData.append('avatar', registerMutation.avatar);
      }

      const response = await axiosApi.post<User>('/users', formData);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        if (e.response.status === 400) {
          return rejectWithValue(
            e.response.data as ValidationError | GlobalError
          );
        }
      }

      throw e;
    }
  }
);

export const loginUser = createAsyncThunk<User, LoginMutation, {
  rejectValue: GlobalError;
}>(
  'user/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<User>('/users/login', loginMutation);
      return response.data;

    } catch (e) {
      if (isAxiosError(e) && e.response) {
        if (e.response.status === 400) {
          return rejectWithValue(
            e.response.data as GlobalError
          );
        }
      }
      throw e;
    }
  }
);


export const googleLogin = createAsyncThunk<User, string, {
  rejectValue: GlobalError;
}>(
  'user/googleLogin',
  async (credential, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<User>('/users/login/google', {credential});
      return response.data;

    } catch (e) {
      if (isAxiosError(e) && e.response) {
        if (e.response.status === 400) {
          return rejectWithValue(
            e.response.data as GlobalError
          );
        }
      }

      throw e;
    }
  }
);

export const logoutUser = createAsyncThunk<void>(
  'user/logout',
  async () => {
    await axiosApi.delete('/users/logout');
  }
);