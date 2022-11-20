import {RootState} from "store/store";

export const selectUsers = (state: RootState) => {
  return state.userReducer.users
}