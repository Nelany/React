import './Main.scss';
import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { CharacterResponse } from '../../types/types';
import { SearchSection } from '../../components/SearchSection';
import { ResultsSection } from '../../components/ResultsSection';

export const Main = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const closeDetails = () => {
    navigate(`/`);
  };

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={closeDetails} className="main">
      <img className="rick-morty-img" src="/rickmorty.png" alt="" />
      <img
        className="rick-morty-img rick-morty-img-reverse"
        src="/rickmorty.png"
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

      <div className="main__results-container">
        <ResultsSection
          isLoading={isLoading}
          characterResponse={characterResponse}
        />

        <div
          onClick={onClick}
          className={id ? 'main__outlet' : 'main__outlet main__outlet-hidden'}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
