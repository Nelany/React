import * as Yup from 'yup';
import { ReactHookFormData } from '../types/FormDataTypes';

export const validationFormSchema = Yup.object<ReactHookFormData>().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .positive('Age must be a positive number')
    .required('Age is required'),
  country: Yup.string().required('Country is required'),
  gender: Yup.string().required('Gender is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]+$/,
      'Password must be strong'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  picture: Yup.mixed<FileList>()
    .test('file', 'Please choose a file', (value) => {
      if (value) {
        return Boolean(value[0]);
      }
    })
    .test('fileSize', 'File too large', (value) => {
      if (value?.[0]) {
        return value[0]?.size <= 10 * 1024 * 1024;
      }

      return true;
    })

    .test('fileType', 'Unsupported file format', (value) =>
      value?.[0] ? ['image/jpeg', 'image/png'].includes(value[0]?.type) : true
    ),
  terms: Yup.bool()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('Terms are required'),
});
