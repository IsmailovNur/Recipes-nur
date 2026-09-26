import * as React from 'react';
import { type ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { googleLogin, loginUser } from '../../entities/User/userThunk';
import {
  selectLoginError,
  selectLoginLoading
} from '../../entities/User/userSlice';
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { AppRoutes } from "../../routing/routes.ts";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginLoading = useAppSelector(selectLoginLoading);
  const loginError = useAppSelector(selectLoginError);

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(state)).unwrap();

      navigate(AppRoutes.main);
    } catch (error) {
      console.log('LoginPage Error', error);
    }
  };

  const googleLoginHandler = async (credential: string) => {
    try {
      await dispatch(googleLogin(credential)).unwrap();
      navigate(AppRoutes.main);

    } catch (error) {
      console.log('Google Login Error', error);
      toast.error('Google login failed!');
    }
  };

  return (
    <Box sx={{
      maxWidth: 400,
      mx: 'auto',
      mt: 4
    }}>
      <Paper sx={{p: 4}} variant="outlined">
        <Typography
          variant="h5"
          align="center"
          sx={{mb: 4}}
        >
          Sign In
        </Typography>

        {loginError && (
          <Alert
            severity="error"
            sx={{mb: 2}}
          >
            {loginError.error}
          </Alert>
        )}

        <Box sx={{
          pb: 2,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log("Login Error");
            }}
          />
        </Box>

        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <TextField
            label="Username"
            name="username"
            value={state.username}
            onChange={inputChangeHandler}
          />

          <TextField
            type="password"
            label="Password"
            name="password"
            value={state.password}
            onChange={inputChangeHandler}
          />

          <Button
            type="submit"
            variant="contained"
            loading={loginLoading}
            disabled={
              !state.username.trim() ||
              !state.password.trim()
            }
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};