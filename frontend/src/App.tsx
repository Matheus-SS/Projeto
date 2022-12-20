import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Cart } from './components/cart';
import { Sidebar } from './components/sidebar';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Profile } from './pages/profile';
import { Grid } from './styles';

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
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
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
