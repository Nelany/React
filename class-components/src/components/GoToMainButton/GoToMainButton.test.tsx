import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoToMainButton } from './GoToMainButton';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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
