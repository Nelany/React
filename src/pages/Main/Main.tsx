import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormResult } from '../../components/FormResult/FormResult';
import { RootState } from '../../store/store';
import './Main.scss';

export const Main = () => {
  const navigate = useNavigate();
  const uncontrolledFormData = useSelector(
    (state: RootState) => state.uncontrolledFormData.uncontrolledFormData
  );

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

      <div className="main__results-container">
        <div className="main__result">
          <FormResult formData={uncontrolledFormData} />
        </div>
        <div className="main__result">
          <FormResult formData={null} />
        </div>
      </div>
    </div>
  );
};
