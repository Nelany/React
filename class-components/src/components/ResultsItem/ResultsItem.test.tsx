import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { Details } from '../Details/Details';
import { ResultsItem } from './ResultsItem';

const pushMock = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: pushMock,
    query: { page: '1' },
    asPath: '/',
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
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <ResultsItem name="Rick Sanchez" character={mockCharacter} />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('results-item'));

    expect(pushMock).toHaveBeenCalledWith(
      `/details/${mockCharacter.id}/?page=1`,
      undefined,
      { scroll: false }
    );
  });

  test('renders the relevant card data', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <ResultsItem name="Rick Sanchez" character={mockCharacter} />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
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
    render(
      <Provider store={store}>
        <ThemeProvider>
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
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('results-item'));

    expect(pushMock).toHaveBeenCalledWith(
      `/details/${mockCharacter.id}/?page=1`,
      undefined,
      { scroll: false }
    );

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={[`/details/${mockCharacter.id}`]}>
            <Details />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument();
  });
});
