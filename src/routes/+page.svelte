<section class="relative w-[90%] h-[75vh] overflow-hidden mx-auto">
  <!-- Background image -->
  <div class="absolute inset-0 z-0 flex flex-col md:flex-row w-full h-full">
    <img src="/lifting/laurenSquat1.jpg" class="w-full md:w-1/2 h-1/2 md:h-full object-cover brightness-75" alt="Lauren squatting" />
    <img src="/lifting/chaseDeadlift.jpg" class="w-full md:w-1/2 h-1/2 md:h-full object-cover brightness-75" alt="Chase deadlifting" />
  </div>

  <!-- Overlay -->
  <div class="relative z-10 flex flex-col items-center justify-center h-full w-full text-white px-4 text-center">
    <img
      src="/wordmark-whitegold.png"
      alt="Perfect Powerlifting"
      class="w-3/4 md:w-1/2 max-w-[600px] drop-shadow-lg"
    />
    <button
      on:click={() => (window.location.href = '/shop')}
      class="btn btn-outline text-white font-extrabold mt-6 px-4 py-1 text-lg flex items-center gap-2 border border-white hover:bg-white hover:text-black transition duration-300 ease-in-out"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M13.5 4.5l6 6m0 0l-6 6m6-6H3" />
      </svg>
      Browse Programs
    </button>
  </div>
</section>


<section class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-6 max-w-7xl mx-auto py-24 px-4">
  <!-- Blake image -->
  <div class="flex justify-center items-center">
    <img
      src="/lifting/blake1.jpeg"
      alt="Blake performing squat"
      class="rounded-xl shadow-lg w-full max-w-md object-cover"
    />
  </div>

  <!-- Value props -->
  <div class="flex items-center">
    <ul class="text-xl leading-relaxed space-y-6">
      <li class="text-3xl font-bold text-black mb-12">Be Perfect. Build strength that lasts.</li>
      <li class="flex items-start gap-3">
        <img src="/lettermark-blackgold.png" class="w-5 h-5 mt-1" alt="Check" />
        <span>For <strong>beginners through advanced</strong> lifters — we meet you where you’re at</span>
      </li>
      <li class="flex items-start gap-3">
        <img src="/lettermark-blackgold.png" class="w-5 h-5 mt-1" alt="Check" />
        <span><strong>Personalized coaching</strong> with zero guesswork</span>
      </li>
      <li class="flex items-start gap-3">
        <img src="/lettermark-blackgold.png" class="w-5 h-5 mt-1" alt="Check" />
        <span>Custom-fit programs for your goals and equipment</span>
      </li>
      <li class="flex items-start gap-3">
        <img src="/lettermark-blackgold.png" class="w-5 h-5 mt-1" alt="Check" />
        <span>We track everything — <strong>no missed details</strong></span>
      </li>
      <li class="flex items-start gap-3">
        <img src="/lettermark-blackgold.png" class="w-5 h-5 mt-1" alt="Check" />
        <span>Email us at <strong>info@perfectpowerlifting.com</strong></span>
      </li>
    </ul>
  </div>

  <!-- Philosophy blurb -->
  <div class="flex items-center text-gray-700">
    <div class="flex flex-col gap-6 text-xl leading-relaxed max-w-xl mx-auto">
  <p>
    Perfect Powerlifting exists to give aspiring lifters the structure they need, the flexibility they want, and the education they’ve been missing.
  </p>
  <p>
    Our programs are affordable, adaptable, and built to actually make you better — not just stronger. Every plan is designed to teach you how to train with intention, manage your variables, and understand the “why” behind the work.
  </p>
  <p>
    No gimmicks. Just focused programming that evolves with you. Stop guessing. Start progressing.
  </p>
</div>
  </div>

  <!-- Carousel preview -->
  <div>
    <div class="relative w-full h-90 rounded-lg overflow-hidden shadow-md">
      <a href={programs[currentIndex].link} target="_blank">
        <img
          src={programs[currentIndex].image}
          alt={programs[currentIndex].title}
          class="object-cover w-full h-full transition-opacity duration-700"
        />
      </a>
      <div class="absolute bottom-0 left-0 bg-black/60 text-white px-4 py-2 w-full text-center">
        {programs[currentIndex].title}
      </div>
    </div>
  </div>
</section>


<script lang="ts">
  import { onMount } from 'svelte';

  const programs = [
    {
      title: '12-Week Powerlifting Introduction',
      image: '/programs/beginner.png',
      link: '/shop#strength'
    },
    {
      title: 'If you waited too long to start your peak...',
      image: '/programs/emergencyPeak.png',
      link: '/shop#peaking'
    },
    {
      title: '14 Week Fully Customizable Peak',
      image: '/programs/14WeekPeak.png',
      link: '/shop#hypertrophy'
    },
    {
      title: 'Hypertrophy Program',
      image: '/programs/advanced.png',
      link: '/shop#hypertrophy'
    },
    {
      title: 'Standard Strength and Size Program',
      image: '/programs/perfectStrengthSize.png',
      link: '/shop#strength-size'
    },
    {
      title: 'Bodybuilding Program for putting on size',
      image: '/programs/hypertrophyBlueprint.png',
      link: '/shop#strength-size'
    }
  ];

  let currentIndex = 0;

  onMount(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % programs.length;
    }, 4000);

    return () => clearInterval(interval);
  });
</script>




