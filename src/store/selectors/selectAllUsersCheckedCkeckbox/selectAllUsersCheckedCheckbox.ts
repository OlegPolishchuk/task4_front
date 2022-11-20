import {RootState} from "store/store";

export const selectAllUsersCheckedCheckbox = (state: RootState) => {
  return state.userReducer.allUsersCheckedCheckbox;
}