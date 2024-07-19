import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import './Toast.scss';
import { removeAllSelectedCharacters } from '../../store/selectedCharactersSlice';
import { RootState } from '../../store/store';

export const Toast = () => {
  const { theme } = useTheme();

  const dispatch = useDispatch();
  const selectedCharacters = useSelector(
    (state: RootState) => state.selectedCharacters.data
  );
  const numberOfSelectedCharacters = Object.keys(selectedCharacters).length;

  const handleUnselectAll = () => {
    dispatch(removeAllSelectedCharacters());
  };

  return (
    <div
      className={`toast ${theme} ${numberOfSelectedCharacters ? '' : 'hidden'}`}
    >
      <h3>{numberOfSelectedCharacters} items are selected!</h3>
      <div className="toast__buttons-container">
        <button onClick={handleUnselectAll}>Unselect all</button>
        <button>Download</button>
      </div>
    </div>
  );
};
