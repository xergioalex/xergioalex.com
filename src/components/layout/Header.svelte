<script lang="ts">
import { onMount } from 'svelte';
import {
  getLanguageConfig,
  getSupportedLanguages,
  getUrlPrefix,
  stripLangPrefix,
} from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import MobileMenu from './MobileMenu.svelte';

export let lang: string = 'en';
let open: boolean = false;
let workOpen = false;
let aboutOpen = false;
let languageOpen = false;

$: t = getTranslations(lang);
$: prefix = getUrlPrefix(lang);
$: currentLangConfig = getLanguageConfig(lang);
$: otherLanguages = getSupportedLanguages().filter((l) => l !== lang);

// Alternate language URLs - computed on mount from current page path
let alternateLanguageUrls: {
  lang: string;
  url: string;
  flag: string;
  nativeName: string;
}[] = [];

onMount(() => {
  const path = window.location.pathname;
  const basePath = stripLangPrefix(path);

  alternateLanguageUrls = otherLanguages.map((l) => {
    const config = getLanguageConfig(l);
    const url =
      basePath === '/'
        ? config.urlPrefix || '/'
        : `${config.urlPrefix}${basePath}`;
    return { lang: l, url, flag: config.flag, nativeName: config.nativeName };
  });
});

function toggleMenu() {
  open = !open;
}
</script>

<header class="bg-main text-white sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
  <nav class="main-container flex items-center justify-between">
    <a
      href={prefix || '/'}
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
        <a href={prefix || '/'} class="nav-link">{t.nav.home}</a>
        <a href="{prefix}/blog" class="nav-link">{t.nav.blog}</a>
        <div
          class="relative group"
          role="menu"
          tabindex="0"
          on:mouseenter={() => workOpen = true}
          on:mouseleave={() => workOpen = false}
        >
          <button
            class="nav-link flex items-center gap-1 cursor-pointer select-none"
            aria-expanded={workOpen}
            aria-controls="work-dropdown"
            type="button"
            tabindex="0"
          >
            {t.nav.work}
            <svg
              class="w-4 h-4 transition-transform duration-200"
              style="transform: rotate({workOpen ? '180deg' : '0deg'});"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          {#if workOpen}
            <div
              class="absolute left-1/2 -translate-x-1/2 top-full w-56"
              style="height: 12px; pointer-events: auto;"
            ></div>
            <div
              id="work-dropdown"
              class="absolute left-1/2 -translate-x-1/2 top-full w-56 bg-white dark:bg-gray-800 text-black dark:text-gray-200 rounded shadow-lg z-50 overflow-hidden transition-all duration-200"
              style="pointer-events: auto; opacity: 1; transform: translateY(12px);"
            >
              <a href="{prefix}/portfolio" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition">{t.nav.portfolio}</a>
              <a href="{prefix}/dailybot" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition">{t.nav.dailybot}</a>
              <a href="{prefix}/tech-talks" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition">{t.nav.techTalks}</a>
              <a href="{prefix}/trading" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition">{t.nav.trading}</a>
            </div>
          {/if}
        </div>
        <div
          class="relative group"
          role="menu"
          tabindex="0"
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
            {t.nav.about}
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
              class="absolute left-1/2 -translate-x-1/2 top-full w-56 bg-white dark:bg-gray-800 text-black dark:text-gray-200 rounded shadow-lg z-50 overflow-hidden transition-all duration-200"
              style="pointer-events: auto; opacity: 1; transform: translateY(12px);"
            >
              <a href="{prefix}/about" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition">{t.nav.aboutMe}</a>
              <a href="{prefix}/cv" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition">{t.nav.cv}</a>
              <a href="{prefix}/entrepreneur" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition">{t.nav.entrepreneur}</a>
              <a href="{prefix}/maker" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition">{t.nav.maker}</a>
              <a href="{prefix}/foodie" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition">{t.nav.foodie}</a>
              <a href="{prefix}/hobbies" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition">{t.nav.hobbies}</a>
            </div>
          {/if}
        </div>
        <a href="{prefix}/contact" class="nav-link">{t.nav.contact}</a>
        <div
          class="relative group"
          role="menu"
          tabindex="0"
          on:mouseenter={() => languageOpen = true}
          on:mouseleave={() => languageOpen = false}
        >
          <button
            class="nav-link flex items-center gap-1 cursor-pointer select-none"
            aria-expanded={languageOpen}
            aria-controls="language-dropdown"
            type="button"
            tabindex="0"
          >
            <span role="img" aria-label={currentLangConfig.name}>{currentLangConfig.flag}</span> {lang.toUpperCase()}
            <svg
              class="w-4 h-4 transition-transform duration-200"
              style="transform: rotate({languageOpen ? '180deg' : '0deg'});"
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
              class="absolute left-1/2 -translate-x-1/2 top-full w-40"
              style="height: 12px; pointer-events: auto;"
            ></div>
            <div
              id="language-dropdown"
              class="absolute left-1/2 -translate-x-1/2 top-full w-40 bg-white dark:bg-gray-800 text-black dark:text-gray-200 rounded shadow-lg z-50 overflow-hidden transition-all duration-200"
              style="pointer-events: auto; opacity: 1; transform: translateY(12px);"
            >
              {#each alternateLanguageUrls as alt}
                <a href={alt.url} class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition flex items-center gap-2">
                  <span role="img" aria-label={alt.nativeName}>{alt.flag}</span> {alt.lang.toUpperCase()}
                </a>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
    <!-- Mobile menu button -->
    <button
      class="block md:hidden p-2"
      aria-label="Open menu"
      on:click={toggleMenu}
      type="button"
    >
      <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </nav>
  <MobileMenu {lang} {open} {toggleMenu} />
</header>
