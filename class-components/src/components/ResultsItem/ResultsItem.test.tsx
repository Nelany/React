import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import Details from '../../../app/routes/details.$id';
import { store } from '../../store/store';
import { ResultsItem } from './ResultsItem';

const navigateMock = vi.fn();
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
vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');

  return {
    ...actual,
    useLoaderData: () => ({ character: mockCharacter, isError: false }),
    useLocation: () => ({ search: '' }),
    useNavigate: () => navigateMock,
    useParams: () => ({ id: '1' }),
    useSearchParams: () => [{ get: () => '1' }],
  };
});

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

    expect(navigateMock).toHaveBeenCalledWith(
      `/details/${mockCharacter.id}/?page=1`
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

    expect(navigateMock).toHaveBeenCalledWith(
      `/details/${mockCharacter.id}/?page=1`
    );

    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument();
  });
});
