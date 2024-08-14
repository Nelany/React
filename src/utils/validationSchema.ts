import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .transform((value, originalValue) =>
      originalValue.trim() === '' ? null : value
    )
    .nullable()
    .positive('Age must be a positive number')
    .required('Age is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must be strong'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.string().required('Gender is required'),
  terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  // picture: Yup.mixed()
  //   .test(
  //     'fileSize',
  //     'File too large',
  //     (value) => value && (value as File).size <= 1024 * 1024
  //   )
  //   .test(
  //     'fileType',
  //     'Unsupported file format',
  //     (value) =>
  //       value && ['image/jpeg', 'image/png'].includes((value as File).type)
  //   ),
  country: Yup.string().required('Country is required'),
});