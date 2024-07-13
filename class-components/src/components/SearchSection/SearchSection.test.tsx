import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { SearchSection } from './SearchSection';

vi.mock('../../api/api', () => ({
  getCharacters: vi.fn(),
}));

const setCharactersFromResponse = vi.fn();
const setIsLoading = vi.fn();
const setIfNextPage = vi.fn();

describe('SearchSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and button', () => {
    render(
      <MemoryRouter>
        <SearchSection
          setCharactersFromResponse={setCharactersFromResponse}
          setIsLoading={setIsLoading}
          setIfNextPage={setIfNextPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Enter text...')).toBeTruthy();
    expect(screen.getByText('Search!')).toBeTruthy();
  });

  it('updates input value on change', () => {
    render(
      <MemoryRouter>
        <SearchSection
          setCharactersFromResponse={setCharactersFromResponse}
          setIsLoading={setIsLoading}
          setIfNextPage={setIfNextPage}
        />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      'Enter text...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe('test');
  });

  it('saves input value to local storage on search button click', async () => {
    render(
      <MemoryRouter>
        <SearchSection
          setCharactersFromResponse={setCharactersFromResponse}
          setIsLoading={setIsLoading}
          setIfNextPage={setIfNextPage}
        />
      </MemoryRouter>
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

  it('fetches input value from local storage on component mount', () => {
    localStorage.setItem('searchQuery', 'initial value');

    render(
      <MemoryRouter>
        <SearchSection
          setCharactersFromResponse={setCharactersFromResponse}
          setIsLoading={setIsLoading}
          setIfNextPage={setIfNextPage}
        />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      'Enter text...'
    ) as HTMLInputElement;

    expect(input.value).toBe('initial value');
  });
});
