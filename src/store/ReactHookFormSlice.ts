import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types/FormDataTypes';

interface FormState {
  reactHookFormData: FormData[];
}

const initialState: FormState = {
  reactHookFormData: [],
};

const reactHookFormSlice = createSlice({
  name: 'reactHookFormData',
  initialState,
  reducers: {
    setReactHookFormData: (
      state,
      action: PayloadAction<FormData>
    ) => {
      state.reactHookFormData.push(action.payload);
    },
  },
});

export const { setReactHookFormData } = reactHookFormSlice.actions;

export default reactHookFormSlice.reducer;
