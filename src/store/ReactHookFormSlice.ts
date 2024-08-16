import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types/FormDataTypes';

interface FormState {
  reactHookFormData: FormData | null;
}

const initialState: FormState = {
  reactHookFormData: null,
};

const reactHookFormSlice = createSlice({
  name: 'reactHookFormData',
  initialState,
  reducers: {
    setReactHookFormData: (
      state,
      action: PayloadAction<FormData | null>
    ) => {
      state.reactHookFormData = action.payload;
    },
  },
});

export const { setReactHookFormData } = reactHookFormSlice.actions;

export default reactHookFormSlice.reducer;
