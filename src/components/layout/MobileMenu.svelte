<script lang="ts">
  export let open: boolean = false;
  export let toggleMenu: () => void;
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
    <a href="/" class="nav-link text-2xl" on:click={toggleMenu}>Home</a>
    <a href="/blog" class="nav-link text-2xl" on:click={toggleMenu}>Blog</a>
    <a href="/about" class="nav-link text-2xl" on:click={toggleMenu}>About</a>
    <a href="/contact" class="nav-link text-2xl" on:click={toggleMenu}>Contact</a>
  </div>
{/if} 