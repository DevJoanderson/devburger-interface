import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../../hooks/CartContext.jsx';
import { api } from '../../../services/api';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import '../styles.css';

export default function CheckoutForm() {
    const { cartProducts, clearCart } = useCart();

    const stripe = useStripe();
    const elements = useElements();

    // ✅ Fallback seguro: não quebra se a página for recarregada sem state
    const location = useLocation();
    const dpmCheckerLink = location?.state?.dpmCheckerLink ?? '#';

    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe.js has not yet loaded.');
            return;
        }

        setIsLoading(true);

        // Chama a função confirmPayment do Stripe
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
            toast.error(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Se o pagamento foi bem-sucedido, envia o pedido para o backend
            try {
                const products = cartProducts.map((product) => ({
                    id: product.id,
                    quantity: product.quantity,
                    price: product.price, // certifique-se que está em CENTAVOS
                }));

                const { status } = await api.post(
                    '/orders',
                    { products },
                    { validateStatus: () => true }
                );

                if (status === 201 || status === 200) {
                    setTimeout(() => {
                        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
                    }, 3000);
                    clearCart();
                    toast.success('Pedido Realizado com Sucesso!');
                } else if (status === 409) {
                    toast.error('Erro ao realizar o pedido!');
                } else {
                    throw new Error();
                }
            } catch (err) {
                toast.error('Falha no Sistema!, Tente novamente');
            }
        } else if (paymentIntent?.client_secret) {
            // Outros status (ex.: requires_action) — segue para a tela de conclusão
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
        }

        setIsLoading(false);
    };

    const paymentElementOptions = { layout: 'accordion' };

    return (
        <div className="container">
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />

                <button
                    className="button"
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                >
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : 'Pagar Agora'}
                    </span>
                </button>

                {message && <div id="payment-message">{message}</div>}
            </form>

            <div>
                <p>Os métodos são disponibilizados de acordo com sua região.</p>
                <a
                    href={dpmCheckerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="dpm-integarion-checker"
                >
                    Ver métodos de pagamento
                </a>
            </div>
        </div>
    );
}
