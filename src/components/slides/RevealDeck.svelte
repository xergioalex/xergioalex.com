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

let deckContainer: HTMLDivElement | undefined = $state();
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

  async function init(): Promise<void> {
    const Reveal = (await import('reveal.js')).default;
    const Markdown = (await import('reveal.js/plugin/markdown/markdown'))
      .default;
    const Notes = (await import('reveal.js/plugin/notes/notes')).default;

    const plugins = [Markdown, Notes];

    if (syntaxHighlight) {
      const Highlight = (await import('reveal.js/plugin/highlight/highlight'))
        .default;
      plugins.push(Highlight);
    }

    if (math) {
      const MathPlugin = (await import('reveal.js/plugin/math/math')).default;
      plugins.push(MathPlugin);
    }

    if (destroyed) return;

    const deck = new Reveal(deckContainer?.closest('.reveal') as HTMLElement, {
      hash: true,
      slideNumber: 'c/t',
      controls: true,
      progress: true,
      transition,
      plugins,
      markdown: {
        separator: '^---$',
        separatorVertical: '^--$',
      },
    });

    await deck.initialize();
    revealInstance = deck;

    window.dispatchEvent(new CustomEvent('reveal:ready'));

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
    if (revealInstance) {
      revealInstance.destroy();
    }
    if (observer) {
      observer.disconnect();
    }
  };
});
</script>

<div class="slides" bind:this={deckContainer}>
  <section data-markdown data-separator="^---$" data-separator-vertical="^--$">
    <textarea data-template>{bodyMarkdown}</textarea>
  </section>
</div>
