export type LoginUserDTO = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  token: string;
  user: {
    email: string;
    username: string;
  };
};
