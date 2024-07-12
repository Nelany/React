import './Main.scss';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CharacterResponse } from '../../types/types';
import { SearchSection } from '../../components/SearchSection';
import { ResultsSection } from '../../components/ResultsSection';

export const Main = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || '1';
  const [ifNextPage, setIfNextPage] = useState<boolean>(false);

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
    searchParams.set('page', String(page));
    navigate(`/?${searchParams.toString()}`);
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
        setIfNextPage={setIfNextPage}
      />

      <button className="error-button" onClick={handleErrorClick}>
        Create an error!
      </button>

      <div className="main__results-container">
        <ResultsSection
          isLoading={isLoading}
          characterResponse={characterResponse}
          ifNextPage={ifNextPage}
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
