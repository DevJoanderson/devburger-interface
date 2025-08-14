import { createBrowserRouter } from 'react-router-dom';
import { Register, Login, Menu, Cart, Home } from '../containers';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Register />,
  },
  {
    path: '/cardapio',
    element: (
      <>
        <Header />
        <Menu />
      </>
    ),
  },
  {
    path: '/carrinho',
    element: <Cart />
  }
]);
