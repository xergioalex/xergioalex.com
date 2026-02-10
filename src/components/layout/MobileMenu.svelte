<script lang="ts">
import { onDestroy, onMount } from 'svelte';
import { slide } from 'svelte/transition';
import { getTranslations } from '@/lib/translations';

export let lang: string = 'en';
export let open: boolean;
export let toggleMenu: () => void;
let aboutOpen = false;
let languageOpen = false;
let lockedScrollY = 0;
let isScrollLocked = false;

$: t = getTranslations(lang);
$: prefix = lang === 'es' ? '/es' : '';

function lockBodyScroll() {
  if (isScrollLocked) return;
  lockedScrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  isScrollLocked = true;
}

function unlockBodyScroll() {
  if (!isScrollLocked) return;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo(0, lockedScrollY);
  isScrollLocked = false;
}

// Lock body scroll when menu is open
$: if (typeof document !== 'undefined') {
  if (open) {
    lockBodyScroll();
  } else {
    unlockBodyScroll();
  }
}

// Language switch URL - computed on mount from current page path
let switchUrl: string = lang === 'es' ? '/' : '/es';

onMount(() => {
  const path = window.location.pathname;
  if (lang === 'es') {
    switchUrl =
      path === '/es' || path === '/es/'
        ? '/'
        : path.replace(/^\/es/, '') || '/';
  } else {
    switchUrl = path === '/' ? '/es' : `/es${path}`;
  }
});

onDestroy(() => {
  if (typeof document !== 'undefined') {
    unlockBodyScroll();
  }
});
</script>

{#if open}
  <div class="fixed inset-0 z-50 bg-main/95 flex flex-col items-center justify-start pt-20 gap-6 overflow-y-auto overscroll-contain transition-all duration-300 md:hidden">
    <button
      class="absolute top-6 right-6 p-2"
      aria-label="Close menu"
      on:click={toggleMenu}
      type="button"
    >
      <!-- Close icon (X) -->
      <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <a href={prefix || '/'} class="nav-link text-2xl text-center">{t.nav.home}</a>
    <a href="{prefix}/blog" class="nav-link text-2xl text-center">{t.nav.blog}</a>
    <a href="{prefix}/portfolio" class="nav-link text-2xl text-center">{t.nav.portfolio}</a>
    <button
      class="nav-link text-2xl text-center flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
      on:click={() => aboutOpen = !aboutOpen}
      aria-expanded={aboutOpen}
      aria-controls="about-dropdown"
      type="button"
    >
      {t.nav.about}
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
        <a href="{prefix}/about" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">{t.nav.aboutMe}</a>
        <a href="{prefix}/cv" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">{t.nav.cv}</a>
        <a href="{prefix}/dailybot" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">{t.nav.dailybot}</a>
        <a href="{prefix}/entrepreneur" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">{t.nav.entrepreneur}</a>
        <a href="{prefix}/techtalks" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">{t.nav.techTalks}</a>
        <a href="{prefix}/maker" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">{t.nav.maker}</a>
        <a href="{prefix}/trading" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">{t.nav.trading}</a>
        <a href="{prefix}/foodie" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">{t.nav.foodie}</a>
        <a href="{prefix}/hobbies" class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition">{t.nav.hobbies}</a>
      </div>
    {/if}
    <a href="{prefix}/contact" class="nav-link text-2xl text-center">{t.nav.contact}</a>
    <button
      class="nav-link text-2xl text-center flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
      on:click={() => languageOpen = !languageOpen}
      aria-expanded={languageOpen}
      aria-controls="language-dropdown"
      type="button"
    >
      {#if lang === "es"}
        <span role="img" aria-label="Spanish">🇪🇸</span> ES
      {:else}
        <span role="img" aria-label="English">🇬🇧</span> EN
      {/if}
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
        {#if lang === "es"}
          <a href={switchUrl} class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition flex items-center gap-2" on:click={toggleMenu}>
            <span role="img" aria-label="English">🇬🇧</span> English
          </a>
        {:else}
          <a href={switchUrl} class="nav-link text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition flex items-center gap-2" on:click={toggleMenu}>
            <span role="img" aria-label="Spanish">🇪🇸</span> Español
          </a>
        {/if}
      </div>
    {/if}
  </div>
{/if}
