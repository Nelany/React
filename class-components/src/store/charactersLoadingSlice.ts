import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import type { PayloadAction } from '@reduxjs/toolkit';

type CharLoadingProps = { isCharLoading: boolean };

export interface CharLoadingState {
  value: CharLoadingProps;
}

const initialState: CharLoadingState = {
  value: {
    isCharLoading: false,
  },
};

export const charactersLoadingSlice = createSlice({
  name: 'isCharactersLoading',
  initialState,
  reducers: {
    setCharLoading: (state, action: PayloadAction<CharLoadingProps>) => {
      state.value = action.payload;
    },
  },
});

export const { setCharLoading } = charactersLoadingSlice.actions;

export const useIsCharLoading = () => {
  return useSelector(
    (state: RootState) => state.isCharLoading.value.isCharLoading
  );
};

export const useDispatchIsCharLoading = () => {
  const dispatch = useDispatch();

  return (isCharLoading: boolean) => {
    dispatch(setCharLoading({ isCharLoading }));
  };
};

export default charactersLoadingSlice.reducer;
