import { Dispatch, SetStateAction } from 'react';
import { Character, CharacterResponse } from '../../types/types';
import { GoToMainButton } from '../GoToMainButton/GoToMainButton';
import './Loader.scss';

type Props = {
  isLoading: boolean;
  response: CharacterResponse | Character;
  setIfReturnToRickNMorty?: Dispatch<SetStateAction<boolean>>;
};

export const Loader = ({
  isLoading,
  response,
  setIfReturnToRickNMorty,
}: Props) => {
  return (
    <>
      {isLoading && (
        <div data-testid="loader" className="spinner-container">
          <img className="spinner" src="/spinner.png" alt="Loading..." />
        </div>
      )}
      {!isLoading && response?.error && (
        <>
          <h4 className="error-message">There is nothing here!</h4>
          <GoToMainButton setIfReturnToRickNMorty={setIfReturnToRickNMorty} />
        </>
      )}
    </>
  );
};
