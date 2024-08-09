import { useNavigate, useParams, useSearchParams } from '@remix-run/react';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../store/store';
import { ResultsSection } from '../ResultSection/ResultsSection';
import { SearchSection } from '../SearchSection/SearchSection';

interface MainProps {
  children?: ReactNode;
}

const Main = ({ children }: MainProps) => {
  const { theme, toggleTheme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const [isError, setIsError] = useState<boolean>(false);
  const ifReturnToRickNMorty = useSelector(
    (state: RootState) => state.ifReturnToRickNMorty.value
  );

  const handleErrorClick = () => {
    setIsError(true);
  };

  const handleToggleTheme = async (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleTheme();
  };

  if (isError) {
    console.log('Error thrown in Main component');
    throw new Error('I crashed!');
  }

  const closeDetails = () => {
    navigate(`/?page=${page}`);
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
          {id && children}
        </div>
      </div>
    </div>
  );
};

export default Main;
