import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/CartContext";
import { api } from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'
import { Button } from "../Button";
import { Container } from "./styles";

export function CartResume() {
    const [finalPrice, setFinalPrice] = useState(0);
    const [deliveryTax] = useState(500);

    const navigate = useNavigate();

    const { cartProducts = [], clearCart } = useCart();

    useEffect(() => {
        const sumAllItems = cartProducts.reduce((acc, current) => {
            const price = Number(current?.price ?? 0);
            const qty = Number(current?.quantity ?? 0);
            return acc + price * qty;
        }, 0); // <- valor inicial para evitar erro quando o array estiver vazio
        setFinalPrice(sumAllItems);
    }, [cartProducts]);

    const isEmpty = cartProducts.length === 0;

    const submitOrder = async () => {
        const products = cartProducts.map((p) => {
            return { id: p.id, quantity: p.quantity };
        });

        try {
            const { status } = await api.post(
                '/orders',
                { products },
                { validateStatus: () => true }
            );

            if (status === 201) {
                clearCart();
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                toast.success('Pedido Realizado com Sucesso!');
            } else if (status === 409) {
                toast.error('Falha ao Realizar o seu Pedido!');
            } else {
                toast.error('Falha no sistema! Tente novamente.');
            }

        } catch (error) {
            toast.error('Falha no sistema! Tente novamente.');
        }
    };

    return (
        <div>
            <Container>
                <div className="container-top">
                    <h2 className="title">Resumo do Predido</h2>
                    <p className="items">Itens</p>
                    <p className="items-price">{formatPrice(finalPrice)}</p>
                    <p className="delivery-tax">Taxa de Entrega</p>
                    <p className="delivery-tax-price">
                        {formatPrice(isEmpty ? 0 : deliveryTax)}
                    </p>
                </div>
                <div className="container-bottom">
                    <p>Total</p>
                    <p>{formatPrice(finalPrice + (isEmpty ? 0 : deliveryTax))}</p>
                </div>
            </Container>
            <Button onClick={submitOrder}>Finalizar Pedido</Button>
        </div>
    );
}
