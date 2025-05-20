import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  envPrefix: ['VITE_', 'PUBLIC_', 'STRIPE_'] // 👈 Add this line!
});

