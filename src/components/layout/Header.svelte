<script lang="ts">
import { onMount } from 'svelte';
import MobileMenu from './MobileMenu.svelte';

let open: boolean = false;
let aboutOpen = false;

function toggleMenu() {
  open = !open;
}
</script>

<header class="bg-main text-white sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
  <nav class="main-container flex items-center justify-between">
    <a
      href="/"
      class="font-extrabold text-2xl md:text-3xl tracking-tight text-blue-600 select-none"
    >
      <img
        class="h-9"
        src="/images/logo_small_version_white.svg"
        alt="XergioAleX"
      />
    </a>
    <!-- Desktop menu -->
    <div class="hidden md:flex items-center gap-8">
      <div class="flex gap-6">
        <a href="/" class="nav-link">Home</a>
        <a href="/blog" class="nav-link">Blog</a>
        <div
          class="relative group"
          on:mouseenter={() => aboutOpen = true}
          on:mouseleave={() => aboutOpen = false}
        >
          <button
            class="nav-link flex items-center gap-1 cursor-pointer select-none"
            aria-expanded={aboutOpen}
            aria-controls="about-dropdown"
            type="button"
            tabindex="0"
          >
            About
            <svg
              class="w-4 h-4 transition-transform duration-200"
              style="transform: rotate({aboutOpen ? '180deg' : '0deg'});"
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
              class="absolute left-1/2 -translate-x-1/2 top-full w-56"
              style="height: 12px; pointer-events: auto;"
            ></div>
            <div
              id="about-dropdown"
              class="absolute left-1/2 -translate-x-1/2 top-full w-56 bg-white text-black rounded shadow-lg z-50 overflow-hidden transition-all duration-200"
              style="pointer-events: auto; opacity: 1; transform: translateY(12px);"
            >
              <a href="/about" class="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition">About Me</a>
              <a href="/cv" class="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition">CV</a>
              <a href="/dailybot" class="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition">DailyBot</a>
              <a href="/entrepreneur" class="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition">Entrepreneur</a>
              <a href="/techtalks" class="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition">Tech Talks</a>
              <a href="/maker" class="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition">Maker / Builder</a>
              <a href="/trading" class="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition">Trading</a>
              <a href="/foodie" class="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition">Foodie Enthusiast</a>
              <a href="/hobbies" class="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition">Hobbies</a>
            </div>
          {/if}
        </div>
        <a href="/contact" class="nav-link">Contact</a>
      </div>
    </div>
    <!-- Mobile menu button -->
    <button
      class="block md:hidden p-1"
      aria-label="Open menu"
      on:click={toggleMenu}
      type="button"
    >
      <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </nav>
  <MobileMenu {open} {toggleMenu} />
</header> 