import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../types/types';

interface SelectedCharactersState {
  data: Record<string, Character>;
}

const initialState: SelectedCharactersState = {
  data: {},
};

const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    setSelectedCharacters: (state, action: PayloadAction<Character>) => {
      const character = action.payload;

      if (state.data[character.id]) {
        delete state.data[character.id];
      } else {
        state.data[character.id] = character;
      }
    },
    removeAllSelectedCharacters: (state) => {
      state.data = {};
    },
  },
});

export const { setSelectedCharacters, removeAllSelectedCharacters } =
  selectedCharactersSlice.actions;

export default selectedCharactersSlice.reducer;
