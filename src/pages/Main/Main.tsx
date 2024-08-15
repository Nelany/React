import { useNavigate } from 'react-router-dom';
import './Main.scss';

export const Main = () => {
  const navigate = useNavigate();

  const openUncontrolledForm = () => {
    navigate(`/UncontrolledForm`);
  };

  const openReactHookForm = () => {
    navigate(`/ReactHookForm`);
  };

  return (
    <div data-testid="main-page" className="main">
      <h1 className="main__tittle">FORMS</h1>
      <div className="main__buttons-container">
        <button className="go-form-button" onClick={openUncontrolledForm}>
          Uncontrolled Form!
        </button>
        <button className="go-form-button" onClick={openReactHookForm}>
          React Hook Form!
        </button>
      </div>
    </div>
  );
};
