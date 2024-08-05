'use client';
import classNames from 'classnames';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Details } from '../Details/Details';
import { ResultsSection } from '../ResultSection/ResultsSection';
import { SearchSection } from '../SearchSection/SearchSection';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const Main = () => {
  const { theme, toggleTheme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const [isError, setIsError] = useState<boolean>(false);
  const ifReturnToRickNMorty = useSelector(
    (state: RootState) => state.ifReturnToRickNMorty.value
  );

  const handleErrorClick = () => {
    setIsError(true);
  };

  const handleToggleTheme = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleTheme();
  };

  if (isError) {
    throw new Error('I crashed!');
  }

  const closeDetails = () => {
    router.push(`/?page=${page}`);
  };

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const mainClasses = classNames('main', theme);
  const buttonClasses = classNames('error-button', theme);
  const outletClasses = classNames('main__outlet', {
    'main__outlet-hidden': !id,
  });

  return (
    <div data-testid="main-page" onClick={closeDetails} className={mainClasses}>
      <img
        className="rick-morty-img"
        src="/rickmorty.png"
        alt="Rick and Morty"
      />
      <img
        className="rick-morty-img rick-morty-img-reverse"
        src="/rickmorty.png"
        alt="Rick and Morty"
      />
      <h1 className="main__tittle">Rick and Morty</h1>
      <SearchSection key={String(ifReturnToRickNMorty)} />
      <div className="main__buttons-container">
        <button className={buttonClasses} onClick={handleErrorClick}>
          Create an error!
        </button>
        <button
          className={buttonClasses}
          onClick={(e: React.MouseEvent) => handleToggleTheme(e)}
        >
          Toggle Theme: {theme}
        </button>
      </div>
      <div className="main__results-container">
        <ResultsSection />
        <div onClick={onClick} className={outletClasses}>
          {id && <Details />}
        </div>
      </div>
    </div>
  );
};

export default Main;
