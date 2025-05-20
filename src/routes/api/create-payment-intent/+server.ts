import type { RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';

console.log('SECRET KEY:', import.meta.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil'
});

export const POST: RequestHandler = async ({ request }) => {
  const { items } = await request.json();

  const amount = items.reduce(
    (sum: number, item: { price: number }) => sum + item.price * 100,
    0
  );

interface Item {
    price: number;
    slug: string;
}

interface PaymentIntentMetadata {
    program_slugs: string;
}

const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    metadata: {
        program_slugs: items.map((i: Item) => i.slug).join(', ')
    }
});

  return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
