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
    removeSelectedCharacter: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
    },
  },
});

export const { setSelectedCharacters, removeSelectedCharacter } =
  selectedCharactersSlice.actions;

export default selectedCharactersSlice.reducer;
