import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { SearchSection } from './SearchSection';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: { page: '1' },
    asPath: '/',
  }),
}));

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
          <MemoryRouter>
            <SearchSection />
          </MemoryRouter>
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
          <MemoryRouter>
            <SearchSection />
          </MemoryRouter>
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
          <MemoryRouter>
            <SearchSection />
          </MemoryRouter>
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
          <MemoryRouter>
            <SearchSection />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Enter text...'
    ) as HTMLInputElement;

    expect(input.value).toBe('initial value');
  });
});
