import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  loading: true,
  isActivated: false,
  info: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSet(state, action) {
      state.isAuth = true;
      state.loading = false;
      state.info = action.payload.user;
      state.isActivated = action.payload.isActivated;
    },
    userLoading(state) {
      state.info = {};
      state.isAuth = false;
      state.loading = true;
      state.isActivated = false;
    },
    userDelete(state) {
      state.info = {};
      state.isAuth = false;
      state.loading = false;
      state.isActivated = false;
    },
  },
});

export const { userSet, userLoading, userDelete } = userSlice.actions;
export default userSlice.reducer;
