import { Route, Routes } from 'react-router-dom';
import { Register, Login, Menu, Cart, Home, CompletePayment, Checkout, Admin } from '../containers';
import { UserLayout } from '../layouts/UserLayouts';
import { AdminLayout } from '../layouts/AdminLayout';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/complete" element={<CompletePayment />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Admin />} />     {/* /admin */}
        <Route path="home" element={<Admin />} /> {/* /admin/home */}
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

    </Routes>
  )
}

