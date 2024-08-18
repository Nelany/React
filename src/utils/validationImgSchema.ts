import * as Yup from 'yup';

export const validationImgSchema = Yup.mixed<File>()
  .test('file', 'Please choose a file', (value) => {
    return Boolean(value);
  })
  .test('fileSize', 'File too large', (value) => {
    if (value) {
      return value.size <= 10 * 1024 * 1024;
    }

    return true;
  })
  .test('fileType', 'Unsupported file format', (value) =>
    value ? ['image/jpeg', 'image/png'].includes(value.type) : true
  );
