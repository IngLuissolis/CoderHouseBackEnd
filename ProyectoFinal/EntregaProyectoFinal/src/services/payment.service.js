import Stripe from 'stripe';
import config from '../config.js';

const stripe = Stripe(config.STRIPE_SECRET_KEY);

const products = [
    { id: 1, name: 'papas', price: 1000},
    { id: 2, name: 'queso', price: 500},
    { id: 3, name: 'hamburguesa', price: 1500},
    { id: 4, name: 'soda', price: 1000},
    { id: 5, name: 'golosinas', price: 800}
]

export const createPaymentStripeService = async (id) => {
    const product = products.find(p => p.id === id);
    if (!product) {
        throw new Error(`Product ${id} not found`);
    }

    const stripeInfo = {
        amount: product.price,
        currency: 'usd',
        metadata: {
            
        }
    }

    const response = await stripe.paymentIntents.create(stripeInfo);

    //console.log('stripe response: ', response);
    return response;
}