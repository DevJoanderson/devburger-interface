import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { router } from './routes';
import GlobalStyles from './styles/globalStyles';

import { UserProvider } from './hooks/UserContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <GlobalStyles />
      <ToastContainer autoClose={2000} theme="colored" />
    </UserProvider>
  </React.StrictMode>
);
