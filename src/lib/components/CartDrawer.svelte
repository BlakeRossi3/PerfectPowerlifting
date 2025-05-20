<script lang="ts">
  import { cart, removeFromCart } from '$lib/stores/cart';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  let isOpen = false;
  let cartItems = get(cart);

  $: total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const toggleDrawer = () => (isOpen = !isOpen);
  cart.subscribe((items) => (cartItems = items));
</script>

<!-- Button to open drawer -->
<button class="relative" on:click={toggleDrawer}>
  🛒
  {#if cartItems.length}
    <span class="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {cartItems.length}
    </span>
  {/if}
</button>

<!-- Drawer -->
<div
  class={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
    isOpen ? 'translate-x-0' : 'translate-x-full'
  }`}
>
  <div class="flex justify-between items-center p-4 border-b">
    <h2 class="text-lg font-bold">Your Cart</h2>
    <button on:click={toggleDrawer} class="text-gray-500 hover:text-black text-xl">&times;</button>
  </div>

  <div class="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-160px)]">
    {#if cartItems.length === 0}
      <p class="text-gray-500 text-center">Your cart is empty.</p>
    {:else}
      {#each cartItems as item}
        <div class="flex justify-between items-start border-b pb-2">
          <div>
            <p class="font-semibold">{item.title}</p>
            <p class="text-sm text-gray-600">${item.price}</p>
          </div>
          <button
            class="text-sm text-red-500 hover:text-red-700"
            on:click={() => removeFromCart(item.slug)}
          >
            Remove
          </button>
        </div>
      {/each}
    {/if}
  </div>

  {#if cartItems.length > 0}
    <div class="p-4 border-t">
      <div class="flex justify-between mb-4 font-semibold">
        <span>Total:</span>
        <span>${total}</span>
      </div>
      <button
        on:click={() => goto('/checkout')}
        class="btn btn-primary bg-black text-white hover:text-black hover:bg-yellow-500 py-2 px-4 rounded-lg shadow-xl transition duration-300"
      >
        Proceed to Checkout
      </button>
    </div>
  {/if}
</div>
