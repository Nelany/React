import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { Details } from './Details';
import { getCharacters } from '../../api/api';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';

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

  test('Check that a loading indicator is displayed while fetching data', async () => {
    (getCharacters as jest.Mock).mockResolvedValueOnce(mockCharacter);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/details/1']}>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    expect(screen.queryByTestId('loader')).toBeNull();
  });

  test('the detailed card component correctly displays the detailed card data', async () => {
    (getCharacters as jest.Mock).mockResolvedValueOnce(mockCharacter);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/details/1']}>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
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

  test('clicking the close button hides the component', async () => {
    (getCharacters as jest.Mock).mockResolvedValueOnce(mockCharacter);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/details/1']}>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument();

    const closeButton = screen.getByText('X');
    userEvent.click(closeButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    expect(screen.queryByTestId('details')).toBeNull();
  });
});
