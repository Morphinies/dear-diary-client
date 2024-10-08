import regSlice from './auth/regSlice';
import userSlice from './auth/userSlice';
import loginSlice from './auth/loginSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    reg: regSlice,
    user: userSlice,
    login: loginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
