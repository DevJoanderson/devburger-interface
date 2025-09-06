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
import '../styles.css';

export default function CheckoutForm() {
  const { cartProducts, clearCart } = useCart();

  const stripe = useStripe();
  const elements = useElements();

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
    setMessage(null);

    // 1) Valida o PaymentElement (impede o IntegrationError)
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message ?? 'Erro ao validar o pagamento.');
      toast.error(submitError.message ?? 'Erro ao validar o pagamento.');
      setIsLoading(false);
      return;
    }

    // 2) Confirma o pagamento (sem redirecionar se não precisar)
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      // opcional: em produção use HTTPS e um return_url
      // confirmParams: { return_url: `${window.location.origin}/complete` },
    });

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    // 3) Sucesso: cria pedido no backend e navega
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
          { validateStatus: () => true },
        );

        if (status === 201 || status === 200) {
          clearCart();
          toast.success('Pedido Realizado com Sucesso!');
          navigate(
            `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
          );
        } else if (status === 409) {
          toast.error('Erro ao realizar o pedido!');
        } else {
          throw new Error();
        }
      } catch (err) {
        toast.error('Falha no Sistema!, Tente novamente');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // 4) Caso o PaymentIntent peça redirecionamento/ação extra:
    if (paymentIntent?.client_secret) {
      navigate(
        `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
      );
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
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pagar Agora'
            )}
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
