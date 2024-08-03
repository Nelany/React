'use client';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { useIsCharLoading } from '../../store/characterSlice';
import { RootState } from '../../store/store';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { ResultsItem } from '../ResultsItem/ResultsItem';
import { Toast } from '../Toast/Toast';

export const ResultsSection = () => {
  const characterResponse = useSelector(
    (state: RootState) => state.characters.charactersResponse
  );
  const isCharLoading = useIsCharLoading();
  const { theme } = useTheme();

  const resultsSectionClasses = classNames('section results-section', theme);

  return (
    <div className={resultsSectionClasses}>
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
