import { Character, CharacterResponse } from '../../types/types';
import { GoToMainButton } from '../GoToMainButton/GoToMainButton';
import './Loader.scss';

type Props = { isLoading: boolean; response: CharacterResponse | Character };

export const Loader = ({ isLoading, response }: Props) => {
  return (
    <>
      {isLoading && (
        <div className="spinner-container">
          <img className="spinner" src="/spinner.png" alt="Loading..." />
        </div>
      )}
      {!isLoading && response?.error && (
        <>
          <h4 className="error-message">There is nothing here!</h4>
          <GoToMainButton />
        </>
      )}
    </>
  );
};
