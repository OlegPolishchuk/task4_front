import {UsersApi} from "api/users";
import {AxiosError} from "axios";
import {handleAxiosError} from "utils/handleAxiosError";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "api/users/types";
import {useAppSelector} from "hooks/useAppSelector";
import {selectCurrentUserId} from "store/selectors";
import {logoutUser} from "store/reducers/auth/thunks/thunks";
import {createAppAsyncThunk} from "hooks/createAppAsyncThunk";
import {RootState} from "store/store";

export const getUsers = createAsyncThunk
('users/getUsers',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await UsersApi.fetchUsers();

      return data;
    } catch (e) {
      const error = e as AxiosError;
      rejectWithValue(handleAxiosError(error));
    }

  })

export const deleteUsers = createAsyncThunk
('users/deleteUsers',
  async (usersId: string[], {rejectWithValue, dispatch}) => {
    try {
      const res = await UsersApi.deleteUsers(usersId);

      if (res.status === 204 || res.status === 200) {
        dispatch(getUsers())
      }
    } catch (e) {
      const error = e as AxiosError;
      rejectWithValue(handleAxiosError(error))
    }
  })

export const blockUsers = createAsyncThunk<void,User[], {state: RootState}>
('users/blockUser',
  async (users: User[], {rejectWithValue,getState, dispatch}) => {
    try {
      const currentUserId = getState().authReducer.currentUser._id;
      const isCurrentUserBlocked = users.find(user => user._id === currentUserId);
      const updatedUsers = users.map(user => ({
        ...user, status: 'blocked'
      }))

      const res = await UsersApi.toggleUsersStatus(updatedUsers);

      if (isCurrentUserBlocked) {
        dispatch(logoutUser())
      }

      if (res.status === 200) {
        dispatch(getUsers())
      }
    } catch (e) {
      const error = e as AxiosError;
      rejectWithValue(handleAxiosError(error));
    }
  })

export const unblockUsers = createAsyncThunk
('users/unblockUsers',
  async (users: User[], {rejectWithValue, dispatch}) => {
    try {
      const updatedUsers = users.map(user => ({
        ...user, status: 'active'
      }))

      const res = await UsersApi.toggleUsersStatus(updatedUsers);

      if (res.status === 200) {
        dispatch(getUsers())
      }
    } catch (e) {
      const error = e as AxiosError;
      rejectWithValue(handleAxiosError(error));
    }
  })

