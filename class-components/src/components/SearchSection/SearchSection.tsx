'use client';
import classNames from 'classnames';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetCharactersQuery } from '../../api/rtkApi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTheme } from '../../hooks/useTheme';
import {
  setCharactersResponse,
  useDispatchIsCharLoading,
} from '../../store/characterSlice';
import { useRouter, useSearchParams } from 'next/navigation';

export const SearchSection = () => {
  const dispatch = useDispatch();
  const dispatchIsCharLoading = useDispatchIsCharLoading();
  const [trigger, { currentData: charactersResponse }] =
    useLazyGetCharactersQuery();
  const { theme } = useTheme();
  const [query, setQuery] = useLocalStorage('searchQuery', '');
  const [inputValue, setInputValue] = useState<string>(query);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const page = searchParams.get('page') || '1';

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
  }, [query, page]);

  useEffect(() => {
    dispatch(
      setCharactersResponse(
        charactersResponse || { error: 'There is nothing here!' }
      )
    );
  }, [charactersResponse]);

  const prepareSearch = () => {
    setQuery(inputValue);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', '1');

    if (id) {
      router.push(`/details/${id}/?${newSearchParams.toString()}`);
    } else {
      router.push(`/?${newSearchParams.toString()}`);
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

  const searchSectionClasses = classNames('section search-section', theme);
  const searchInputClasses = classNames('search-input', theme);

  return (
    <div className={searchSectionClasses}>
      <input
        className={searchInputClasses}
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
