type LoginProps = {
  email: string;
  password: string;
};

type SignupProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

type User = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
  id: string;
  createdAt: DateTime;
};
