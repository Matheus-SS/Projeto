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
}

interface IUserSession {
  user: {
    email: string;
    username: string;
  };
}
interface IAuthContext {
  user: {
    email: string;
    username: string;
  };
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isFetchingSession: boolean;
}
const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

type ErrorType = {
  message: string;
};
// nao tem cookies e tenho usuario = faz nada
// tenho cookie e nao tenho usuario = busca
export function AuthProvider({ children }: PropsWithChildren) {
  const [allowFetch, setAllowFetch] = useState<boolean>(true);
  const [user, setUser] = React.useState<IUser>({
    email: '',
    username: '',
  } as IUser);

  const { isFetching: isFetchingSession } = useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    enabled: allowFetch,
    onSuccess: (data: IUserSession) => {
      setUser({
        username: data.user?.username || '',
        email: data.user?.email || '',
      });
      setAllowFetch(false);
    },
    onError: (error: AxiosError<ErrorType>) => {
      console.log('error', error);
      setAllowFetch(false);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isFetchingSession: isFetchingSession,
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
