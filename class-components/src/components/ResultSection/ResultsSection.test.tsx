import { render, screen } from '@testing-library/react';
import { ResultsSection } from './ResultsSection';
import { CharacterResponse } from '../../types/types';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const mockCharacterResponse: CharacterResponse = {
  info: {
    count: 2,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [
    {
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
    },
    {
      id: 2,
      name: 'Morty Smith',
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
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: [],
      url: '',
      created: '',
    },
  ],
};

describe('ResultsSection', () => {
  test('renders loader when loading', () => {
    render(
      <MemoryRouter>
        <ResultsSection ifNextPage={false} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders character results when not loading', () => {
    render(
      <MemoryRouter>
        <ResultsSection ifNextPage={false} />
      </MemoryRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  test('matches snapshot when loading', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ResultsSection ifNextPage={false} />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('matches snapshot with results', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ResultsSection ifNextPage={false} />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <ResultsSection ifNextPage={false} />
      </MemoryRouter>
    );

    const cards = screen.getAllByTestId('results-item');
    expect(mockCharacterResponse.results).toBeDefined();
    if (mockCharacterResponse.results)
      expect(cards).toHaveLength(mockCharacterResponse.results.length);
  });
});
