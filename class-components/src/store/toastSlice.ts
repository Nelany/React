import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ToastProps = {isToastOpen: boolean};

export interface ToastState {
  value: ToastProps;
}

const initialState: ToastState = {
  value: {
    isToastOpen: false,
  },
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<ToastProps>) => {
      state.value = action.payload;
    },
  },
});

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;
