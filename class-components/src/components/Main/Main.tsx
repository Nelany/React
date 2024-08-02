'use client';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { PageProps } from '../../types/types';
import { Details } from '../Details/Details';
import { ResultsSection } from '../ResultSection/ResultsSection';
import { SearchSection } from '../SearchSection/SearchSection';

const Main = ({ characterId, currentPage }: PageProps) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { id } = characterId ? { id: characterId } : router.query;
  const location = router.asPath;
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const page = currentPage || searchParams.get('page') || '1';

  const [isError, setIsError] = useState<boolean>(false);

  const handleErrorClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('I crashed!');
  }

  const closeDetails = () => {
    router.push(`/?page=${page}`, { scroll: false });
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
      <SearchSection />
      <div className="main__buttons-container">
        <button className={buttonClasses} onClick={handleErrorClick}>
          Create an error!
        </button>
        <button className={buttonClasses}>Toggle Theme: {theme}</button>
      </div>
      <div className="main__results-container">
        <ResultsSection />
        <div onClick={onClick} className={outletClasses}>
          <Details />
        </div>
      </div>
    </div>
  );
};

export default Main;
