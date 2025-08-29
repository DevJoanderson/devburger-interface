import { Route, Routes } from 'react-router-dom';
import { Register, Login, Menu, Cart, Home, CompletePayment, Checkout, Orders, EditProduct, NewProduct, Products, } from '../containers';
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
        <Route path="/admin/pedidos" element={<Orders />}></Route>
        <Route path="/admin/editar-produto" element={<EditProduct />}></Route>
        <Route path="/admin/novo-produto" element={<NewProduct />}></Route>
        <Route path="/admin/produtos" element={<Products />}></Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

    </Routes>
  )
}

