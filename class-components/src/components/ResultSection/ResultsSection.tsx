import { ResultsItem } from '../ResultsItem/ResultsItem';
import { CharacterResponse } from '../../types/types';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  characterResponse: CharacterResponse | null;
  isLoading: boolean;
  ifNextPage: boolean;
  setIfReturnToRickNMorty?: Dispatch<SetStateAction<boolean>>;
}

export const ResultsSection = ({
  characterResponse,
  isLoading,
  ifNextPage,
  setIfReturnToRickNMorty,
}: Props) => {
  return (
    <div className="section results-section">
      <h3>Results:</h3>
      <Loader
        setIfReturnToRickNMorty={setIfReturnToRickNMorty}
        isLoading={isLoading}
        response={characterResponse || {}}
      />

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
