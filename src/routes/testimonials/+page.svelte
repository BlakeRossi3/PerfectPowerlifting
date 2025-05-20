<script lang="ts">
  import { testimonials } from '$lib/data/testimonials';
</script>

<section class="max-w-7xl mx-auto py-20 px-4">
  <h2 class="text-4xl font-bold text-center mb-8">Real Results, Real Lifters</h2>

  <!-- DESKTOP: Alternating 2-column layout -->
  <div class="hidden md:grid grid-cols-1 gap-20">
    {#each testimonials as t, i}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {#if i % 2 === 0}
          <div class="card-body bg-[#333363] rounded-xl shadow-2xl p-4">
            <figure>
              <img src={t.image} alt={t.name} loading="lazy" class="rounded-xl object-cover" />
            </figure>
            <div class="card-body text-sm text-white mt-3">
              <ul class="space-y-1">
                <li><strong>Squat:</strong> {t.stats.squat}</li>
                <li><strong>Bench:</strong> {t.stats.bench}</li>
                <li><strong>Deadlift:</strong> {t.stats.deadlift}</li>
                <li><strong>Class:</strong> {t.stats.category}</li>
              </ul>
            </div>
          </div>
          <div class="prose max-w-none text-lg">
            <p class="mb-4">"{t.quote}"</p>
            <p class="font-bold">– {t.name}</p>
          </div>
        {:else}
          <div class="prose max-w-none text-lg">
            <p class="mb-4">"{t.quote}"</p>
            <p class="font-bold">– {t.name}</p>
          </div>
          <div class="card-body bg-[#333363] rounded-xl shadow-2xl p-4">
            <figure>
              <img src={t.image} alt={t.name} loading="lazy" class="rounded-xl object-cover" />
            </figure>
            <div class="card-body text-sm text-white mt-3">
              <ul class="space-y-1">
                <li><strong>Squat:</strong> {t.stats.squat}</li>
                <li><strong>Bench:</strong> {t.stats.bench}</li>
                <li><strong>Deadlift:</strong> {t.stats.deadlift}</li>
                <li><strong>Class:</strong> {t.stats.category}</li>
              </ul>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- MOBILE ONLY: Horizontal scrollable testimonials -->
<div class="md:hidden flex overflow-x-auto gap-4 snap-x snap-mandatory px-4 pt-2">
  {#each testimonials as t}
    <div class="snap-center shrink-0 w-[90vw] card bg-[#333363!important] shadow-xl p-4">
      <figure class="aspect-[4/3] w-full overflow-hidden rounded-xl mb-4">
        <img
          src={t.image}
          alt={t.name}
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </figure>
      <div class="card-body text-sm text-white">
    <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-2">
        <span><strong>Squat:</strong> {t.stats.squat}</span>
        <span><strong>Bench:</strong> {t.stats.bench}</span>
        <span><strong>Deadlift:</strong> {t.stats.deadlift}</span>
    </div>
    <p class="text-center text-xs text-gray-500 mb-4">
        <strong>Category:</strong> {t.stats.category}
    </p>
    <p class="text-lg italic mb-2">"{t.quote}"</p>
    <p class="font-bold text-white">– {t.name}</p>
    </div>

    </div>
  {/each}
</div>


</section>
