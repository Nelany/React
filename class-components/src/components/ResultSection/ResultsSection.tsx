import { ResultsItem } from '../ResultsItem/ResultsItem';
import { CharacterResponse } from '../../types/types';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import './ResultsSection.scss';
import { useTheme } from '../../hooks/useTheme';

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
  const { theme } = useTheme();

  return (
    <div className={`section results-section ${theme}`}>
      <h3>Results:</h3>
      <Loader
        isLoading={isLoading}
        isError={Boolean(characterResponse?.error)}
        needRefresh={true}
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
