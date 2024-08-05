import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { GoToMainButton } from './GoToMainButton';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('GoToMainButton component', () => {
  test('matches snapshot', () => {
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
