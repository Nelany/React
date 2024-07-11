import { ResultsItem } from './ResultsItem';
import { CharacterResponse } from '../types/types';

interface Props {
  characterResponse: CharacterResponse | null;
  isLoading: boolean;
}

export const ResultsSection = ({ characterResponse, isLoading }: Props) => {
  return (
    <div className="section results-section">
      <h3>Results:</h3>
      {isLoading && (
        <div className="spinner-container">
          <img className="spinner" src="./spinner.png" alt="Loading..." />
        </div>
      )}
      {!isLoading && characterResponse?.error && (
        <h4>{`${characterResponse.error}!`}</h4>
      )}
      {!isLoading &&
        characterResponse?.results &&
        characterResponse.results.map((character) => (
          <ResultsItem
            key={character.id}
            name={character.name}
            character={character}
          />
        ))}
    </div>
  );
};
