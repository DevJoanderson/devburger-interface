import PropTypes from "prop-types";
import { CardImage, CardInfo, Container } from "./styles";
import { CartButton } from "../CartButton";

export function CardProduct({ product }) {
    console.log(product)
   return (
    <Container>
      <CardImage src={product.url} alt={product.name} />
      <CardInfo>
      <p>{product.name}</p>
      <strong>{product.currencyValue}</strong>
    </CardInfo>
      <CartButton onClick={() => putProductInCart(product)}></CartButton>
    </Container>
    )
}

CardProduct.propTypes = {
 product: PropTypes.object,
}