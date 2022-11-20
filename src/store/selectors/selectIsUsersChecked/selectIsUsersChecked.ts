import {RootState} from "store/store";

export const selectIsUsersChecked = (state: RootState) => {
  const checkedUsers = state.userReducer.users.filter(user => user.checked);

  return !!checkedUsers.length;
}