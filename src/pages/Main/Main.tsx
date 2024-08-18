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
  const reactHookFormData = useSelector(
    (state: RootState) => state.reactHookFormData.reactHookFormData
  );
  const formType = useSelector((state: RootState) => state.formType.formType);

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
          {uncontrolledFormData.length > 0 ? (
            uncontrolledFormData
              .slice()
              .reverse()
              .map((data, index) => (
                <FormResult
                  key={index}
                  formData={data}
                  name="Uncontrolled Form"
                  className={
                    index === 0 && formType === 'Uncontrolled Form'
                      ? 'latest-added'
                      : ''
                  }
                />
              ))
          ) : (
            <FormResult
              formData={null}
              name="Uncontrolled Form"
              className={''}
            />
          )}
        </div>
        <div className="main__result">
          {reactHookFormData.length > 0 ? (
            reactHookFormData
              .slice()
              .reverse()
              .map((data, index) => (
                <FormResult
                  key={index}
                  formData={data}
                  name="React Hook Form"
                  className={
                    index === 0 && formType === 'React Hook Form'
                      ? 'latest-added'
                      : ''
                  }
                />
              ))
          ) : (
            <FormResult formData={null} name="React Hook Form" className={''} />
          )}
        </div>
      </div>
    </div>
  );
};
