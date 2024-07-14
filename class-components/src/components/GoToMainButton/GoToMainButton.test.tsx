import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoToMainButton } from './GoToMainButton';
import { vi } from 'vitest';

describe('GoToMainButton component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Router>
        <GoToMainButton />
      </Router>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls setIfReturnToRickNMorty function when button is clicked and prop is provided', () => {
    const setIfReturnToRickNMortyMock = vi.fn();

    const { getByText } = render(
      <Router>
        <GoToMainButton setIfReturnToRickNMorty={setIfReturnToRickNMortyMock} />
      </Router>
    );

    fireEvent.click(getByText('Return to Rick and Morty!'));

    expect(setIfReturnToRickNMortyMock).toHaveBeenCalledWith(
      expect.any(Function)
    );
  });
});
