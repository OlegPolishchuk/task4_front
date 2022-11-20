import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILoginRequest, IRegisterRequest} from "api/auth/types";
import {AuthApi} from "api/auth";
import {AxiosError} from "axios";
import {handleAxiosError} from "utils/handleAxiosError";

export const loginUser = createAsyncThunk
(
  'auth/login',
  async ({login, password}: ILoginRequest, { dispatch, rejectWithValue}
  ) => {
    try {
      const {data} = await AuthApi.login({login, password});

      localStorage.setItem('token', data.accessToken)

      dispatch(getMe())

      return data;

    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(handleAxiosError(error))
    }
  })

export const registerUser = createAsyncThunk
(
  'auth/register',
  async ({login, password, email}: IRegisterRequest, {rejectWithValue}
  ) => {
  try {
    const res = await AuthApi.register({login, password, email});

    if (res.status === 201) {
      return true
    }
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(handleAxiosError(error))
  }
})

export const logoutUser = createAsyncThunk
(
  'auth/logout',async () => {
  try {
    const res = await AuthApi.logout();

    if (res.status === 200) {
      localStorage.removeItem('token')
      return true
    }

  } catch (e) {
    const error = e as AxiosError;
    return handleAxiosError(error)
  }
})

export const getMe = createAsyncThunk(
  'auth/getMe' ,async () => {
  try {
    return await AuthApi.getMe();

  } catch (e) {
    const error = e as AxiosError;
    return handleAxiosError(error);
  }
})

export const checkIsLoginAlreadyExist = createAsyncThunk(
  'auth/checkIsUsernameExist', async (login: string, {rejectWithValue}) => {
    try {
      return await AuthApi.checkIsLoginAlreadyExist({login});

    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  }
)
