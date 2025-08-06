import Cart from '../../assets/Carts.svg';
import { ContainerButton } from './styles';

export function CartButton({ children, ...rest }) {
  return (
    <ContainerButton {...rest}>
      <img src={Cart} alt="carrinho-de-compras" />
      {children}
    </ContainerButton>
  );
}
