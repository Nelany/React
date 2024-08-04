import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import NotFound from '../../../app/not-found';
import { vi } from 'vitest';

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

test('renders NotFound component correctly', () => {
  const { container } = render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>
          <NotFound theme={'light'} />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
