import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
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
import { AuthProvider, useAuth } from './hook/useAuth';
import { CartProvider, useCart } from './hook/useCart';
import { Loader } from './components/loader';
import { Text } from './components/Text';

interface IRouteProps {
  element: React.ReactElement;
}

export const queryClient = new QueryClient();

const PrivateRoute: React.FC<IRouteProps> = ({ element }) => {
  const { user } = useAuth();

  return user.email ? element : <Navigate to="/" replace />;
};

const PublicRoute: React.FC<IRouteProps> = ({ element }) => {
  const { user } = useAuth();

  return user.email ? <Navigate to="/" replace /> : element;
};
const AppLayout = () => {
  const { isFetchingSession } = useAuth();
  const { isOpen } = useCart();
  return isFetchingSession ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Loader />
      <Text style={{ marginTop: '15px' }} size={20}>
        Carregando
      </Text>
    </div>
  ) : (
    <Grid fullCart={isOpen}>
      <Sidebar />
      <Outlet />
      <Cart />
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
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};
