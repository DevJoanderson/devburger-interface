import { UserProvider } from './UserContext';
import { CartProvider } from './CartContext';

export default function AppProvider({ children }) {
  return (
    <UserProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </UserProvider>
  );
}
