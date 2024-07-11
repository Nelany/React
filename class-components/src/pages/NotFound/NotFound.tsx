import { GoToMainButton } from '../../components/GoToMainButton/GoToMainButton';
import './NotFound.scss';

export const NotFound = () => {
  return (
    <div className="error-content-container">
      <h1 className="error-content">Ooops... Page not found!</h1>
      <img className="error-img" src="/cat.png" alt="Cat" />
      <GoToMainButton />
    </div>
  );
};
