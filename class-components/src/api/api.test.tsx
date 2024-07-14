import { vi } from 'vitest';
import { getCharacters } from './api';

describe('getCharacters function', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ mockData: 'characters' }),
      })
    ) as unknown as jest.MockedFunction<typeof global.fetch>;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('fetches characters without page or search string', async () => {
    const props = {};
    await getCharacters(props);
    const url = new URL('https://rickandmortyapi.com/api/character/');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('fetches characters with page number', async () => {
    const props = { page: '2' };
    await getCharacters(props);
    const url = new URL('https://rickandmortyapi.com/api/character/');
    url.searchParams.set('page', '2');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('fetches characters with page number and search string', async () => {
    const props = { page: '2', searchString: 'Rick' };
    await getCharacters(props);
    const url = new URL('https://rickandmortyapi.com/api/character/');
    url.searchParams.set('page', '2');
    url.searchParams.set('name', 'Rick');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('fetches character by id', async () => {
    const props = { id: '123' };
    await getCharacters(props);
    const url = new URL('https://rickandmortyapi.com/api/character/123');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('returns characters data correctly', async () => {
    const props = {};
    const result = await getCharacters(props);
    expect(result).toEqual({ mockData: 'characters' });
  });

  test('handles fetch error', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Fetch error'));
    const props = {};
    await expect(getCharacters(props)).rejects.toThrow('Fetch error');
  });
});
