import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext({});
const CART_KEY = 'devburger:cartInfo';

export function CartProvider({ children }) {
  // Hidrata do localStorage na criação
  const [cartProducts, setCartProducts] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Helper para salvar estado + localStorage SEM mutar
  const save = (updater) => {
    setCartProducts((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
  };

  const putProductInCart = useCallback((product) => {
    save((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        // cria novos objetos/array
        return prev.map((p, i) =>
          i === idx ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const clearCart = useCallback(() => save([]), []);

  const deleteProduct = useCallback((productId) => {
    save((prev) => prev.filter((p) => p.id !== productId)); // REMOVE correto
  }, []);

  const increaseProduct = useCallback((productId) => {
    save((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  }, []);

  const decreaseProduct = useCallback((productId) => {
    save((prev) => {
      const item = prev.find((p) => p.id === productId);
      if (!item) return prev;
      if (item.quantity > 1) {
        return prev.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        );
      }
      // se cair para 0, remove
      return prev.filter((p) => p.id !== productId);
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        putProductInCart,
        clearCart,
        deleteProduct,
        increaseProduct,
        decreaseProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
