import { useMutation, useQuery } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';
import { getProfile, login } from '../services/user';
import { useCookies } from 'react-cookie';
import { toastError } from '../lib/toast';
import { AxiosError } from 'axios';

const AuthContext = React.createContext<any>({});
interface IUser {
  email: string;
  username: string;
  authenticated: boolean;
}
type Request = {
  email: string;
  password: string;
};

type ErrorType = {
  message: string;
};
// nao tem cookies e tenho usuario = faz nada
// tenho cookie e nao tenho usuario = busca
export function AuthProvider({ children }: PropsWithChildren) {
  const [cookies, setCookie] = useCookies(['user_session']);
  const [user, setUser] = React.useState<IUser>({
    email: '',
    username: '',
    authenticated: false,
  } as IUser);

  const isRefetch =
    cookies.user_session && user.authenticated === false ? true : false;

  const { isFetching: isLoadingSession } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: isRefetch,
    onSuccess: (data: Omit<IUser, 'autheticated'>) => {
      setUser({
        username: data.username,
        email: data.email,
        authenticated: true,
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoadingSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  return context;
}
