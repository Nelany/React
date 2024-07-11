import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { getCharacters } from '../api/api';
import { CharacterResponse } from '../types/types';

interface Props {
  setCharactersFromResponse: (response: CharacterResponse) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const SearchSection = (props: Props) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (searchQuery?: string) => {
    props.setIsLoading(true);

    const queryToSearch = searchQuery !== undefined ? searchQuery : query;
    const trimmedQuery = queryToSearch.trim();

    setTimeout(async () => {
      const charactersResponse = await getCharacters(trimmedQuery);
      localStorage.setItem('searchQuery', trimmedQuery);
      props.setCharactersFromResponse(charactersResponse);
      props.setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const lastQuery = localStorage.getItem('searchQuery');

    if (lastQuery) {
      setQuery(lastQuery);

      handleSearch(lastQuery);
    } else handleSearch();
  }, []);

  return (
    <div className="section search-section">
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter text..."
      />
      <button onClick={() => handleSearch()}>Search!</button>
    </div>
  );
};
