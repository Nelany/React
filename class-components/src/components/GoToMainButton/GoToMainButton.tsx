import { useNavigate } from '@remix-run/react';
import { toggleIfReturnToRickNMorty } from '../../store/ifReturnToRickNMortySlice';
import { useDispatch } from 'react-redux';

interface GoToMainButtonProps {
  needRefresh?: boolean;
}

export const GoToMainButton = ({ needRefresh }: GoToMainButtonProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToMain = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem('searchQuery', '');
    navigate('/');

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
