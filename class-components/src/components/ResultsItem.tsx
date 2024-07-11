import { Character } from '../types/types';

interface Props {
  name: string;
  character: Character;
}

export const ResultsItem = ({ name, character }: Props) => {
  return (
    <div className="results-item">
      <img className="result-img" src={character.image} alt="img" />
      <div>
        <h2>{name}</h2>
        <h4>{`Status: ${character.status}`}</h4>
        <h4>{`Species: ${character.species}`}</h4>
        {character.type && <h4>{`Type: ${character.type}`}</h4>}
        <h4>{`Last known location: ${character.location.name}`}</h4>
      </div>
    </div>
  );
};
