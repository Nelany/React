import { ResultsItem } from '../ResultsItem/ResultsItem';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import './ResultsSection.scss';
import { useTheme } from '../../hooks/useTheme';
import { Toast } from '../Toast/Toast';
import { useIsCharLoading } from '../../store/charactersLoadingSlice';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export const ResultsSection = () => {
  const characterResponse = useSelector(
    (state: RootState) => state.charactersResponse.data
  );
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
          <Pagination />
        </>
      )}
    </div>
  );
};
