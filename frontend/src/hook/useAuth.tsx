import { useQuery } from '@tanstack/react-query';
import React, { PropsWithChildren, useState } from 'react';
import { getSession } from '../services/user';
import { AxiosError } from 'axios';
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
