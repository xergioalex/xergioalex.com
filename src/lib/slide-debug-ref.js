/**
 * Dev-only helper for slide decks (rendered by SlideLayout.astro only when
 * `import.meta.env.DEV`; never part of the production HTML).
 *
 * Wires the toolbar bug button (#debug-copy-slide-ref): clicking it copies a
 * one-line reference to the CURRENT slide to the clipboard, e.g.
 *
 *   [slide-ref] deck=the-art-of-directing-agents lang=es id=S05 position=12/129 text="Mismo modelo."
 *
 * Paste it in a message to a coding agent to point at a slide without context.
 * `id` comes from the slide's `data-slide-id` (generic) or `data-aod-id`
 * (the keynote deck); decks without ids report `id=none` and rely on
 * `position` + `text`. See docs/features/SLIDES.md "Dev-only slide reference".
 */
(() => {
  const button = document.getElementById('debug-copy-slide-ref');
  const toast = document.getElementById('debug-copy-toast');
  if (!button) return;

  let hideTimer = 0;

  const squash = (value) => (value || '').replace(/\s+/g, ' ').trim();

  const currentSlideRef = () => {
    // Leaf sections only: vertical stacks are containers, not slides.
    const leaves = [
      ...document.querySelectorAll('.reveal .slides section'),
    ].filter((section) => !section.querySelector('section'));
    const current = document.querySelector(
      '.reveal .slides section.present:not(.stack)'
    );
    const position = current ? leaves.indexOf(current) + 1 : 0;
    const id = current
      ? current.getAttribute('data-slide-id') ||
        current.getAttribute('data-aod-id') ||
        ''
      : '';
    const notes = current ? current.querySelector('aside.notes') : null;
    let text = current ? squash(current.textContent) : '';
    if (notes) text = text.replace(squash(notes.textContent), '').trim();
    const deck = window.location.pathname.replace(/\/+$/, '').split('/').pop();
    const snippet = text.slice(0, 70).replace(/"/g, "'");
    return `[slide-ref] deck=${deck} lang=${document.documentElement.lang} id=${id || 'none'} position=${position}/${leaves.length} text="${snippet}"`;
  };

  const copyText = (value) => {
    if (navigator.clipboard?.writeText)
      return navigator.clipboard.writeText(value);
    return new Promise((resolve, reject) => {
      const area = document.createElement('textarea');
      area.value = value;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        if (document.execCommand('copy')) resolve();
        else reject(new Error('copy failed'));
      } catch (error) {
        reject(error);
      } finally {
        document.body.removeChild(area);
      }
    });
  };

  button.addEventListener('click', () => {
    const reference = currentSlideRef();
    copyText(reference)
      .then(() => {
        if (!toast) return;
        toast.textContent = `${button.dataset.done} ${
          reference.replace('[slide-ref] ', '').split(' text=')[0]
        }`;
        toast.hidden = false;
        window.clearTimeout(hideTimer);
        hideTimer = window.setTimeout(() => {
          toast.hidden = true;
        }, 2200);
      })
      .catch(() => {
        window.prompt('Slide reference', reference);
      });
  });
})();
