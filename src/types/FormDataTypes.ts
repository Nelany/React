export interface FormData {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string | null;
  country: string;
}

export interface ReactHookFormData {
  name: string;
  age: number;
  country: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  picture?: FileList;
  terms: boolean;
}
