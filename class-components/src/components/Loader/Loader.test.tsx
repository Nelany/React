import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Loader } from './Loader';

describe('Loader Component', () => {
  test('the appropriate message is displayed if no cards are present', () => {
    render(
      <MemoryRouter>
        <Loader isLoading={false} needRefresh={true} isError />
      </MemoryRouter>
    );

    expect(screen.getByText('There is nothing here!')).toBeInTheDocument();
  });
});
