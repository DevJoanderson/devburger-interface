import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
    'pk_live_51Rxkp3GxdslBnPU1NAz2mwzMv3L6WTOSvwLBLBBopNZrqAU3QBKSKVtFIUQvCOVYe1BvCrV5hHGUV0DC8qlQ2bJO007XAmn1i5'
)

export default stripePromise;