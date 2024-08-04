import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Loader } from './Loader';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
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

describe('Loader Component', () => {
  test('the appropriate message is displayed if no cards are present', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Loader isLoading={false} needRefresh={true} isError />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('There is nothing here!')).toBeInTheDocument();
  });
});
