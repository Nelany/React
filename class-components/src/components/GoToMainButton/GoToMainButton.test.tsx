import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoToMainButton } from './GoToMainButton';

describe('GoToMainButton component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Router>
        <GoToMainButton />
      </Router>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
