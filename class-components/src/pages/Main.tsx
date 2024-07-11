import { SearchSection } from '../components/SearchSection';
import { ResultsSection } from '../components/ResultsSection';
import { CharacterResponse } from '../types/types';
import './Main.scss';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const Main = () => {
  const [characterResponse, setCharacterResponse] =
    useState<CharacterResponse | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleErrorClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('I crashed!');
  }

  return (
    <div className="main">
      <img className="rick-morty-img" src="./rickmorty.png" alt="" />
      <img
        className="rick-morty-img rick-morty-img-reverse"
        src="./rickmorty.png"
        alt="Rick and Morty"
      />

      <h1 className="main__tittle">Rick and Morty</h1>
      <SearchSection
        setCharactersFromResponse={setCharacterResponse}
        setIsLoading={setIsLoading}
      />

      <button className="error-button" onClick={handleErrorClick}>
        Create an error!
      </button>

      <ResultsSection
        isLoading={isLoading}
        characterResponse={characterResponse}
      />

      <Outlet />
    </div>
  );
};
