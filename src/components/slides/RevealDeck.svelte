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
  let slidesWrapCleanup: Element | null = null;
  let navigateClickHandler: ((ev: Event) => void) | undefined;

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
     * Click-to-advance: single click on slide content goes to next fragment or slide,
     * matching common presentation UX (arrows / space unchanged).
     * Ignores real links, in-deck hash links, buttons, inputs, and media embeds.
     */
    const slidesWrap = revealEl.querySelector('.slides');
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

      return false;
    }

    if (slidesWrap) {
      navigateClickHandler = (ev: Event) => {
        if (!(ev instanceof MouseEvent)) return;
        if (shouldIgnoreNavigateClick(ev, ev.target)) return;
        deck.next();
      };
      slidesWrap.addEventListener('click', navigateClickHandler);
      slidesWrapCleanup = slidesWrap;
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
    if (slidesWrapCleanup && navigateClickHandler) {
      slidesWrapCleanup.removeEventListener('click', navigateClickHandler);
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
