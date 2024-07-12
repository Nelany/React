import { ResultsItem } from './ResultsItem/ResultsItem';
import { CharacterResponse } from '../types/types';
import { Loader } from './Loader/Loader';
import { Pagination } from './Pagination/Pagination';

interface Props {
  characterResponse: CharacterResponse | null;
  isLoading: boolean;
  ifNextPage: boolean;
}

export const ResultsSection = ({
  characterResponse,
  isLoading,
  ifNextPage,
}: Props) => {
  console.log(characterResponse);

  return (
    <div className="section results-section">
      <h3>Results:</h3>
      <Loader isLoading={isLoading} response={characterResponse || {}} />

      {!isLoading && characterResponse?.results && (
        <>
          {characterResponse.results.map((character) => (
            <ResultsItem
              key={character.id}
              name={character.name}
              character={character}
            />
          ))}
          <Pagination ifNextPage={ifNextPage} />
        </>
      )}
    </div>
  );
};
