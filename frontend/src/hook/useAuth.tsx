import {
  UseMutationResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import React, { PropsWithChildren, useState } from 'react';
import { getSession, logout } from '../services/user';
import { useCookies } from 'react-cookie';
import { AxiosError } from 'axios';
import { toastError } from '../lib/toast';
import { useNavigate } from 'react-router-dom';
interface IUser {
  email: string;
  username: string;
  authenticated: boolean;
}
interface IAuthContext {
  user: {
    email: string;
    username: string;
    authenticated: boolean;
  };
  isLoadingSession: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}
const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

type ErrorType = {
  message: string;
};
// nao tem cookies e tenho usuario = faz nada
// tenho cookie e nao tenho usuario = busca
export function AuthProvider({ children }: PropsWithChildren) {
  const [cookies, setCookie, removeToken] = useCookies(['user_session']);
  const [user, setUser] = React.useState<IUser>({
    email: '',
    username: '',
    authenticated: false,
  } as IUser);
  // caso dê refresh na pagina
  const isRefetch =
    cookies.user_session && user.authenticated === false ? true : false;
  console.log('isfetch...', isRefetch);
  console.log('cookies.user_session...', cookies.user_session);
  console.log('user.authenticated ...', user.authenticated);

  const { isFetching: isLoadingSession } = useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    enabled: isRefetch,
    onSuccess: (data: IUser) => {
      setUser({
        username: data.username,
        email: data.email,
        authenticated: data.authenticated,
      });
    },
    onError: (error: AxiosError<ErrorType>) => {
      console.log('error', error);
      removeToken('user_session');
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

  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }
  return context;
}
