import { configureStore } from '@reduxjs/toolkit';
import { Character } from '../types/types';
import characterReducer, {
  removeAllSelectedCharacters,
  setSelectedCharacters,
} from './characterSlice';

describe('selectedCharactersSlice', () => {
  const store = configureStore({
    reducer: { characters: characterReducer },
  });

  test('should handle initial state', () => {
    expect(store.getState().characters.selectedCharacters).toEqual({});
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
    expect(store.getState().characters.selectedCharacters['1']).toEqual(
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
    expect(store.getState().characters.selectedCharacters).toEqual({});
  });
});
