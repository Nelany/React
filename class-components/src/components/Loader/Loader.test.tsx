import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Loader } from './Loader';
import { CharacterResponse } from '../../types/types';

describe('Loader Component', () => {
  test('the appropriate message is displayed if no cards are present', () => {
    const mockResponse: CharacterResponse = {
      error: 'No characters found',
    };

    render(
      <MemoryRouter>
        <Loader
          isLoading={false}
          response={mockResponse}
          setIfReturnToRickNMorty={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('There is nothing here!')).toBeInTheDocument();
  });
});
