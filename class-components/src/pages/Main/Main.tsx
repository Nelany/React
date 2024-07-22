import './Main.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { ResultsSection } from '../../components/ResultSection/ResultsSection';
import { SearchSection } from '../../components/SearchSection/SearchSection';
import { useTheme } from '../../hooks/useTheme';
import { RootState } from '../../store/store';

export const Main = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
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
    navigate(`/?${searchParams.toString()}`);
  };

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      data-testid="main-page"
      onClick={closeDetails}
      className={`main ${theme}`}
    >
      <ScrollRestoration />
      <img className="rick-morty-img" src="/rickmorty.png" alt="" />
      <img
        className="rick-morty-img rick-morty-img-reverse"
        src="/rickmorty.png"
        alt="Rick and Morty"
      />

      <h1 className="main__tittle">Rick and Morty</h1>
      <SearchSection key={String(ifReturnToRickNMorty)} />

      <div className="main__buttons-container">
        <button className={`error-button ${theme}`} onClick={handleErrorClick}>
          Create an error!
        </button>
        <button className={`error-button ${theme}`} onClick={toggleTheme}>
          Toggle Theme:{theme}
        </button>
      </div>

      <div className="main__results-container">
        <ResultsSection />

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
