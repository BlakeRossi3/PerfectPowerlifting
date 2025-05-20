<script lang="ts">
  import { page } from '$app/stores';
  import { getProgramBySlug } from '$lib/utils/getProgramBySlug';
  import { addToCart } from '$lib/stores/cart';
  import { onMount } from 'svelte';
  import { programs } from '$lib/data/programs';

  // 👇 Use typeof to infer the shape of a single program
  type Program = (typeof programs)[number];

  let program: Program | undefined;

  onMount(() => {
    const slug = $page.params.slug;
    program = getProgramBySlug(slug);
  });
</script>

{#if program}
  <div class="max-w-4xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-10">
    <img src={program.image} alt={program.title} class="w-full md:w-1/2 rounded-xl shadow-md object-cover" />

    <div class="flex-1">
      <h1 class="text-4xl font-bold mb-4">{program.title}</h1>
      <p class="text-lg font-semibold text-gold mb-6">${program.price}</p>

      <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-700">
        {#each program.description as bullet}
          <li>{bullet}</li>
        {/each}
      </ul>

      <button
         class="btn btn-primary bg-black text-white hover:text-black hover:bg-yellow-500 py-2 px-4 rounded-lg shadow-xl transition duration-300"
        on:click={() => program && addToCart(program)}
      >
        Add to Cart
      </button>
    </div>
  </div>
{:else}
  <p class="text-center py-20">Program not found.</p>
{/if}
