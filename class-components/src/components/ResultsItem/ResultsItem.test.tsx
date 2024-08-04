import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { store } from '../../store/store';
import { Details } from '../Details/Details';
import { ResultsItem } from './ResultsItem';

const pushMock = vi.fn();

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: pushMock,
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
        <ResultsItem name="Rick Sanchez" character={mockCharacter} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('results-item'));

    expect(pushMock).toHaveBeenCalledWith(
      `/details/${mockCharacter.id}/?page=1`,
      { scroll: false }
    );
  });

  test('renders the relevant card data', () => {
    render(
      <Provider store={store}>
        <ResultsItem name="Rick Sanchez" character={mockCharacter} />
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
        <ResultsItem name="Rick Sanchez" character={mockCharacter} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('results-item'));

    expect(pushMock).toHaveBeenCalledWith(
      `/details/${mockCharacter.id}/?page=1`,
      { scroll: false }
    );

    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument();
  });
});
