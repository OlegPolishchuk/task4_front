import {RootState} from "store/store";

export const selectAuthError = (state: RootState) => {
  return state.authReducer.error;
}