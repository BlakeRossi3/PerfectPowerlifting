<script>
  import '../app.css';
  import { resetShopCategory } from '$lib/stores/shopState';
  import { goto } from '$app/navigation';
  import CartDrawer from '$lib/components/CartDrawer.svelte';

  function handleShopClick() {
    if (window.location.pathname === '/shop') {
      resetShopCategory.set(true);
    } else {
      goto('/shop');
    }
  }
</script>

<nav class="bg-[#333363!important] py-6 px-8 flex items-center gap-8 font-bold shadow-md  text-lg">

  <!-- Home image link -->
  <a href="/" class="flex items-center">
    <img
      src="/lettermark-whitegold.png"
      alt="Perfect Powerlifting"
      class="w-10 h-10 object-contain"
    />
  </a>

  <!-- Nav links -->
  <a href="/shop" on:click|preventDefault={handleShopClick} class="hover:underline text-[#E6B400!important]">
    Shop
  </a>
  <a href="/testimonials" class="hover:underline text-[#E6B400!important]">Testimonials</a>

   <CartDrawer />
</nav>
  
  
<slot /> <!-- This renders the content of each route -->

<footer class="bg-black text-white py-10 ">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
    
    <!-- Left: Logo + Description -->
    <div>
      <img src="/wordmark-whitegold.png" alt="Perfect Powerlifting" class="w-40 mb-4" />
      <p class="text-sm text-gray-400">
        Strength isn’t one-size-fits-all. Our programs are built to grow with you — from beginner to elite.
      </p>
    </div>

    <!-- Center: Navigation -->
    <div>
      <h3 class="text-lg font-bold mb-4">Explore</h3>
      <ul class="space-y-2 text-sm text-gray-300">
        <li><a href="/" class="hover:text-white">Home</a></li>
        <li><a href="/shop" class="hover:text-white">Shop Programs</a></li>
        <li><a href="mailto:info@perfectpowerlifting.com" class="hover:text-white">Contact</a></li>
      </ul>
    </div>

    <!-- Right: Socials / Contact -->
    <div>
      <h3 class="text-lg font-bold mb-4">Stay Connected</h3>
      <p class="text-sm text-gray-400 mb-2">info@perfectpowerlifting.com</p>
      <div class="flex space-x-4">
        <!-- Social Icons -->
        <a href="https://www.instagram.com/perfectpowerlifting" target="_blank" aria-label="Instagram">
          <svg class="w-5 h-5 text-gray-400 hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.2 0 3.584.012 4.85.07 1.206.056 2.02.24 2.496.402a4.92 4.92 0 0 1 1.79 1.042 4.92 4.92 0 0 1 1.042 1.79c.162.476.346 1.29.402 2.496.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.206-.24 2.02-.402 2.496a4.92 4.92 0 0 1-1.042 1.79 4.92 4.92 0 0 1-1.79 1.042c-.476.162-1.29.346-2.496.402-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.056-2.02-.24-2.496-.402a4.92 4.92 0 0 1-1.79-1.042 4.92 4.92 0 0 1-1.042-1.79c-.162-.476-.346-1.29-.402-2.496C2.175 15.748 2.163 15.364 2.163 12s.012-3.584.07-4.85c.056-1.206.24-2.02.402-2.496a4.92 4.92 0 0 1 1.042-1.79 4.92 4.92 0 0 1 1.79-1.042c.476-.162 1.29-.346 2.496-.402C8.416 2.175 8.8 2.163 12 2.163zm0-2.163C8.736 0 8.332.012 7.052.07 5.775.127 4.802.308 4.025.634a6.95 6.95 0 0 0-2.534 1.645A6.95 6.95 0 0 0 .634 4.025c-.326.777-.507 1.75-.564 3.027C.012 8.332 0 8.736 0 12s.012 3.668.07 4.948c.057 1.277.238 2.25.564 3.027a6.95 6.95 0 0 0 1.645 2.534 6.95 6.95 0 0 0 2.534 1.645c.777.326 1.75.507 3.027.564C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.277-.057 2.25-.238 3.027-.564a6.95 6.95 0 0 0 2.534-1.645 6.95 6.95 0 0 0 1.645-2.534c.326-.777.507-1.75.564-3.027.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.057-1.277-.238-2.25-.564-3.027a6.95 6.95 0 0 0-1.645-2.534A6.95 6.95 0 0 0 19.975.634c-.777-.326-1.75-.507-3.027-.564C15.668.012 15.264 0 12 0z"/>
            <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zM18.406 4.594a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
          </svg>
        </a>
        <!-- Add more icons if needed -->
      </div>
    </div>

  </div>

  <!-- Bottom -->
  <div class="mt-8 text-center text-xs text-gray-500">
    &copy; {new Date().getFullYear()} Perfect Powerlifting. All rights reserved.
  </div>
</footer>

<style>
  nav {
    display: flex;
    gap: 1rem;
    background: #eee;
    padding: 1rem;
  }
  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
</style>
