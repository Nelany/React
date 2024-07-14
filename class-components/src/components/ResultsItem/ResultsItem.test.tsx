import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ResultsItem } from './ResultsItem';
import { vi } from 'vitest';
import { Details } from '../Details/Details';

vi.mock(
  'react-router-dom',
  async (importOriginal: () => Promise<Record<string, unknown>>) => {
    const actual = await importOriginal();

    return {
      ...actual,
      useNavigate: vi.fn(),
      useLocation: vi.fn(() => ({
        search: '',
      })),
    };
  }
);

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth',
    url: '',
  },
  location: {
    name: 'Earth',
    url: '',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
};

describe('ResultsItem', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('calls navigate with correct URL when clicked', async () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <ResultsItem name="Rick Sanchez" character={mockCharacter} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('results-item'));

    expect(mockNavigate).toHaveBeenCalledWith(
      `/details/${mockCharacter.id}/?page=1`
    );
  });

  test('renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <ResultsItem name="Rick Sanchez" character={mockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('results-item')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Last known location: Earth')).toBeInTheDocument();
    expect(screen.getByAltText('img')).toHaveAttribute(
      'src',
      mockCharacter.image
    );
  });

  test('clicking on a card opens a detailed card component', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter initialEntries={[`/`]}>
        <Routes>
          <Route
            path="/"
            element={
              <ResultsItem name="Rick Sanchez" character={mockCharacter} />
            }
          />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('results-item'));

    expect(mockNavigate).toHaveBeenCalledWith(
      `/details/${mockCharacter.id}/?page=1`
    );

    render(
      <MemoryRouter initialEntries={[`/details/${mockCharacter.id}`]}>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument();
  });
});
