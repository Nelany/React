import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormTypeState {
  formType: string;
}

const initialState: FormTypeState = {
  formType: '',
};

const formTypeSlice = createSlice({
  name: 'formType',
  initialState,
  reducers: {
    setFormType: (state, action: PayloadAction<'Uncontrolled Form' | 'React Hook Form' | ''>) => {
      state.formType = action.payload;
    },
  },
});

export const { setFormType } = formTypeSlice.actions;
export default formTypeSlice.reducer;