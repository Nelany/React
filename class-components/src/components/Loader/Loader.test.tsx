import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { Loader } from './Loader';

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');

  return {
    ...actual,
    useLocation: () => ({ search: '' }),
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: '1' }),
    useSearchParams: () => [{ get: () => '1' }],
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
