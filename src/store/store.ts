import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "store/reducers/auth/authReducer";
import {userReducer} from "store/reducers/users/usersReducer";


const rootReducer = combineReducers({
  authReducer,
  userReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
