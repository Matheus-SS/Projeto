import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Cart } from './components/cart';
import { Sidebar } from './components/sidebar';
import { routes } from './constants';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Signup } from './pages/signup';
import { Grid } from './shared-styles';

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
        path: routes.HOME,
        element: <Home />,
      },
      {
        path: routes.PROFILE,
        element: <Profile />,
      },
    ],
  },
  {
    path: routes.LOGIN,
    element: <Login />,
  },
  {
    path: routes.SIGNUP,
    element: <Signup />,
  },
]);
export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

{
  /* <Grid fullCart={!!cartGlobal.length}>
      {sidebar()}
      {main()}
      {Cart()}
    </Grid> */
}
