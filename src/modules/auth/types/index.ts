export interface SignInValues {
  phone_number: string;
  password: string;
}

export interface SignUpValues extends SignInValues {
  first_name: string;
  last_name: string;
  email: string;
}
