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
        <a href="/about" class="nav-link">About</a>
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