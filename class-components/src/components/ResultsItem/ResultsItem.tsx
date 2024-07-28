import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { setSelectedCharacters } from '../../store/characterSlice';
import { RootState } from '../../store/store';
import { Character } from '../../types/types';

interface Props {
  name: string;
  character: Character;
}

export const ResultsItem = ({ name, character }: Props) => {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const isSelected = useSelector(
    (state: RootState) => !!state.characters.selectedCharacters[character.id]
  );

  const handleSelectButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch(setSelectedCharacters(character));
  };

  const openCheckedId = (e: React.MouseEvent) => {
    e.stopPropagation();
    const page = router.query.page || '1';
    const searchParams = new URLSearchParams();
    searchParams.set('page', String(page));
    router.push(
      `/details/${character.id}/?${searchParams.toString()}`,
      undefined,
      { scroll: false }
    );
  };

  const resultsItemClasses = classNames('results-item', theme);
  const selectButtonClasses = classNames('select-button', theme, {
    unselected: !isSelected,
  });

  return (
    <div
      data-testid="results-item"
      onClick={openCheckedId}
      className={resultsItemClasses}
    >
      <img className="result-img" src={character.image} alt="img"></img>
      <button onClick={handleSelectButtonClick} className={selectButtonClasses}>
        ✓
      </button>
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
