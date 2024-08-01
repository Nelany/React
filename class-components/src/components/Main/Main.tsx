import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../store/store';
import { ResultsSection } from '../ResultSection/ResultsSection';
import { SearchSection } from '../SearchSection/SearchSection';

const Main = ({ children }: { children: ReactNode }) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const location = router.asPath;
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const page = searchParams.get('page') || '1';
  const ifReturnToRickNMorty = useSelector(
    (state: RootState) => state.ifReturnToRickNMorty.value
  );

  const [isError, setIsError] = useState<boolean>(false);

  const handleErrorClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('I crashed!');
  }

  const closeDetails = () => {
    searchParams.set('page', String(page));
    router.push(`/?${searchParams.toString()}`, undefined, { scroll: false });
  };

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const mainClasses = classNames('main', theme);
  const buttonClasses = classNames('error-button', theme);
  const outletClasses = classNames('main__outlet', {
    'main__outlet-hidden': !id,
  });

  if (router.pathname === '/404') {
    return <>{children}</>;
  }

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
        <button className={buttonClasses} onClick={toggleTheme}>
          Toggle Theme: {theme}
        </button>
      </div>
      <div className="main__results-container">
        <ResultsSection />
        <div onClick={onClick} className={outletClasses}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Main;
