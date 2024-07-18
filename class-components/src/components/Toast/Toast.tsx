import { useTheme } from '../../hooks/useTheme';
import './Toast.scss';

export const Toast = () => {
  const { theme } = useTheme();

  return (
    <div className={`toast ${theme}`}>
      <h3>3 items are selected!</h3>
      <div className="toast__buttons-container">
        <button>Unselect all</button>
        <button>Download</button>
      </div>
    </div>
  );
};
