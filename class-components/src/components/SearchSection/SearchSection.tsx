import { useEffect, ChangeEvent, KeyboardEvent, useState } from 'react';
import { CharacterResponse } from '../../types/types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './SearchSection.scss';
import { useTheme } from '../../hooks/useTheme';
import { useLazyGetCharactersQuery } from '../../api/rtkApi';

interface Props {
  setCharactersFromResponse: (response: CharacterResponse) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIfNextPage: (ifNextPage: boolean) => void;
}

export const SearchSection = ({
  setIsLoading,
  setCharactersFromResponse,
  setIfNextPage,
}: Props) => {
  const [trigger, { data: charactersResponse, isLoading }] =
    useLazyGetCharactersQuery();
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

  // const handleSearch = async (searchQuery?: string) => {
  //   if (id) {
  //     navigate(`/details/${id}/?${searchParams.toString()}`);
  //   } else {
  //     navigate(`/?${searchParams.toString()}`);
  //   }

  //   setIsLoading(true);

  //   const queryToSearch = searchQuery !== undefined ? searchQuery : '';
  //   const trimmedQuery = queryToSearch.trim();

  //   setTimeout(async () => {
  //     const charactersResponse = await getCharacters({
  //       searchString: trimmedQuery,
  //       page: page,
  //     });

  //     localStorage.setItem('searchQuery', trimmedQuery);
  //     setCharactersFromResponse(charactersResponse);
  //     setIfNextPage(Boolean(charactersResponse?.info?.next));
  //     setIsLoading(false);
  //   }, 1000);
  // };

  useEffect(() => {
    // if (id) {
    //   navigate(`/details/${id}/?${searchParams.toString()}`);
    // } else {
    //   navigate(`/?${searchParams.toString()}`);
    // }

    setIsLoading(isLoading);

    const queryToSearch = query !== undefined ? query : '';
    const trimmedQuery = queryToSearch.trim();
    const timer = setTimeout(async () => {
      if (trimmedQuery) {
        await trigger({ searchString: trimmedQuery, page });
        localStorage.setItem('searchQuery', trimmedQuery);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setIsLoading(isLoading);
    const queryToSearch = query !== undefined ? query : '';
    const trimmedQuery = queryToSearch.trim();
    const timer = setTimeout(async () => {
      await trigger({ searchString: trimmedQuery, page });
      localStorage.setItem('searchQuery', trimmedQuery);
    }, 1000);

    return () => clearTimeout(timer);
  }, [page]);

  useEffect(() => {
    setCharactersFromResponse(
      charactersResponse || { error: 'There is nothing here!' }
    );
    setIfNextPage(Boolean(charactersResponse?.info?.next));
    setIsLoading(isLoading);
  }, [charactersResponse]);

  // const handleSearch = async () => {
  //   await trigger({ searchString: inputValue.trim(), page: '1' });
  // };

  const prepareSearch = () => {
    setQuery(inputValue);

    // const queryToSearch = query !== undefined ? query : '';
    // const trimmedQuery = queryToSearch.trim();

    // localStorage.setItem('searchQuery', trimmedQuery);

    searchParams.set('page', '1');
    console.log(inputValue);

    if (id) {
      navigate(`/details/${id}/?${searchParams.toString()}`);
    } else {
      navigate(`/?${searchParams.toString()}`);
    }

    console.log(query);
    console.log(page);

    // handleSearch(inputValue);
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

  // useEffect(() => {
  //   handleSearch(query);
  // }, [page]);

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
