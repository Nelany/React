import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { Character, CharacterResponse } from '../types/types';

interface CharLoadingProps {
  isCharLoading: boolean;
}

interface CharacterState {
  charactersResponse: CharacterResponse | null;
  selectedCharacters: Record<string, Character>;
  isCharLoading: CharLoadingProps;
}

const initialState: CharacterState = {
  charactersResponse: null,
  selectedCharacters: {},
  isCharLoading: {
    isCharLoading: false,
  },
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharactersResponse: (state, action: PayloadAction<CharacterResponse | null>) => {
      state.charactersResponse = action.payload;
    },
    setSelectedCharacters: (state, action: PayloadAction<Character>) => {
      const character = action.payload;

      if (state.selectedCharacters[character.id]) {
        delete state.selectedCharacters[character.id];
      } else {
        state.selectedCharacters[character.id] = character;
      }
    },
    removeAllSelectedCharacters: (state) => {
      state.selectedCharacters = {};
    },
    setCharLoading: (state, action: PayloadAction<CharLoadingProps>) => {
      state.isCharLoading = action.payload;
    },
  },
});

export const {
  setCharactersResponse,
  setSelectedCharacters,
  removeAllSelectedCharacters,
  setCharLoading,
} = characterSlice.actions;

export const useIsCharLoading = () => {
  return useSelector((state: RootState) => state.characters.isCharLoading.isCharLoading);
};

export const useDispatchIsCharLoading = () => {
  const dispatch = useDispatch();

  return (isCharLoading: boolean) => {
    dispatch(setCharLoading({ isCharLoading }));
  };
};

export default characterSlice.reducer;