// src/config/stripeConfig.js
import { loadStripe } from '@stripe/stripe-js';

const pk = import.meta.env.VITE_STRIPE_PK;

console.log('[Stripe] VITE_STRIPE_PK lido do .env:', pk);
if (!pk || typeof pk !== 'string' || !pk.startsWith('pk_')) {
  console.error(
    '[Stripe] Publishable key ausente ou inválido. ' +
    'Verifique o arquivo .env do FRONT (deve conter VITE_STRIPE_PK=pk_test_... ou pk_live_...)'
  );
}

const stripePromise = loadStripe(pk);
export default stripePromise;
