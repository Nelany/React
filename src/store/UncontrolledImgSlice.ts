import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImgState {
  uncontrolledImg: string | null;
}

const initialState: ImgState = {
  uncontrolledImg: null,
};

const uncontrolledImgSlice = createSlice({
  name: 'uncontrolledImg',
  initialState,
  reducers: {
    setUncontrolledImg: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.uncontrolledImg = action.payload;
    },
  },
});

export const { setUncontrolledImg } = uncontrolledImgSlice.actions;

export default uncontrolledImgSlice.reducer;
