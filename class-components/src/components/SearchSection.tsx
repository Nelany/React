import { useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { getCharacters } from '../api/api';
import { CharacterResponse } from '../types/types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface Props {
  setCharactersFromResponse: (response: CharacterResponse) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIfNextPage: (ifNextPage: boolean) => void;
  ifReturnToRickNMorty: boolean;
}

export const SearchSection = ({
  setIsLoading,
  setCharactersFromResponse,
  setIfNextPage,
  ifReturnToRickNMorty,
}: Props) => {
  const [query, setQuery] = useLocalStorage('searchQuery', '');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || '1';
  const navigate = useNavigate();
  const { id } = useParams();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (searchQuery?: string) => {
    if (id) {
      navigate(`/details/${id}/?${searchParams.toString()}`);
    } else {
      navigate(`/?${searchParams.toString()}`);
    }

    setIsLoading(true);

    const queryToSearch = searchQuery !== undefined ? searchQuery : '';
    const trimmedQuery = queryToSearch.trim();

    setTimeout(async () => {
      const charactersResponse = await getCharacters({
        searchString: trimmedQuery,
        page: page,
      });

      localStorage.setItem('searchQuery', trimmedQuery);
      setCharactersFromResponse(charactersResponse);
      setIfNextPage(Boolean(charactersResponse?.info?.next));
      setIsLoading(false);
    }, 1000);
  };

  const handleSearchButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    searchParams.set('page', String(1));
    handleSearch(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchParams.set('page', String(1));
      handleSearch(query);
    }
  };

  useEffect(() => {
    if (query) {
      console.log(ifReturnToRickNMorty);
      handleSearch(query);
    } else handleSearch();
  }, [page]);

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
      <button onClick={handleSearchButton}>Search!</button>
    </div>
  );
};
