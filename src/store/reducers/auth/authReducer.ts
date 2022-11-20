import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  checkIsLoginAlreadyExist,
  getMe,
  loginUser,
  logoutUser,
  registerUser
} from "store/reducers/auth/thunks/thunks";
import {ILoginResponse, RejectedResponse} from "api/auth/types";
import {User} from "api/users/types";


export interface InitialState {
  accessToken: string;
  isLoading: boolean;
  error: string;
  isRegister: boolean;
  currentUser: User;
}

const initialState: InitialState = {
  accessToken: localStorage.getItem('token') || '',
  error: '',
  isLoading: false,
  isRegister: false,
  currentUser: {} as User,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSuccess: (): InitialState => initialState,

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
  extraReducers: {
    [registerUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [registerUser.fulfilled.type]: (state, action: PayloadAction<boolean>) => {
      state.isLoading = false;
      state.error = '';
      state.isRegister = action.payload;
    },
    [registerUser.rejected.type]: (state, action: PayloadAction<RejectedResponse>) => {
      state.isLoading = false;
      state.error = action.payload.message;

    },

    [loginUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [loginUser.fulfilled.type]: (state, action: PayloadAction<ILoginResponse>) => {
      state.isLoading = false;
      state.error = '';
      state.accessToken = action.payload.accessToken;
      state.currentUser = action.payload.user;
    },
    [loginUser.rejected.type]: (state, action:PayloadAction<RejectedResponse>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },

    [logoutUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [logoutUser.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
      state.accessToken = '';
      state.isRegister = false;
    },
    [logoutUser.rejected.type]: (state, action: PayloadAction<RejectedResponse>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },

    [getMe.fulfilled.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },

    [checkIsLoginAlreadyExist.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [checkIsLoginAlreadyExist.rejected.type]: (state, action:PayloadAction<RejectedResponse>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    }
  }
})

export const authReducer = authSlice.reducer;
export const {setError, logoutSuccess} = authSlice.actions;