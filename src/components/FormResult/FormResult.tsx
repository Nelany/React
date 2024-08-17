import { FormData } from '../../types/FormDataTypes';
interface FormResultProps {
  formData: FormData | null;
  name: string;
  className: string;
}

export const FormResult = ({ formData, name, className }: FormResultProps) => {
  return (
    <div className={`form form--main ${className}`}>
      <div className="form__top-container">
        <h2>{name}</h2>
        <div className="form__sections-container">
          <div className="form__section">
            <div className="form__field form__field--main">
              <div>Name:</div>
              <div className="form__data-item">{formData?.name}</div>
            </div>
            <div className="form__field form__field--main">
              <div>Age:</div>
              <div className="form__data-item">{formData?.age}</div>
            </div>
            <div className="form__field form__field--main">
              <div>Country:</div>
              <div className="form__data-item">{formData?.country}</div>
            </div>
            <div className="form__field form__field--main">
              <div>Gender:</div>
              <div className="form__data-item">{formData?.gender}</div>
            </div>
            <div className="form__field form__field--main form__field form__field--main--main">
              <div>Image:</div>
            </div>
          </div>

          <div className="form__section">
            <div className="form__field form__field--main">
              <div>Email:</div>
              <div className="form__data-item">{formData?.email}</div>
            </div>
            <div className="form__field form__field--main">
              <div>Password:</div>
              <div className="form__data-item">{formData?.password}</div>
            </div>
            <div className="form__field form__field--main">
              <div>Confirm Password:</div>
              <div className="form__data-item">{formData?.confirmPassword}</div>
            </div>

            <div className="form__field form__field--main">
              <div>Accept Terms and Conditions:</div>
              <div className="form__data-item">{`${formData?.terms || ''}`}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="form__bottom-container">
        <div className="form__preview form__preview--main">
          <img
            className="form__img"
            src={formData?.picture ? formData?.picture : '/img.png'}
            alt="Preview"
          />
        </div>
      </div>
    </div>
  );
};
