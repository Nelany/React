import { useNavigate } from 'react-router-dom';
import './GoToMainButton.scss';
import { toggleIfReturnToRickNMorty } from '../../store/ifReturnToRickNMortySlice';
import { useDispatch } from 'react-redux';

interface GoToMainButtonProps {
  needRefresh?: boolean;
}

export const GoToMainButton = ({ needRefresh }: GoToMainButtonProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToMain = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem('searchQuery', '');
    navigate('/', { replace: true });

    if (needRefresh) {
      dispatch(toggleIfReturnToRickNMorty());
    }
  };

  return (
    <button className="go-to-main-button" onClick={navigateToMain}>
      Return to Rick and Morty!
    </button>
  );
};
