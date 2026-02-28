<script lang="ts">
/**
 * Minimal image lightbox for blog posts.
 * - Uses event delegation on article images
 * - Native <dialog> for accessibility (focus trap, Escape)
 * - Slider with prev/next for multiple images
 * - client:idle for performance
 */
import { onMount } from 'svelte';

interface ImageInfo {
  src: string;
  alt: string;
}

let dialog: HTMLDialogElement;
let images: ImageInfo[] = [];
let currentIndex = 0;
let currentAlt = '';
let touchStartX = 0;

function getImageSrc(img: HTMLImageElement): string {
  return img.currentSrc || img.src;
}

function openLightbox(img: HTMLImageElement): void {
  const article = document.querySelector('main article');
  if (!article) return;

  const allImgs = Array.from(
    article.querySelectorAll<HTMLImageElement>('img')
  ).filter((i) => !i.closest('aside'));
  images = allImgs.map((i) => ({ src: getImageSrc(i), alt: i.alt || '' }));
  currentIndex = allImgs.indexOf(img);
  currentAlt = img.alt || '';
  if (currentIndex < 0) currentIndex = 0;

  dialog?.showModal();
}

function handleImageActivate(e: Event): void {
  const target = e.target as HTMLElement;
  const img = target.closest('img');
  if (!img || img.closest('aside')) return;

  e.preventDefault();
  e.stopPropagation();
  openLightbox(img);
}

function goPrev(): void {
  currentIndex = currentIndex <= 0 ? images.length - 1 : currentIndex - 1;
  currentAlt = images[currentIndex]?.alt ?? '';
}

function goNext(): void {
  currentIndex = currentIndex >= images.length - 1 ? 0 : currentIndex + 1;
  currentAlt = images[currentIndex]?.alt ?? '';
}

function handleKeydown(e: KeyboardEvent): void {
  if (!dialog?.open) return;
  if (e.key === 'Escape') {
    dialog.close();
    return;
  }
  if (e.key === 'ArrowLeft') {
    goPrev();
    e.preventDefault();
  }
  if (e.key === 'ArrowRight') {
    goNext();
    e.preventDefault();
  }
}

function handleBackdropClick(): void {
  dialog?.close();
}

function handleTouchStart(e: TouchEvent): void {
  touchStartX = e.touches[0]?.clientX ?? 0;
}

function handleTouchEnd(e: TouchEvent): void {
  const touchEndX = e.changedTouches[0]?.clientX ?? 0;
  const diff = touchStartX - touchEndX;
  const threshold = 50;
  if (Math.abs(diff) > threshold) {
    if (diff > 0) goNext();
    else goPrev();
  }
}

function handleImageKeydown(e: KeyboardEvent): void {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleImageActivate(e as unknown as Event);
  }
}

onMount(() => {
  document.addEventListener('keydown', handleKeydown);
  const article = document.querySelector('main article');
  if (!article) return;
  const imgs = Array.from(
    article.querySelectorAll<HTMLImageElement>('img')
  ).filter((img) => !img.closest('aside'));
  const activateHandler = handleImageActivate as EventListener;
  const keydownHandler = handleImageKeydown as EventListener;
  for (const img of imgs) {
    img.style.cursor = 'zoom-in';
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-label', img.alt || 'View image full size');
    img.addEventListener('click', activateHandler);
    img.addEventListener('keydown', keydownHandler);
  }
  return () => {
    document.removeEventListener('keydown', handleKeydown);
    for (const img of imgs) {
      img.style.cursor = '';
      img.removeAttribute('role');
      img.removeAttribute('tabindex');
      img.removeAttribute('aria-label');
      img.removeEventListener('click', activateHandler);
      img.removeEventListener('keydown', keydownHandler);
    }
  };
});
</script>

<dialog
	bind:this={dialog}
	class="lightbox-dialog"
	aria-modal="true"
	aria-label="Image viewer"
>
	<button
		type="button"
		class="lightbox-backdrop"
		aria-label="Close"
		on:click={handleBackdropClick}
	></button>
	<div class="lightbox-content" role="presentation">
		{#if images.length > 0}
			<button
				type="button"
				class="lightbox-nav lightbox-prev"
				aria-label="Previous image"
				on:click={goPrev}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<polyline points="15 18 9 12 15 6" />
				</svg>
			</button>
			<div
				class="lightbox-image-wrap"
				role="region"
				aria-label="Image gallery"
				on:click={handleBackdropClick}
				on:touchstart={handleTouchStart}
				on:touchend={handleTouchEnd}
			>
				<img
					src={images[currentIndex]?.src}
					alt={currentAlt}
					class="lightbox-image"
					loading="eager"
					decoding="async"
					on:click|stopPropagation
				/>
			</div>
			<button
				type="button"
				class="lightbox-nav lightbox-next"
				aria-label="Next image"
				on:click={goNext}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<polyline points="9 18 15 12 9 6" />
				</svg>
			</button>
		{/if}
	</div>
	{#if images.length > 1}
		<div class="lightbox-counter" aria-live="polite">
			{currentIndex + 1} / {images.length}
		</div>
	{/if}
	<button
		type="button"
		class="lightbox-close"
		aria-label="Close"
		on:click={() => dialog?.close()}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	</button>
</dialog>

<style>
	.lightbox-dialog {
		margin: 0;
		padding: 0;
		border: none;
		inset: 0;
		width: 100%;
		height: 100%;
		max-width: 100vw;
		max-width: 100dvw;
		max-height: 100vh;
		max-height: 100dvh;
		background: transparent;
	}

	.lightbox-dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}

	.lightbox-backdrop {
		position: absolute;
		inset: 0;
		z-index: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		border: none;
		background: rgba(0, 0, 0, 0.45);
		cursor: pointer;
	}

	.lightbox-content {
		position: absolute;
		inset: 0;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right))
			max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
		box-sizing: border-box;
	}

	.lightbox-nav,
	.lightbox-close,
	.lightbox-counter,
	.lightbox-image-wrap {
		pointer-events: auto;
	}

	.lightbox-image-wrap {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 0;
		min-height: 0;
		max-width: min(90vw, 1200px);
		max-height: min(85vh, 85dvh);
		touch-action: pan-y;
	}

	.lightbox-image {
		max-width: 100%;
		max-height: min(85vh, 85dvh);
		width: auto;
		height: auto;
		object-fit: contain;
	}

	.lightbox-nav {
		position: absolute;
		z-index: 2;
		top: 50%;
		transform: translateY(-50%);
		width: 3rem;
		height: 3rem;
		min-width: 44px;
		min-height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border: none;
		border-radius: 50%;
		color: white;
		cursor: pointer;
		transition: background 0.15s ease;
		flex-shrink: 0;
		touch-action: manipulation;
	}

	.lightbox-nav:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.lightbox-nav:focus-visible {
		outline: 2px solid white;
		outline-offset: 2px;
	}

	.lightbox-prev {
		left: max(0.5rem, env(safe-area-inset-left));
	}

	.lightbox-next {
		right: max(0.5rem, env(safe-area-inset-right));
	}

	.lightbox-close {
		position: absolute;
		z-index: 2;
		top: max(1rem, env(safe-area-inset-top));
		right: max(1rem, env(safe-area-inset-right));
		width: 2.5rem;
		height: 2.5rem;
		min-width: 44px;
		min-height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border: none;
		border-radius: 50%;
		color: white;
		cursor: pointer;
		transition: background 0.15s ease;
		touch-action: manipulation;
	}

	.lightbox-close:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.lightbox-close:focus-visible {
		outline: 2px solid white;
		outline-offset: 2px;
	}

	.lightbox-counter {
		position: absolute;
		z-index: 2;
		bottom: max(1rem, env(safe-area-inset-bottom));
		left: 50%;
		transform: translateX(-50%);
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.875rem;
	}

	@media (max-width: 640px) {
		.lightbox-content {
			padding: max(0.5rem, env(safe-area-inset-top)) max(0.5rem, env(safe-area-inset-right))
				max(0.5rem, env(safe-area-inset-bottom)) max(0.5rem, env(safe-area-inset-left));
		}

		.lightbox-image-wrap {
			max-width: 95vw;
			max-height: min(80vh, 80dvh);
		}

		.lightbox-image {
			max-height: min(80vh, 80dvh);
		}

		.lightbox-prev {
			left: max(0.25rem, env(safe-area-inset-left));
		}

		.lightbox-next {
			right: max(0.25rem, env(safe-area-inset-right));
		}

		.lightbox-nav {
			width: 2.75rem;
			height: 2.75rem;
		}

		.lightbox-close {
			top: max(0.5rem, env(safe-area-inset-top));
			right: max(0.5rem, env(safe-area-inset-right));
		}

		.lightbox-counter {
			bottom: max(0.5rem, env(safe-area-inset-bottom));
		}
	}

	@media (max-width: 380px) {
		.lightbox-nav {
			width: 2.5rem;
			height: 2.5rem;
		}

		.lightbox-image-wrap {
			max-width: 98vw;
		}
	}
</style>
