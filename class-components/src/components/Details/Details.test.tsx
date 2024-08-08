import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

import { getCharacters } from '../../api/api';
import { store } from '../../store/store';
import Details from '../../../app/routes/details.$id';

vi.mock('../../api/api', () => ({
  getCharacters: vi.fn(),
}));

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
    useParams: vi.fn(() => ({ id: '1' })),
  };
});

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
        <Details />
      </Provider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Origin: Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByTestId('detailsCreated')).toBeInTheDocument();
  });
});
