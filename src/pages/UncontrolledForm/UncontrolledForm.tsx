import { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Errors } from '../../types/ErrorsTypes';
import { validationSchema } from '../../utils/validationSchema';
import './Form.scss';
import { setUncontrolledFormData } from '../../store/UncontrolledFormSlice';

export const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);
  const [errors, setErrors] = useState<Errors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const formData = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      // picture: pictureRef.current?.files?.[0] || null,
      picture: '',
      country: countryRef.current?.value || '',
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // const reader = new FileReader();

      // if (formData.picture) {
      //   reader.onloadend = () => {
      //     console.log(reader.result);
      //   };

      //   reader.readAsDataURL(formData.picture);
      // }

      dispatch(setUncontrolledFormData(formData));

      console.log('Form submitted:', formData);
    } catch (validationErrors) {
      const formattedErrors = (
        validationErrors as { inner: { path: string; message: string }[] }
      ).inner.reduce(
        (acc, error) => {
          acc[error.path] = error.message;

          return acc;
        },
        {} as Record<string, string>
      );
      setErrors(formattedErrors);
    }
  };

  const handleFileClick = () => {
    pictureRef.current?.click();
  };

  return (
    <div className="main">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__top-container">
          <h2>Uncontrolled Form</h2>
          <div className="form__sections-container">
            <div className="form__section">
              <div className="form__field">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" ref={nameRef} />
                <div className="form__error">{errors.name && errors.name}</div>
              </div>
              <div className="form__field">
                <label htmlFor="age">Age:</label>
                <input type="number" id="age" ref={ageRef} />
                <div className="form__error">{errors.age && errors.age}</div>
              </div>
              <div className="form__field">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  ref={countryRef}
                  list="country-list"
                />
                <datalist id="country-list">
                  {countries.map((country) => (
                    <option key={country} value={country} />
                  ))}
                </datalist>
                <div className="form__error">
                  {errors.country && errors.country}
                </div>
              </div>
              <div className="form__field">
                <label htmlFor="gender">Gender:</label>
                <select id="gender" ref={genderRef}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="form__error">
                  {errors.gender && errors.gender}
                </div>
              </div>
            </div>

            <div className="form__section">
              <div className="form__field">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" ref={emailRef} />
                <div className="form__error">
                  {errors.email && errors.email}
                </div>
              </div>
              <div className="form__field">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" ref={passwordRef} />
                <div className="form__error">
                  {errors.password && errors.password}
                </div>
              </div>
              <div className="form__field">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  ref={confirmPasswordRef}
                />
                <div className="form__error">
                  {errors.confirmPassword && errors.confirmPassword}
                </div>
              </div>

              <div className="form__field">
                <label htmlFor="picture">Upload Picture:</label>
                <input
                  className="form__file"
                  type="file"
                  id="picture"
                  ref={pictureRef}
                />
                <button
                  className="form__file-button"
                  type="button"
                  onClick={handleFileClick}
                >
                  Select
                </button>
                <div className="form__error">
                  {errors.picture && errors.picture}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form__bottom-container">
          <div className="form__field form__field--centered">
            <label htmlFor="terms">Accept Terms and Conditions:</label>
            <input
              className="form__checkbox-real"
              type="checkbox"
              id="terms"
              ref={termsRef}
            />
            <label className="form__checkbox" htmlFor="terms"></label>
            <div className="form__error">{errors.terms && errors.terms}</div>
          </div>
          <button className="form__button-submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
