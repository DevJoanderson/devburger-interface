import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const putProductInCart = (product) => {
    const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id);

    let newProductsInCart = [];

    if (cartIndex >= 0) {
      newProductsInCart = cartProducts;

      newProductsInCart[cartIndex].quantity =
        newProductsInCart[cartIndex].quantity + 1;

      setCartProducts(newProductsInCart)
    } else {
      product.quantity = 1
      newProductsInCart = [...cartProducts, product];

      setCartProducts(newProductsInCart);
    }
    updateLocalStorage(newProductsInCart);
  }

  const clearCart = (productId) => {
    setCartProducts({});

    updateLocalStorage({});
  }

  const deleteProducts = (productId) => {
    const newCart = cartProducts.filter((prd) => prd.id === productId);


    setCartProducts(newCart);
    updateLocalStorage(newCart);
  }

  const increaseProducts = (productId) => {
    const newCart = cartProducts.map((prd) => {
      return prd.id === productId ? { ...prd, quantity: prd.quantity + 1 } : prd

    });
    setCartProducts(newCart);
    updateLocalStorage(newCart);
  }

  const descreaseProducts = (productId) => {
    const cartIndex = cartProducts.findIndex((prd) => prd.id === productId);


    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map((prd) => {
        return prd.id === productId ? { ...prd, quantity: prd.quantity - 1 } : prd

      });
      setCartProducts(newCart);
      updateLocalStorage(newCart);
    } else {
      deleteProducts(productId)
    }
  }
  const updateLocalStorage = (products) => {
    localStorage.setItem('devburger:cartInfo', JSON.stringify(products))
  }

  useEffect(() => {
    const clientCartData = localStorage.getItem('devburger:cartInfo');
    if (clientCartData) {
      setCartProducts(JSON.parse(clientCartData));
    }
  }, [])

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, putProductInCart, clearCart, deleteProducts, increaseProducts, descreaseProducts }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);

}
