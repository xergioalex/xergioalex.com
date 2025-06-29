<script lang="ts">
import MobileMenu from './MobileMenu.svelte';

let open: boolean = false;
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
        <div class="relative group">
          <button class="nav-link flex items-center gap-1">
            About
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50">
            <a href="/about" class="block px-4 py-2 hover:bg-gray-100">About Me</a>
            <a href="/cv" class="block px-4 py-2 hover:bg-gray-100">CV</a>
            <a href="/dailybot" class="block px-4 py-2 hover:bg-gray-100">DailyBot</a>
            <a href="/entrepreneur" class="block px-4 py-2 hover:bg-gray-100">Entrepreneur</a>
            <a href="/techtalks" class="block px-4 py-2 hover:bg-gray-100">Tech Talks</a>
            <a href="/maker" class="block px-4 py-2 hover:bg-gray-100">Maker / Builder</a>
            <a href="/trading" class="block px-4 py-2 hover:bg-gray-100">Trading</a>
            <a href="/foodie" class="block px-4 py-2 hover:bg-gray-100">Foodie Enthusiast</a>
            <a href="/hobbies" class="block px-4 py-2 hover:bg-gray-100">Hobbies</a>
          </div>
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