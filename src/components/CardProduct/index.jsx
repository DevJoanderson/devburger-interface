import PropTypes from "prop-types";
import { CardImage, CardInfo, Container } from "./styles";
import { CartButton } from "../CartButton";

export function CardProduct({ product }) {
  function putProductInCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex >= 0) {
      // Produto já está no carrinho, aumenta a quantidade
      cart[productIndex].quantity += 1;
    } else {
      // Produto ainda não está no carrinho, adiciona com quantidade 1
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} adicionado ao carrinho!`);
  }

  return (
    <Container>
      <CardImage src={product.url} alt={product.name} />
      <CardInfo>
        <p>{product.name}</p>
        <strong>{product.currencyValue}</strong>
      </CardInfo>
      <CartButton onClick={() => putProductInCart(product)} />
    </Container>
  );
}

CardProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    currencyValue: PropTypes.string.isRequired,
  }).isRequired,
};
