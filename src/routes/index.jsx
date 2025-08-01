import { createBrowserRouter } from 'react-router-dom';

import { Home } from '../containers/Home';
import { Login } from '../containers/Login';
import { Register } from '../containers/Register';
import { Menu } from '../containers/Menu';
import AppProvider from '../hooks';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppProvider>
        <Home />
      </AppProvider>
    ),
  },
  {
    path: '/login',
    element: (
      <AppProvider>
        <Login />
      </AppProvider>
    ),
  },
  {
    path: '/cadastro',
    element: (
      <AppProvider>
        <Register />
      </AppProvider>
    ),
  },
  {
    path: '/cardapio',
    element: (
      <AppProvider>
        <Menu />
      </AppProvider>
    ),
  },
]);
