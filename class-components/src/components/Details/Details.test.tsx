import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Details } from './Details';
import { getCharacters } from '../../api/api';
import { vi } from 'vitest';

vi.mock('../../api/api', () => ({
  getCharacters: vi.fn(),
}));

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: 'Mad scientist',
  location: {
    name: 'Earth (Replacement Dimension)',
  },
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
  },
  created: '2017-11-04T18:48:46.250Z',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('Details', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loader when loading', async () => {
    (getCharacters as jest.Mock).mockResolvedValueOnce(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(screen.queryByTestId('loader')).toBeNull();
  });

  test('renders character details when loaded', async () => {
    (getCharacters as jest.Mock).mockResolvedValueOnce(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Type: Mad scientist')).toBeInTheDocument();
    expect(
      screen.getByText('Last known location: Earth (Replacement Dimension)')
    ).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Origin: Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByTestId('detailsCreated')).toBeInTheDocument();
  });
});
