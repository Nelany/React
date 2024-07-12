import { useNavigate } from 'react-router-dom';
import './GoToMainButton.scss';

export const GoToMainButton = () => {
  const navigate = useNavigate();

  const navigateToMain = () => {
    localStorage.setItem('searchQuery', '');
    navigate('/');
    window.location.reload();
  };

  return (
    <button className="go-to-main-button" onClick={navigateToMain}>
      Return to Rick and Morty!
    </button>
  );
};
