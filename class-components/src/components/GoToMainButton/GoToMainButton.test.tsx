import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { GoToMainButton } from './GoToMainButton';

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('GoToMainButton component', () => {
  test('matches snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider>
          <GoToMainButton />
        </ThemeProvider>
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
