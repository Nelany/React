import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImgState {
  reactHookImg: string | null;
}

const initialState: ImgState = {
  reactHookImg: null,
};

const reactHookImgSlice = createSlice({
  name: 'reactHookImg',
  initialState,
  reducers: {
    setReactHookImg: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.reactHookImg = action.payload;
    },
  },
});

export const { setReactHookImg } = reactHookImgSlice.actions;

export default reactHookImgSlice.reducer;
