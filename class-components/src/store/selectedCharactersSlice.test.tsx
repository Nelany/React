import { configureStore } from '@reduxjs/toolkit';
import selectedCharactersReducer, {
  setSelectedCharacters,
  removeAllSelectedCharacters,
} from './selectedCharactersSlice';
import { Character } from '../types/types';

describe('selectedCharactersSlice', () => {
  const store = configureStore({
    reducer: { selectedCharacters: selectedCharactersReducer },
  });

  test('should handle initial state', () => {
    expect(store.getState().selectedCharacters.data).toEqual({});
  });

  test('should handle setSelectedCharacters by adding a character', () => {
    const testCharacter: Character = {
      id: 1,
      name: 'Test Character',
      status: 'Alive',
      species: 'Human',
      gender: '',
      origin: {
        name: '',
        url: '',
      },
      location: {
        name: '',
        url: '',
      },
      image: '',
      episode: [],
      url: '',
      created: '',
    };
    store.dispatch(setSelectedCharacters(testCharacter));
    expect(store.getState().selectedCharacters.data['1']).toEqual(
      testCharacter
    );
  });

  test('should handle removeAllSelectedCharacters', () => {
    const testCharacter1: Character = {
      id: 1,
      name: 'Test Character 1',
      status: 'Alive',
      species: 'Human',
      gender: '',
      origin: {
        name: '',
        url: '',
      },
      location: {
        name: '',
        url: '',
      },
      image: '',
      episode: [],
      url: '',
      created: '',
    };
    const testCharacter2: Character = {
      id: 2,
      name: 'Test Character 2',
      status: 'Dead',
      species: 'Alien',
      gender: '',
      origin: {
        name: '',
        url: '',
      },
      location: {
        name: '',
        url: '',
      },
      image: '',
      episode: [],
      url: '',
      created: '',
    };
    store.dispatch(setSelectedCharacters(testCharacter1));
    store.dispatch(setSelectedCharacters(testCharacter2));
    store.dispatch(removeAllSelectedCharacters());
    expect(store.getState().selectedCharacters.data).toEqual({});
  });
});
