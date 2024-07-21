import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import './Toast.scss';
import { removeAllSelectedCharacters } from '../../store/selectedCharactersSlice';
import { RootState } from '../../store/store';
import { useRef } from 'react';

export const Toast = () => {
  const linkRef = useRef(null);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const selectedCharacters = useSelector(
    (state: RootState) => state.selectedCharacters.data
  );
  const numberOfSelectedCharacters = Object.keys(selectedCharacters).length;

  const handleUnselectAll = () => {
    dispatch(removeAllSelectedCharacters());
  };

  const handleDownload = () => {
    const csvRows = ['Name, Description'];

    for (const id in selectedCharacters) {
      const character = selectedCharacters[id];
      csvRows.push(`${character.name}: ${JSON.stringify(character)}`);
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const fileName = `${numberOfSelectedCharacters}_characters.csv`;

    if (linkRef.current) {
      const linkElement = linkRef.current as HTMLAnchorElement;
      linkElement.href = url;
      linkElement.download = fileName;
      linkElement.click();
    }

    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`toast ${theme} ${numberOfSelectedCharacters ? '' : 'hidden'}`}
    >
      <h3>{numberOfSelectedCharacters} items are selected!</h3>
      <div className="toast__buttons-container">
        <button onClick={handleUnselectAll}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>

        <a ref={linkRef} className="none-link">
          Download
        </a>
      </div>
    </div>
  );
};
