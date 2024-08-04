import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import Main from './Main';

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

vi.mock('../../components/SearchSection/SearchSection', () => ({
  SearchSection: vi.fn(() => <div>Mocked SearchSection</div>),
}));
vi.mock('../../components/ResultSection/ResultsSection', () => ({
  ResultsSection: vi.fn(() => <div>Mocked ResultsSection</div>),
}));

describe('Main component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders Main component', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Main />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
    expect(screen.getAllByAltText('Rick and Morty').length).toBe(2);
  });

  test('creates an error when error button is clicked', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    try {
      render(
        <Provider store={store}>
          <ThemeProvider>
            <Main />
          </ThemeProvider>
        </Provider>
      );

      fireEvent.click(screen.getByText('Create an error!'));
    } catch (error) {
      expect((error as Error).message).toContain('I crashed!');
    } finally {
      consoleErrorMock.mockRestore();
    }
  });
});
