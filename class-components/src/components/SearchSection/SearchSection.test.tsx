import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { SearchSection } from './SearchSection';

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

vi.mock('../../api/api', () => ({
  getCharacters: vi.fn(),
}));

describe('SearchSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and button', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchSection />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
    expect(screen.getByText('Search!')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchSection />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Enter text...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe('test');
  });

  it('clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchSection />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Enter text...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });

    const button = screen.getByText('Search!');
    fireEvent.click(button);

    await new Promise((resolve) => setTimeout(resolve, 100));

    await waitFor(() => {
      expect(localStorage.getItem('searchQuery')).toBe('test');
    });
  });

  it('the component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('searchQuery', 'initial value');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchSection />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Enter text...'
    ) as HTMLInputElement;

    expect(input.value).toBe('initial value');
  });
});
