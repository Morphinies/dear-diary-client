import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state) {
      state.error = '';
      state.loading = false;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginLoading(state) {
      state.error = '';
      state.loading = true;
    },
  },
});

export const { loginSuccess, loginFailure, loginLoading } = loginSlice.actions;
export default loginSlice.reducer;
