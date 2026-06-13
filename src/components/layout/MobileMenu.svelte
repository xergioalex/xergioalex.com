<script lang="ts">
import { onDestroy, onMount } from 'svelte';
import { fade } from 'svelte/transition';
import { EVENTS, trackEvent } from '@/lib/analytics';
import {
  getLanguageConfig,
  getSupportedLanguages,
  getUrlPrefix,
  stripLangPrefix,
} from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

export let lang: string = 'en';
export let open: boolean;
export let toggleMenu: () => void;
let workOpen = false;
let aboutOpen = false;
let languageOpen = false;
let lockedScrollY = 0;
let isScrollLocked = false;

$: t = getTranslations(lang);
$: prefix = getUrlPrefix(lang);
$: currentLangConfig = getLanguageConfig(lang);
$: otherLanguages = getSupportedLanguages().filter((l) => l !== lang);

function lockBodyScroll() {
  if (isScrollLocked) return;
  lockedScrollY = window.scrollY;
  isScrollLocked = true;
  // Defer DOM writes to next frame to avoid forced reflow (read/write in same tick as Svelte update)
  requestAnimationFrame(() => {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  });
}

function unlockBodyScroll() {
  if (!isScrollLocked) return;
  const y = lockedScrollY;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  isScrollLocked = false;
  requestAnimationFrame(() => window.scrollTo(0, y));
}

// Lock body scroll when menu is open
$: if (typeof document !== 'undefined') {
  if (open) {
    lockBodyScroll();
  } else {
    unlockBodyScroll();
  }
}

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
    <a href={prefix || '/'} class="nav-link text-xl text-center" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'home', source: 'mobile' })}>{t.nav.home}</a>
    <a href="{prefix}/blog" class="nav-link text-xl text-center" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'blog', source: 'mobile' })}>{t.nav.blog}</a>
    <button
      class="nav-link text-xl text-center flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
      on:click={() => workOpen = !workOpen}
      aria-expanded={workOpen}
      aria-controls="work-dropdown"
      type="button"
    >
      {t.nav.work}
      <svg
        class="w-5 h-5 transition-transform duration-200"
        class:rotate-180={workOpen}
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
        id="work-dropdown"
        class="flex flex-col items-center gap-2 mt-1"
        transition:fade={{ duration: 150 }}
      >
        <a href="{prefix}/portfolio" class="nav-link text-base sm:text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'portfolio', source: 'mobile' })}>{t.nav.portfolio}</a>
        <a href="{prefix}/dailybot" class="nav-link text-base sm:text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'dailybot', source: 'mobile' })}>{t.nav.dailybot}</a>
        <a href="{prefix}/tech-talks" class="nav-link text-base sm:text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'tech_talks', source: 'mobile' })}>{t.nav.techTalks}</a>
        <a href="{prefix}/trading" class="nav-link text-base sm:text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'trading', source: 'mobile' })}>{t.nav.trading}</a>
      </div>
    {/if}
    <button
      class="nav-link text-xl text-center flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
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
        transition:fade={{ duration: 150 }}
      >
        <a href="{prefix}/about" class="nav-link text-base sm:text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'about_me', source: 'mobile' })}>{t.nav.aboutMe}</a>
        <a href="{prefix}/cv" class="nav-link text-base sm:text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'cv', source: 'mobile' })}>{t.nav.cv}</a>
        <a href="{prefix}/entrepreneur" class="nav-link text-base sm:text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'entrepreneur', source: 'mobile' })}>{t.nav.entrepreneur}</a>
        <a href="{prefix}/foodie" class="nav-link text-base sm:text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'foodie', source: 'mobile' })}>{t.nav.foodie}</a>
        <a href="{prefix}/hobbies" class="nav-link text-base sm:text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'hobbies', source: 'mobile' })}>{t.nav.hobbies}</a>
      </div>
    {/if}
    <a href="{prefix}/contact" class="nav-link text-xl text-center" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'contact', source: 'mobile' })}>{t.nav.contact}</a>
    <button
      class="nav-link text-xl text-center flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
      on:click={() => languageOpen = !languageOpen}
      aria-expanded={languageOpen}
      aria-controls="language-dropdown"
      type="button"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      {lang.toUpperCase()}
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
        transition:fade={{ duration: 150 }}
      >
        {#each alternateLanguageUrls as alt}
          <a href={alt.url} class="nav-link text-base sm:text-lg text-gray-300 text-center py-1 hover:text-blue-400 transition flex items-center gap-2" on:click={() => { trackEvent(EVENTS.LANGUAGE_SWITCH, { from: lang, to: alt.lang }); toggleMenu(); }}>
            {alt.nativeName}
          </a>
        {/each}
      </div>
    {/if}
    <a
      href="https://github.com/sponsors/xergioalex"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 mt-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white text-lg font-semibold transition-colors shadow-sm"
      aria-label={t.nav.sponsor}
      on:click={() => { trackEvent(EVENTS.SPONSOR_CLICK, { source: 'mobile' }); toggleMenu(); }}
    >
      <svg class="w-5 h-5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002Z"/>
      </svg>
      {t.nav.sponsor}
    </a>
  </div>
{/if}
