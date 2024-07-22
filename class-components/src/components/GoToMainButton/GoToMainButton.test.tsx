import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoToMainButton } from './GoToMainButton';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';

describe('GoToMainButton component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider>
          <Router>
            <GoToMainButton />
          </Router>
        </ThemeProvider>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
