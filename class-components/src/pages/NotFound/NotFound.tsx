import { GoToMainButton } from '../../components/GoToMainButton/GoToMainButton';
import { useTheme } from '../../hooks/useTheme';
import './NotFound.scss';

export const NotFound = () => {
  const { theme } = useTheme();

  return (
    <div className={`error-content-container ${theme}`}>
      <h1 className="error-content">Ooops... Page not found!</h1>
      <img className="error-img" src="/cat.png" alt="Cat" />
      <GoToMainButton />
    </div>
  );
};
