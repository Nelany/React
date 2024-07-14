import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Details } from './Details';
import { getCharacters } from '../../api/api';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

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

  test('the detailed card component correctly displays the detailed card data', async () => {
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

  test('an additional API call to fetch detailed information', async () => {
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

    expect(getCharacters).toHaveBeenCalledTimes(1);
    expect(getCharacters).toHaveBeenCalledWith({ id: '1' });
  });

  test('clicking the close button hides the component', async () => {
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

    expect(screen.getByTestId('details')).toBeInTheDocument();

    const closeButton = screen.getByText('X');
    userEvent.click(closeButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    expect(screen.queryByTestId('details')).toBeNull();

    if (screen.queryByTestId('details')) {
      console.log(
        'Details component still in the document:',
        screen.queryByTestId('details')
      );
    }
  });
});
