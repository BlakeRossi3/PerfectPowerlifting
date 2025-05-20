<script lang="ts">
  import { onMount } from 'svelte';
  import { cart, clearCart } from '$lib/stores/cart';
  import { goto } from '$app/navigation';
  import { loadStripe } from '@stripe/stripe-js';
  import type {
    Stripe,
    StripeCardElement,
    StripeElements
  } from '@stripe/stripe-js';
  import type { CartItem } from '$lib/stores/cart';

  let stripe: Stripe | null = null;
  let elements: StripeElements;
  let card: StripeCardElement;
  let clientSecret = '';
  let isLoading = false;
  let errorMessage = '';
  let cartItems: CartItem[] = [];
  let total = 0;

  onMount(() => {
  const unsub = cart.subscribe((items) => {
    cartItems = items;
    total = items.reduce((sum, item) => sum + item.price, 0);
  });

  (async () => {
    if (!cartItems.length) {
      goto('/shop');
      return;
    }

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems })
    });

    const { clientSecret: cs } = await response.json();
    clientSecret = cs;

    stripe = await loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY);
    if (!stripe) {
      errorMessage = 'Failed to load Stripe';
      return;
    }

    elements = stripe.elements();
    card = elements.create('card');
    card.mount('#card-element');
  })();

  // ✅ this is now a plain function (Svelte expects this)
  return () => unsub();
});

  async function handleSubmit() {
    if (!stripe || !clientSecret) return;

    isLoading = true;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card }
    });

    isLoading = false;

    if (result.error) {
      errorMessage = result.error.message || 'Payment failed';
    } else {
      clearCart();
      goto('/thank-you');
    }
  }
</script>

<div class="max-w-2xl mx-auto p-6">
  <h1 class="text-3xl font-bold mb-6">Checkout</h1>

  <ul class="mb-4 space-y-2">
    {#each cartItems as item}
      <li class="flex justify-between">
        <span>{item.title}</span>
        <span>${item.price}</span>
      </li>
    {/each}
  </ul>

  <div class="mb-4 font-bold text-right">Total: ${total}</div>

  <div id="card-element" class="p-4 border border-gray-300 rounded mb-4"></div>

  {#if errorMessage}
    <p class="text-red-600 text-sm mb-2">{errorMessage}</p>
  {/if}

  <button
    class="btn btn-primary bg-gold hover:bg-yellow-500 text-white"
    on:click={handleSubmit}
    disabled={isLoading}
  >
    {isLoading ? 'Processing...' : 'Pay Now'}
  </button>
</div>
