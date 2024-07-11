import { useNavigate } from 'react-router-dom';
import './GoToMainButton.scss';

export const GoToMainButton = () => {
  const navigate = useNavigate();

  const navigateToMain = () => {
    navigate('/');
  };

  return (
    <button className="go-to-main-button" onClick={navigateToMain}>
      Return to Rick and Morty!
    </button>
  );
};
