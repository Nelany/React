import { useNavigate } from 'react-router-dom';
import './GoToMainButton.scss';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setIfReturnToRickNMorty?: Dispatch<SetStateAction<boolean>>;
};

export const GoToMainButton = ({ setIfReturnToRickNMorty }: Props) => {
  const navigate = useNavigate();

  const navigateToMain = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem('searchQuery', '');
    navigate('/', { replace: true });

    if (setIfReturnToRickNMorty) {
      setIfReturnToRickNMorty((prev: boolean) => !prev);
    }
  };

  return (
    <button className="go-to-main-button" onClick={navigateToMain}>
      Return to Rick and Morty!
    </button>
  );
};
