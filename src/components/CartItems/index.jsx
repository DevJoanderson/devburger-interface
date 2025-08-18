import { Table } from '../index';
import { ProductImage, ButtonGroup, TrashImage } from './styles';
import TrashIcon from "../../assets/trash.svg";
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/CartContext';

export function CartItems() {
    const { cartProducts, decreaseProduct, increaseProduct, deleteProduct } = useCart();

    return (
        <Table.Root>
            <Table.Header>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Itens</Table.Th>
                    <Table.Th>Preços</Table.Th>
                    <Table.Th>Quantidade</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Header>
            <Table.Body>
                {cartProducts?.length ? (
                    cartProducts.map((product) => (
                        <Table.Tr key={product.id}>
                            <Table.Td><ProductImage src={product.url} alt={product.name} /></Table.Td>
                            <Table.Td>{product.name}</Table.Td>
                            <Table.Td>{product.currencyValue}</Table.Td>
                            <Table.Td>
                                <ButtonGroup>
                                    <button onClick={() => decreaseProduct(product.id)}>-</button>
                                    {product.quantity}
                                    <button onClick={() => increaseProduct(product.id)}>+</button>
                                </ButtonGroup>
                            </Table.Td>
                            <Table.Td>{formatPrice(product.quantity * product.price)}</Table.Td>
                            <Table.Td>
                                <TrashImage src={TrashIcon} alt='Lixeira' onClick={() => deleteProduct(product.id)}></TrashImage>
                            </Table.Td>
                        </Table.Tr>
                    ))
                ) : (
                    <Table.Tr>
                        <Table.Td colSpan={5} style={{ textAlign: 'center', padding: 16 }}>
                            Carrinho vazio
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Body>
        </Table.Root>
    )

}