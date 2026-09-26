import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as React from 'react';
import { type ChangeEvent, useState } from 'react';
import {
  Link as RouterLink,
  useNavigate
} from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { googleLogin, registerUser } from "../../entities/User/userThunk.ts";
import {
  selectRegisterError,
  selectRegisterLoading
} from "../../entities/User/userSlice.ts";
import { AppRoutes } from "../../routing/routes.ts";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerLoading =
    useAppSelector(selectRegisterLoading);

  const registerError =
    useAppSelector(selectRegisterError);

  const [state, setState] = useState({
    username: '',
    password: '',
    displayName: '',
    avatar: null as File | null,
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

    if (!state.username.trim()) {
      return;
    }

    if (!state.password.trim()) {
      return;
    }

    if (!state.displayName.trim()) {
      return;
    }

    try {
      await dispatch(
        registerUser({
          username: state.username.trim(),
          password: state.password,
          displayName: state.displayName.trim(),
          avatar: state.avatar,
        })
      ).unwrap();

      navigate(AppRoutes.main);

    } catch (error) {
      console.log(
        'RegisterPage Error',
        error
      );
    }
  };

  const getFieldError = (
    fieldName: string
  ) => {
    if (
      !registerError ||
      !('errors' in registerError)
    ) {
      return undefined;
    }

    return registerError.errors[fieldName]?.message;
  };

  const globalError =
    registerError && 'error' in registerError
      ? registerError.error
      : undefined;

  const googleLoginHandler = async (credential: string) => {
    try {
      await dispatch(googleLogin(credential)).unwrap();
      navigate(AppRoutes.main);

    } catch (error) {
      console.log('Google Register Error', error);
      toast.error('Google Register failed!');
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
          Sign Up
        </Typography>

        {globalError && (
          <Alert
            severity="error"
            sx={{mb: 2}}
          >
            {globalError}
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
            error={Boolean(
              getFieldError('username')
            )}
            helperText={
              getFieldError('username')
            }
          />

          <TextField
            label="Display Name"
            name="displayName"
            value={state.displayName}
            onChange={inputChangeHandler}
            error={Boolean(
              getFieldError('displayName')
            )}
            helperText={
              getFieldError('displayName')
            }
          />

          <TextField
            type="password"
            label="Password"
            name="password"
            value={state.password}
            onChange={inputChangeHandler}
            error={Boolean(
              getFieldError('password')
            )}
            helperText={
              getFieldError('password')
            }
          />

          <Button
            component="label"
            variant="outlined"
          >
            Select avatar

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  avatar:
                    e.target.files?.[0] || null
                }))
              }
            />
          </Button>

          {state.avatar && (
            <Typography variant="body2">
              {state.avatar.name}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            loading={registerLoading}
            disabled={
              !state.username.trim() ||
              !state.password.trim() ||
              !state.displayName.trim()
            }
          >
            Sign Up
          </Button>

          <Typography
            variant="body2"
            sx={{textAlign: 'center'}}
          >
            Already have an account?{' '}

            <Link
              component={RouterLink}
              to={AppRoutes.login}
              underline="hover"
              sx={{cursor: 'pointer'}}
            >
              Login now
            </Link>
          </Typography>

        </Box>
      </Paper>
    </Box>
  );
};