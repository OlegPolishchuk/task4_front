import {User, UsersResponse} from "api/users/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUsers} from "store/reducers/users/thunks";

interface InitialState {
  users: User[];
  isLoading: boolean;
  error: string;
  allUsersCheckedCheckbox: boolean;
}

const initialState: InitialState = {
  users: [] as User[],
  isLoading: false,
  error: '',
  allUsersCheckedCheckbox: false,
}


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setChecked:(state, action:PayloadAction<User>) => {
      const updatedUser = action.payload;
      state.users = state.users.map(user => user._id === updatedUser._id
        ? {...updatedUser}
        : user )
    },

    toggleAllUsersChecked: (state, action:PayloadAction<boolean>) => {
      state.users = state.users.map(user => ({...user, checked: action.payload}))
    },

    setAllUsersCheckedCheckbox: (state, action:PayloadAction<boolean>) => {
      state.allUsersCheckedCheckbox = action.payload;
    }
  },
  extraReducers: {
    [getUsers.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [getUsers.fulfilled.type]: (state, action: PayloadAction<UsersResponse>) => {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload.users.map(user => ({...user, checked: false}));
    },
    [getUsers.rejected.type] : (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
})

export const userReducer = usersSlice.reducer;
export const {setChecked, toggleAllUsersChecked, setAllUsersCheckedCheckbox} = usersSlice.actions;