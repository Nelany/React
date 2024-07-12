// src/components/SearchSection/__tests__/SearchSection.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchSection } from './SearchSection';

jest.mock('../../api/api', () => ({
  getCharacters: jest.fn(),
}));

const setCharactersFromResponse = jest.fn();
const setIsLoading = jest.fn();
const setIfNextPage = jest.fn();

describe('SearchSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  it('calls handleSearch on button click', async () => {
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

    await waitFor(() => {
      expect(setIsLoading).toHaveBeenCalledWith(true);
      expect(setIsLoading).toHaveBeenCalledWith(false);
    });
  });

  it('calls handleSearch on Enter key press', async () => {
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

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(setIsLoading).toHaveBeenCalledWith(true);
      expect(setIsLoading).toHaveBeenCalledWith(false);
    });
  });
});
