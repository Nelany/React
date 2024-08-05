import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { GoToMainButton } from './GoToMainButton';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
    useParams: vi.fn(() => ({ id: '1' })),
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
