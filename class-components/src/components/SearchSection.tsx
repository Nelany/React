import { useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { getCharacters } from '../api/api';
import { CharacterResponse } from '../types/types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props {
  setCharactersFromResponse: (response: CharacterResponse) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const SearchSection = ({
  setIsLoading,
  setCharactersFromResponse,
}: Props) => {
  const [query, setQuery] = useLocalStorage('searchQuery', '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setQuery(event.target.value);
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleSearch = async (searchQuery?: string) => {
    setIsLoading(true);

    const queryToSearch = searchQuery !== undefined ? searchQuery : '';
    const trimmedQuery = queryToSearch.trim();

    setTimeout(async () => {
      const charactersResponse = await getCharacters({
        searchString: trimmedQuery,
      });
      localStorage.setItem('searchQuery', trimmedQuery);
      setCharactersFromResponse(charactersResponse);
      setIsLoading(false);
    }, 1000);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleSearch(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(query);
    }
  };

  useEffect(() => {
    if (query) {
      setQuery(query);
      handleSearch(query);
    } else handleSearch();
  }, []);

  return (
    <div className="section search-section">
      <input
        className="search-input"
        type="text"
        value={query}
        onClick={handleInputClick}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter text..."
      />
      <button onClick={handleButtonClick}>Search!</button>
    </div>
  );
};
