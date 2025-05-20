<script lang="ts">
  import { goto } from '$app/navigation';


</script>

<section class="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
  <img
    src="/wordmark-blackgold.png"
    alt="Perfect Powerlifting"
    class="w-64 mb-6 drop-shadow-md"
  />

  <h1 class="text-4xl font-bold text-black mb-4">Thank You for Your Order</h1>

  <p class="text-lg text-gray-700 max-w-xl mb-6">
    Your payment was successful, and your program is on its way.
    You’ll receive an email with access details shortly.
    In the meantime, we recommend downloading the Google Sheets app for the best experience.
  </p>

 



  <button
    on:click={() => goto('/')}
    class="btn bg-[#E6B400] hover:bg-black hover:text-white text-black font-bold px-6 py-2 mb-6"
  >
    Back to Homepage
  </button>

</section>
