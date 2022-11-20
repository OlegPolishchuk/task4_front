import {RootState} from "store/store";

export const selectCurrentUserId = (state: RootState) => {
  return state.authReducer.currentUser._id;
}