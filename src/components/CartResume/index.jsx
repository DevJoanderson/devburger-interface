import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/CartContext";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";
import { Button } from "../Button";
import { Container } from "./styles";

export function CartResume() {
    // trabalharemos 100% em CENTAVOS
    const [itemsTotalCents, setItemsTotalCents] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // 500 = R$ 5,00 (centavos)
    const deliveryTaxCents = 500;

    const navigate = useNavigate();
    const { cartProducts = [], clearCart } = useCart();

    useEffect(() => {
        const total = cartProducts.reduce((acc, current) => {
            const price = Number(current?.price ?? 0);     // preço em reais no produto
            const qty = Number(current?.quantity ?? 0);
            // converte para centavos e acumula
            return acc + Math.round(price * 100) * qty;
        }, 0);
        setItemsTotalCents(total);
    }, [cartProducts]);

    const isEmpty = cartProducts.length === 0;
    const totalCents = itemsTotalCents + (isEmpty ? 0 : deliveryTaxCents);

    const submitOrder = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            if (!cartProducts.length) {
                toast.error("Carrinho vazio");
                return;
            }

            const products = cartProducts.map((p) => ({
                id: Number(p.id),
                quantity: Number(p.quantity),
                // ajuste aqui conforme a convenção escolhida:
                // price: Number(p.price),            // REAIS
                price: Math.round(Number(p.price) * 100), // CENTAVOS
            }));

            const { data, status } = await api.post(
                "/create-payment-intent",
                { products },
                { validateStatus: () => true }
            );

            if (status >= 200 && status < 300) {
                const clientSecret = data?.clientSecret || data?.client_secret;
                if (!clientSecret) {
                    toast.error("Resposta sem clientSecret.");
                    return;
                }
                toast.success("Pedido criado! (clientSecret recebido)");
                // confirmar pagamento aqui
            } else {
                const msg =
                    (Array.isArray(data?.error) && data.error.join(" | ")) ||
                    data?.error ||
                    "Falha ao criar pagamento.";
                toast.error(msg);
                console.error("create-payment-intent error:", data);
            }
        } catch (err) {
            console.error(err);
            toast.error("Erro, tente novamente!");
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div>
            <Container>
                <div className="container-top">
                    <h2 className="title">Resumo do Pedido</h2>
                    <p className="items">Itens</p>
                    <p className="items-price">{formatPrice(itemsTotalCents / 100)}</p>

                    <p className="delivery-tax">Taxa de Entrega</p>
                    <p className="delivery-tax-price">
                        {formatPrice((isEmpty ? 0 : deliveryTaxCents) / 100)}
                    </p>
                </div>

                <div className="container-bottom">
                    <p>Total</p>
                    <p>{formatPrice(totalCents / 100)}</p>
                </div>
            </Container>

            <Button type="button" onClick={submitOrder} disabled={isLoading || isEmpty}>
                {isLoading ? "Processando..." : "Finalizar Pedido"}
            </Button>
        </div>
    );
}
