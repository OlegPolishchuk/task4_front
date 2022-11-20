import {RootState} from "store/store";

export const selectIsUserAuth = (state: RootState) => {
  return Boolean(state.authReducer.accessToken)
};