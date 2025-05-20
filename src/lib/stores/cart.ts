import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type CartItem = {
  slug: string;
  title: string;
  price: number;
  image: string;
  stripePriceId: string;
};

const stored = browser ? JSON.parse(localStorage.getItem('cart') || '[]') : [];

export const cart = writable<CartItem[]>(stored);

cart.subscribe((items) => {
  if (browser) localStorage.setItem('cart', JSON.stringify(items));
});

export function addToCart(item: CartItem) {
  cart.update((items) => {
    // prevent duplicates
    if (items.find((i) => i.slug === item.slug)) return items;
    return [...items, item];
  });
}

export function removeFromCart(slug: string) {
  cart.update((items) => items.filter((i) => i.slug !== slug));
}

export function clearCart() {
  cart.set([]);
}
