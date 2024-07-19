import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterResponse } from '../types/types';

interface CharactersResponseState {
  data: CharacterResponse | null;
}

const initialState: CharactersResponseState = {
  data: null,
};

const charactersResponseSlice = createSlice({
  name: 'charactersResponse',
  initialState,
  reducers: {
    setCharactersResponse: (state, action: PayloadAction<CharacterResponse | null>) => {
      state.data = action.payload;
    },
  },
});

export const { setCharactersResponse } = charactersResponseSlice.actions;

export default charactersResponseSlice.reducer;