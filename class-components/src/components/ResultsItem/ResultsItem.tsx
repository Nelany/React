import { useLocation, useNavigate } from 'react-router-dom';
import { Character } from '../../types/types';
import './ResultsItem.scss';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  name: string;
  character: Character;
}

export const ResultsItem = ({ name, character }: Props) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || '1';

  const openCheckedId = (e: React.MouseEvent) => {
    e.stopPropagation();
    searchParams.set('page', String(page));
    navigate(`/details/${character.id}/?${searchParams.toString()}`);
  };

  return (
    <div
      data-testid="results-item"
      onClick={openCheckedId}
      className={`results-item ${theme}`}
    >
      <img className="result-img" src={character.image} alt="img"></img>
      <button className={`select-button unselected ${theme}`}>✓</button>
      <div>
        <h2 className={theme}>{name}</h2>

        <h4>{`Status: ${character.status}`}</h4>
        <h4>{`Species: ${character.species}`}</h4>
        {character.type && <h4>{`Type: ${character.type}`}</h4>}
        <h4>{`Last known location: ${character.location.name}`}</h4>
      </div>
    </div>
  );
};
