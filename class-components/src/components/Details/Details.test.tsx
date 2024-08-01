import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';
import { getCharacters } from '../../api/api';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import Details from '../../../pages/details/[id]';

vi.mock('../../api/api', () => ({
  getCharacters: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: { id: '1' },
    asPath: '/details/1',
  }),
  Router: {
    events: {
      on: vi.fn(),
    },
  },
}));

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: 'Mad scientist',
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/character/1/origin',
  },
  created: '2017-11-04T18:48:46.250Z',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
};

describe('Details', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('the detailed card component correctly displays the detailed card data', async () => {
    (getCharacters as Mock).mockResolvedValueOnce(mockCharacter);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/details/1']}>
            <Routes>
              <Route
                path="/details/:id"
                element={<Details character={mockCharacter} isError={false} />}
              />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Origin: Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByTestId('detailsCreated')).toBeInTheDocument();
  });
});
