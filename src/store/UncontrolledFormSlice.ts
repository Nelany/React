import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types/FormDataTypes';

interface FormState {
  uncontrolledFormData: FormData[];
}

const initialState: FormState = {
  uncontrolledFormData: [],
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledFormData',
  initialState,
  reducers: {
    setUncontrolledFormData: (
      state,
      action: PayloadAction<FormData>
    ) => {
      state.uncontrolledFormData.push(action.payload);
    },
  },
});

export const { setUncontrolledFormData } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;