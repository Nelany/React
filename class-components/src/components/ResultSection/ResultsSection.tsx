import { ResultsItem } from '../ResultsItem/ResultsItem';
import { CharacterResponse } from '../../types/types';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import './ResultsSection.scss';
import { useTheme } from '../../hooks/useTheme';
import { Toast } from '../Toast/Toast';
import { useIsCharLoading } from '../../store/charactersLoadingSlice';

interface Props {
  characterResponse: CharacterResponse | null;
  ifNextPage: boolean;
}

export const ResultsSection = ({ characterResponse, ifNextPage }: Props) => {
  const isCharLoading = useIsCharLoading();
  const { theme } = useTheme();

  return (
    <div className={`section results-section ${theme}`}>
      <h3>Results:</h3>
      <Loader
        isLoading={isCharLoading}
        isError={Boolean(characterResponse?.error)}
        needRefresh={true}
      />

      {!isCharLoading && characterResponse?.results && (
        <>
          {characterResponse.results.map((character) => (
            <ResultsItem
              key={character.id}
              name={character.name}
              character={character}
            />
          ))}
          <Toast />
          <Pagination ifNextPage={ifNextPage} />
        </>
      )}
    </div>
  );
};
