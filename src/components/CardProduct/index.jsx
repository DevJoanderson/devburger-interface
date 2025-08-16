import PropTypes from "prop-types";
import { CardImage, CardInfo, Container } from "./styles";
import { CartButton } from "../CartButton";
import { useCart } from "../../hooks/CartContext";
import { toast } from "react-toastify"; // já tem ToastContainer no main

export function CardProduct({ product }) {
  const { putProductInCart } = useCart();

  function handleAdd() {
    // passe o objeto no shape que o contexto espera
    putProductInCart({
      id: product.id,
      name: product.name,
      url: product.url,
      price: product.price, // garanta que exista no product
      currencyValue: product.currencyValue, // ou calcule a partir de price
    });

    toast.success(`${product.name} adicionado ao carrinho!`);
  }

  return (
    <Container>
      <CardImage src={product.url} alt={product.name} />
      <CardInfo>
        <p>{product.name}</p>
        <strong>{product.currencyValue}</strong>
      </CardInfo>
      <CartButton onClick={handleAdd} />
    </Container>
  );
}

CardProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    price: PropTypes.number,           // adicionei
    currencyValue: PropTypes.string.isRequired,
  }).isRequired,
};
