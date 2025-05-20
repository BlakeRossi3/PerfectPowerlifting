<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { resetShopCategory } from '$lib/stores/shopState';
  import { programs } from '$lib/data/programs';





  let videoEnded = false;
  let selectedCategory: 'powerlifting' | 'bodybuilding' | null = null;

  // Check if this is the first time visiting the page
  let hasVisited = false;

  onMount(() => {
  const hasVisited = sessionStorage.getItem('hasVisitedShop');

  if (hasVisited) {
    videoEnded = true;
  } else {
    videoEnded = false;
    sessionStorage.setItem('hasVisitedShop', 'true');
  }
});

function handleVideoEnd() {
  videoEnded = true;
}
resetShopCategory.subscribe((reset) => {
  if (reset) {
    selectedCategory = null;
    resetShopCategory.set(false); // Clear reset flag after handling
  }
});

function selectCategory(category: 'powerlifting' | 'bodybuilding') {
  selectedCategory = category;
}

  function getPrograms(category: 'powerlifting' | 'bodybuilding') {
  return programs
    .filter((p) => p.category === category)
    .map((p) => ({
      image: p.image,
      price: `$${p.price}`, // or leave as number if you're formatting later
      link: `/shop/${p.slug}`
    }));
}


</script>

{#if !videoEnded}
  <video
    src="/logo-animation.mp4"
    autoplay
    muted
    playsinline
    onended={handleVideoEnd}
    class="fixed top-0 left-0 w-full h-full object-cover z-50"
  ></video>

{:else if !selectedCategory}
  <div class="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
    <!-- Powerlifting image -->
    <div class="relative group h-full">
      <img
        src="/lifting/johnSquat1.jpg"
        alt="Powerlifting"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <button
        onclick={() => selectCategory('powerlifting')}
        class="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white bg-black/50 hover:bg-black/70 transition"
      >
        Powerlifting Programs
      </button>
    </div>

    <!-- Bodybuilding image -->
    <div class="relative group h-full">
      <img
        src="/lifting/laurenBodybuildingButton.jpg"
        alt="Bodybuilding"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <button
        onclick={() => selectCategory('bodybuilding')}
        class="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white bg-black/50 hover:bg-black/70 transition"
      >
        Bodybuilding Programs
      </button>
    </div>
  </div>

{:else}
  <div class="fade-in px-4 py-10 max-w-6xl mx-auto">
    <h2 class="text-4xl font-bold mb-10 text-center">
      {selectedCategory === 'powerlifting' ? 'Powerlifting' : 'Bodybuilding'} Programs
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each getPrograms(selectedCategory) as program}
      <div
        class="relative group overflow-hidden rounded-lg shadow-md"
        class:opacity-70={program.price === 'Coming soon'}
      >
        <img
          src={program.image}
          alt="Program"
          class="w-full h-full object-cover transition-transform duration-300 {program.price !== 'Coming soon' ? 'group-hover:scale-105' : ''}"
        />

        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span class="text-white text-2xl font-semibold">{program.price}</span>
        </div>

        {#if program.price !== 'Coming soon'}
          <a
            href={program.link}
            class="absolute inset-0"
            aria-label="View program"
          ></a>
        {/if}
        {#if program.price === 'Coming soon'}
          <div class="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-2 text-sm font-semibold">
            Coming Soon
          </div>
        {/if}
      </div>
    {/each}

    </div>
  </div>
{/if}
