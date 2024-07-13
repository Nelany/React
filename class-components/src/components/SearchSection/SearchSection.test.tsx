import { render, screen, fireEvent } from '@testing-library/react';
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
});
