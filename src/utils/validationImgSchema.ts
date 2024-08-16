import * as Yup from 'yup';

export const validationImgSchema = Yup.mixed()
  .test(
    'fileSize',
    'File too large',
    (value) => value && (value as File).size <= 10 * 1024 * 1024
  )
  .test(
    'fileType',
    'Unsupported file format',
    (value) =>
      value && ['image/jpeg', 'image/png'].includes((value as File).type)
  );
