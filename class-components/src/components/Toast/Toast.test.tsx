import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Toast } from './Toast';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { Character } from '../../types/types';

vi.mock('../../store/selectedCharactersSlice', () => ({
  removeAllSelectedCharacters: vi.fn(),
}));

const mockSelectedCharacters: Record<string, Character> = {
  1: {
    id: 1,
    name: 'Character 1',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://example.com/origin/1',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://example.com/location/1',
    },
    image: 'https://example.com/character1.jpg',
    episode: ['https://example.com/episode/1'],
    url: 'https://example.com/character/1',
    created: '2017-11-04T18:48:46.250Z',
  },
  2: {
    id: 2,
    name: 'Character 2',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Female',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://example.com/origin/2',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://example.com/location/2',
    },
    image: 'https://example.com/character2.jpg',
    episode: ['https://example.com/episode/2'],
    url: 'https://example.com/character/2',
    created: '2017-11-04T18:48:46.250Z',
  },
};

const testSlice = createSlice({
  name: 'test',
  initialState: { data: mockSelectedCharacters },
  reducers: {
    setSelectedCharacters: (state, action) => {
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

const { reducer } = testSlice;
const mockStore = configureStore({
  reducer: {
    selectedCharacters: reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

describe('Toast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the correct number of selected items', () => {
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MemoryRouter>
            <Toast />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('2 items are selected!')).toBeInTheDocument();
  });
});
