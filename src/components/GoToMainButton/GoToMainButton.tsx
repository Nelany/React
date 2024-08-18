import { useNavigate } from 'react-router-dom';
import './GoToMainButton.scss';

export const GoToMainButton = () => {
  const navigate = useNavigate();

  const navigateToMain = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/', { replace: true });
  };

  return (
    <button className="go-to-main-button" onClick={navigateToMain}>
      Go to main page!
    </button>
  );
};
