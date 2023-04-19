import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Navigate,
  RouteProps,
} from 'react-router-dom';
import { Cart } from './components/cart';
import { Sidebar } from './components/sidebar';
import { path } from './constants';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Signup } from './pages/signup';
import { Grid } from './shared-styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Profile2 } from './pages/profile2';
import { AuthProvider, useAuth } from './hook/useAuth';

interface IRouteProps {
  element: React.ReactElement;
}

const queryClient = new QueryClient();
const PrivateRoute: React.FC<IRouteProps> = ({ element }) => {
  const { user } = useAuth();

  return user.authenticated ? element : <Navigate to="/" replace />;
};

const PublicRoute: React.FC<IRouteProps> = ({ element }) => {
  const { user, isLoadingSession } = useAuth();

  return isLoadingSession ? (
    <span>carregando...</span>
  ) : user.authenticated ? (
    <Navigate to="/" replace />
  ) : (
    element
  );
};
const AppLayout = () => {
  return (
    <Grid>
      <Sidebar />
      <Outlet />
    </Grid>
  );
};
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: path.HOME,
        element: <Home />,
      },
      {
        path: path.PROFILE,
        element: <PrivateRoute element={<Profile />} />,
      },
    ],
  },
  {
    path: path.LOGIN,
    element: <PublicRoute element={<Login />} />,
  },
  {
    path: path.SIGNUP,
    element: <PublicRoute element={<Signup />} />,
  },
]);
export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

{
  /* <Grid fullCart={!!cartGlobal.length}>
      {sidebar()}
      {main()}
      {Cart()}
    </Grid> */
}
