import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string | null;
  country: string;
};

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
    setUncontrolledFormData: (state, action: PayloadAction<FormData | null>) => {
      state.uncontrolledFormData = action.payload;
    },
  },
});

export const {
setUncontrolledFormData,
} = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;