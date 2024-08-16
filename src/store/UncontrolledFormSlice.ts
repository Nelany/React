import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types/FormDataTypes';

interface FormState {
  uncontrolledFormData: FormData | null;
}

const initialState: FormState = {
  uncontrolledFormData: null,
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledFormData',
  initialState,
  reducers: {
    setUncontrolledFormData: (
      state,
      action: PayloadAction<FormData | null>
    ) => {
      state.uncontrolledFormData = action.payload;
    },
  },
});

export const { setUncontrolledFormData } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;
