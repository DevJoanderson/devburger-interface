import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../../hooks/CartContext.jsx';
import { api } from '../../../services/api';

import {
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import './styles.css'; // << corrigido: mesmo diretório

export default function CheckoutForm() {
    const { cartProducts, clearCart } = useCart();

    const stripe = useStripe();
    const elements = useElements();

    // vem da tela anterior (onde você montou os métodos disponíveis)
    const {
        state: { dpmCheckerLink } = { state: {} },
    } = useLocation();

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

        // confirma o pagamento com os dados do Payment Element
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
            toast.error(error.message);
            setIsLoading(false);
            return;
        }

        // sucesso
        if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                const products = cartProducts.map((product) => ({
                    id: product.id,
                    quantity: product.quantity,
                    price: product.price,
                }));

                const { status } = await api.post(
                    '/orders',
                    { products },
                    { validateStatus: () => true }
                );

                if (status === 200 || status === 201) {
                    clearCart();
                    toast.success('Pedido Realizado com Sucesso!');
                    navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
                } else if (status === 409) {
                    toast.error('Erro ao realizar o pedido!');
                } else {
                    throw new Error('Falha no backend');
                }
            } catch (err) {
                toast.error('Falha no Sistema! Tente novamente.');
            } finally {
                setIsLoading(false);
            }
            return;
        }

        // se não foi "succeeded" mas retornou intent (ex.: requires_action, etc), redireciona pra tela de resultado
        if (paymentIntent?.client_secret) {
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
                    type="submit"
                >
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner" /> : 'Pagar Agora'}
                    </span>
                </button>

                {message && <div id="payment-message">{message}</div>}
            </form>

            <div>
                <p>Os métodos são disponibilizados de acordo com sua região.</p>
                {dpmCheckerLink && (
                    <a
                        href={dpmCheckerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="dpm-integarion-checker"
                    >
                        Ver métodos de pagamento
                    </a>
                )}
            </div>
        </div>
    );
}
