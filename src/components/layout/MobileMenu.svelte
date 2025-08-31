<script lang="ts">
import { slide } from 'svelte/transition';

// export let lang: string;
export let open: boolean;
export let toggleMenu: () => void;
let aboutOpen = false;
let languageOpen = false;
</script>

{#if open}
  <div class="fixed inset-0 z-50 bg-main bg-opacity-95 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden">
    <button
      class="absolute top-6 right-6 p-2"
      aria-label="Cerrar menú"
      on:click={toggleMenu}
      type="button"
    >
      <!-- Icono de cerrar (X) -->
      <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <a href="/" class="nav-link text-2xl text-center">Home</a>
    <a href="/blog" class="nav-link text-2xl text-center">Blog</a>
    <button
      class="nav-link text-2xl text-center flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
      on:click={() => aboutOpen = !aboutOpen}
      aria-expanded={aboutOpen}
      aria-controls="about-dropdown"
      type="button"
    >
      About
      <svg
        class="w-5 h-5 transition-transform duration-200"
        class:rotate-180={aboutOpen}
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    {#if aboutOpen}
      <div
        id="about-dropdown"
        class="flex flex-col items-center gap-2 mt-1"
        transition:slide={{ duration: 200 }}
      >
        <a href="/about" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">About Me</a>
        <a href="/cv" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">CV</a>
        <a href="/dailybot" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">DailyBot</a>
        <a href="/entrepreneur" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">Entrepreneur</a>
        <a href="/techtalks" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">Tech Talks</a>
        <a href="/maker" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">Maker / Builder</a>
        <a href="/trading" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">Trading</a>
        <a href="/foodie" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">Foodie Enthusiast</a>
        <a href="/hobbies" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">Hobbies</a>
      </div>
    {/if}
    <a href="/contact" class="nav-link text-2xl text-center">Contact</a>
    <button
      class="nav-link text-2xl text-center flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
      on:click={() => languageOpen = !languageOpen}
      aria-expanded={languageOpen}
      aria-controls="language-dropdown"
      type="button"
    >
      Language
      <svg
        class="w-5 h-5 transition-transform duration-200"
        class:rotate-180={languageOpen}
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    {#if languageOpen}
      <div
        id="language-dropdown"
        class="flex flex-col items-center gap-2 mt-1"
        transition:slide={{ duration: 200 }}
      >
        <button class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition flex items-center gap-2">
          <span role="img" aria-label="Español">🇪🇸</span> Español
        </button>
        <button class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition flex items-center gap-2">
          <span role="img" aria-label="English">🇬🇧</span> English
        </button>
      </div>
    {/if}
  </div>
{/if} 