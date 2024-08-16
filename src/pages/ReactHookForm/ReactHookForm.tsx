import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { setReactHookImg } from '../../store/ReactHookImgSlice';
import { ReactHookFormData, FormData } from '../../types/FormDataTypes';
import { readFileAsDataURL } from '../../utils/readFileAsDataURL';
import { validationFormSchema } from '../../utils/validationFormSchema';
import { validationImgSchema } from '../../utils/validationImgSchema';
import { setReactHookFormData } from '../../store/ReactHookFormSlice';

export const ReactHookForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);
  const [imgState, setImgState] = useState<string | null>(null);
  const [imgError, setImgError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ReactHookFormData>({
    resolver: yupResolver(validationFormSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ReactHookFormData> = async (data) => {
    try {
      if (data.picture) {
        const pictureDataURL = await readFileAsDataURL(data.picture[0]);
        const updatedFormData: FormData = {
          ...data,
          picture: pictureDataURL,
          age: data.age?.toString() || '',
        };

        dispatch(setReactHookFormData(updatedFormData));
        navigate(`/`);
      }
    } catch (error) {
      setImgError('Failed to read the image file');
    }
  };

  const { onChange, onBlur, name, ref } = register('picture');

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(event);
    const file = event.target.files?.[0];

    if (file) {
      try {
        await validationImgSchema.validate(file);
        const base64 = await readFileAsDataURL(file);
        dispatch(setReactHookImg(base64));
        setImgState(base64);
        setImgError('');
      } catch (error) {
        if (error instanceof Error) {
          setImgError(error.message);
        } else {
          setImgError('An unknown error occurred');
        }
      }
    }
  };

  return (
    <div className="main">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__top-container">
          <h2>React Hook Form</h2>
          <div className="form__sections-container">
            <div className="form__section">
              <div className="form__field">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" {...register('name')} />
                <div className="form__error">{errors.name?.message}</div>
              </div>
              <div className="form__field">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  {...register('age', {
                    valueAsNumber: true,
                  })}
                />
                <div className="form__error">{errors.age?.message}</div>
              </div>
              <div className="form__field">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  list="country-list"
                  {...register('country')}
                />
                <datalist id="country-list">
                  {countries.map((country) => (
                    <option key={country} value={country} />
                  ))}
                </datalist>
                <div className="form__error">{errors.country?.message}</div>
              </div>
              <div className="form__field">
                <label htmlFor="gender">Gender:</label>
                <select id="gender" {...register('gender')}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="form__error">{errors.gender?.message}</div>
              </div>
            </div>

            <div className="form__section">
              <div className="form__field">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" {...register('email')} />
                <div className="form__error">{errors.email?.message}</div>
              </div>
              <div className="form__field">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  {...register('password')}
                />
                <div className="form__error">{errors.password?.message}</div>
              </div>
              <div className="form__field">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword')}
                />
                <div className="form__error">
                  {errors.confirmPassword?.message}
                </div>
              </div>

              <div className="form__field">
                <label htmlFor="picture">Upload Picture:</label>
                <input
                  className="form__file"
                  type="file"
                  id="picture"
                  name={name}
                  onBlur={onBlur}
                  ref={ref}
                  onChange={handleFileChange}
                />
                <button
                  className="form__file-button"
                  type="button"
                  onClick={() => document.getElementById('picture')?.click()}
                >
                  Select
                </button>
                <div className="form__error">{errors.picture?.message}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="form__bottom-container">
          <div className="form__preview">
            {imgError && <div className="form__img-error">{imgError}!</div>}
            {!imgError && (
              <img
                className="form__img"
                src={imgState ? imgState : '/img.png'}
                alt="Preview"
              />
            )}
          </div>

          <div className="form__submit-container">
            <div className="form__field form__field--centered">
              <label htmlFor="terms">Accept Terms and Conditions:</label>
              <input
                className="form__checkbox-real"
                type="checkbox"
                id="terms"
                {...register('terms')}
              />
              <label className="form__checkbox" htmlFor="terms"></label>
              <div className="form__error">{errors.terms?.message}</div>
            </div>
            <button
              className="form__button-submit"
              type="submit"
              disabled={!isValid}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
