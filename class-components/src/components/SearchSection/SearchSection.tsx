import { useEffect, ChangeEvent, KeyboardEvent, useState } from 'react';
import { CharacterResponse } from '../../types/types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './SearchSection.scss';
import { useTheme } from '../../hooks/useTheme';
import { useLazyGetCharactersQuery } from '../../api/rtkApi';
import { useDispatchIsCharLoading } from '../../store/charactersLoadingSlice';

interface Props {
  setCharactersFromResponse: (response: CharacterResponse) => void;
  setIfNextPage: (ifNextPage: boolean) => void;
}

export const SearchSection = ({
  setCharactersFromResponse,
  setIfNextPage,
}: Props) => {
  const dispatchIsCharLoading = useDispatchIsCharLoading();
  const [trigger, { data: charactersResponse }] = useLazyGetCharactersQuery();
  const { theme } = useTheme();
  const [query, setQuery] = useLocalStorage('searchQuery', '');
  const [inputValue, setInputValue] = useState<string>(query);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || '1';
  const navigate = useNavigate();
  const { id } = useParams();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    dispatchIsCharLoading(true);

    const queryToSearch = query !== undefined ? query : '';
    const trimmedQuery = queryToSearch.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    const timer = setTimeout(async () => {
      await trigger({ searchString: trimmedQuery, page });
      dispatchIsCharLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    dispatchIsCharLoading(true);
    const queryToSearch = query !== undefined ? query : '';
    const trimmedQuery = queryToSearch.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    const timer = setTimeout(async () => {
      await trigger({ searchString: trimmedQuery, page });
      dispatchIsCharLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [page]);

  useEffect(() => {
    setCharactersFromResponse(
      charactersResponse || { error: 'There is nothing here!' }
    );
    setIfNextPage(Boolean(charactersResponse?.info?.next));
  }, [charactersResponse]);

  const prepareSearch = () => {
    setQuery(inputValue);
    searchParams.set('page', '1');

    if (id) {
      navigate(`/details/${id}/?${searchParams.toString()}`);
    } else {
      navigate(`/?${searchParams.toString()}`);
    }
  };

  const handleSearchButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    prepareSearch();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      prepareSearch();
    }
  };

  return (
    <div className={`section ${theme} search-section`}>
      <input
        className={`search-input ${theme}`}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter text..."
      />
      <button className={theme} onClick={handleSearchButton}>
        Search!
      </button>
    </div>
  );
};
