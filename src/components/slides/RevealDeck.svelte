<script lang="ts">
import { onMount } from 'svelte';

interface Props {
  theme?: 'dark' | 'light';
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  syntaxHighlight?: boolean;
  math?: boolean;
  bodyMarkdown: string;
}

let {
  theme = 'dark',
  transition = 'slide',
  syntaxHighlight = true,
  math = false,
  bodyMarkdown,
}: Props = $props();

let containerEl: HTMLDivElement | undefined = $state();
let revealInstance: any = $state(null);
let observer: MutationObserver | undefined = $state();

function syncTheme(): void {
  const isDark = document.documentElement.classList.contains('dark');
  document.body.classList.remove('reveal-theme-dark', 'reveal-theme-light');
  document.body.classList.add(
    isDark ? 'reveal-theme-dark' : 'reveal-theme-light'
  );
}

onMount(() => {
  let destroyed = false;
  let navigateClickRootCleanup: Element | null = null;
  let navigateClickHandler: ((ev: Event) => void) | undefined;
  let teardownOverviewFix: (() => void) | undefined;

  async function init(): Promise<void> {
    const Reveal = (await import('reveal.js')).default;
    const Markdown = (await import('reveal.js/plugin/markdown')).default;
    const Notes = (await import('reveal.js/plugin/notes')).default;

    const plugins = [Markdown, Notes];

    if (syntaxHighlight) {
      const Highlight = (await import('reveal.js/plugin/highlight')).default;
      plugins.push(Highlight);
    }

    if (math) {
      const MathPlugin = (await import('reveal.js/plugin/math')).default;
      plugins.push(MathPlugin);
    }

    if (destroyed) return;

    const revealEl = containerEl?.closest('.reveal') as HTMLElement;
    const textarea = revealEl?.querySelector('textarea[data-template]');
    if (textarea) {
      (textarea as HTMLTextAreaElement).textContent = bodyMarkdown;
    }

    const deck = new Reveal(revealEl, {
      hash: true,
      slideNumber: 'c/t',
      controls: true,
      progress: true,
      transition,
      width: 1280,
      height: 720,
      plugins,
    });

    await deck.initialize();
    revealInstance = deck;

    /**
     * Overview thumbnails fix.
     *
     * Reveal applies the `hidden` HTML attribute to every non-present slide
     * (and inline `style="display:none"` to slides outside the hardcoded
     * overview viewDistance of 10 / 6). The universal CSS reset rule
     * `[hidden]:where(:not([hidden="until-found"])) { display: none !important }`
     * (Tailwind preflight) wins over any author CSS we can write, including
     * `!important` rules with higher specificity, because of how the cascade
     * resolves !important attribute-selector rules. Removing the attribute
     * is the only reliable fix.
     *
     * On `overviewshown` and on every `slidechanged` while overview is
     * active, we strip `hidden` + `aria-hidden` from every section, clear
     * any inline `display:none`, and re-run `loadSlide` so lazy media and
     * `data-background-image` styles get restored on previously-unloaded
     * thumbnails. On `overviewhidden` we let Reveal restore its own state.
     */
    function hydrateAllOverviewSlides(): void {
      if (destroyed || !deck.isOverview()) return;

      for (const slide of deck.getSlides() as HTMLElement[]) {
        deck.loadSlide(slide);
        slide.removeAttribute('hidden');
        slide.removeAttribute('aria-hidden');
        if (slide.style.display === 'none') {
          slide.style.removeProperty('display');
        }
      }
      for (const bg of revealEl.querySelectorAll(
        '.slide-background'
      ) as NodeListOf<HTMLElement>) {
        bg.removeAttribute('hidden');
        if (bg.style.display === 'none') {
          bg.style.removeProperty('display');
        }
      }
    }

    const onOverviewShown = (): void => hydrateAllOverviewSlides();
    const onSlideChanged = (): void => {
      if (deck.isOverview()) hydrateAllOverviewSlides();
    };

    deck.addEventListener('overviewshown', onOverviewShown);
    deck.addEventListener('slidechanged', onSlideChanged);
    teardownOverviewFix = () => {
      deck.removeEventListener('overviewshown', onOverviewShown);
      deck.removeEventListener('slidechanged', onSlideChanged);
    };

    /**
     * Click-to-advance: single click on slide content goes to next fragment or slide,
     * matching common presentation UX (arrows / space unchanged).
     * Ignores real links, in-deck hash links, buttons, inputs, and media embeds.
     */
    function shouldIgnoreNavigateClick(
      ev: MouseEvent,
      target: EventTarget | null
    ): boolean {
      if (!(target instanceof Element)) return true;
      if (
        ev.button !== 0 ||
        ev.ctrlKey ||
        ev.metaKey ||
        ev.shiftKey ||
        ev.altKey
      ) {
        return true;
      }

      /** Overview mode: Reveal's own capture-phase listener navigates to the
       * clicked thumbnail and *deactivates* overview synchronously, then adds
       * the transient `overview-deactivating` class for 1ms. By the time our
       * bubble handler runs, `isOverview()` already returns false but the
       * class is still on `.reveal`, so we have to check both. Without this
       * guard, clicking a thumbnail navigates to it AND then advances one
       * extra slide. */
      if (
        deck.isOverview() ||
        revealEl.classList.contains('overview-deactivating')
      ) {
        return true;
      }

      const a = target.closest('a[href]');
      if (a) {
        const href = a.getAttribute('href') ?? '';
        if (href !== '' && href !== '#') {
          return true;
        }
      }

      if (
        target.closest(
          'button, input, textarea, select, label, iframe, video, audio, summary, details'
        )
      ) {
        return true;
      }

      /** Reveal UI: progress navigates on its own and does not stopPropagation. */
      if (target.closest('.progress, .slide-number')) {
        return true;
      }

      return false;
    }

    /**
     * Attach to `.reveal` (not only `.slides`) so clicks on:
     * - full-bleed `data-background-image` (`.slide-background`, sibling of `.slides`)
     * - letterboxed margins around the scaled 1280×720 canvas
     * still advance. Links and Reveal chrome stay excluded above.
     */
    if (revealEl) {
      navigateClickHandler = (ev: Event) => {
        if (!(ev instanceof MouseEvent)) return;
        if (shouldIgnoreNavigateClick(ev, ev.target)) return;
        deck.next();
      };
      revealEl.addEventListener('click', navigateClickHandler);
      navigateClickRootCleanup = revealEl;
    }

    for (const bg of revealEl.querySelectorAll('.slide-background')) {
      const idx = Array.from(bg.parentElement?.children ?? []).indexOf(bg);
      const section = revealEl.querySelectorAll('.slides > section')[idx];
      if (section?.hasAttribute('data-background-image')) {
        (bg as HTMLElement).style.backgroundColor = '#000';
      }
    }

    syncTheme();
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          syncTheme();
          break;
        }
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  init();

  return () => {
    destroyed = true;
    teardownOverviewFix?.();
    if (navigateClickRootCleanup && navigateClickHandler) {
      navigateClickRootCleanup.removeEventListener(
        'click',
        navigateClickHandler
      );
    }
    if (revealInstance) {
      revealInstance.destroy();
    }
    if (observer) {
      observer.disconnect();
    }
  };
});
</script>

<div class="slides" bind:this={containerEl}>
  <section data-markdown data-separator="^---$" data-separator-vertical="^--$">
    <textarea data-template></textarea>
  </section>
</div>
