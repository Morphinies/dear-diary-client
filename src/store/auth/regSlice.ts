import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  waitingConfirm: false,
};

const regSlice = createSlice({
  name: 'reg',
  initialState,
  reducers: {
    regSuccess(state) {
      state.error = '';
      state.loading = false;
      state.waitingConfirm = true;
    },
    regFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.waitingConfirm = false;
    },
    regLoading(state) {
      state.error = '';
      state.loading = true;
      state.waitingConfirm = false;
    },
    regClear(state) {
      state.error = '';
      state.loading = false;
      state.waitingConfirm = false;
    },
  },
});

export const { regSuccess, regFailure, regLoading, regClear } =
  regSlice.actions;
export default regSlice.reducer;
