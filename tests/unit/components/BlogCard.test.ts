import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import BlogCard from '@/components/blog/BlogCard.svelte';

import {
	demoEnglishPost,
	draftPost,
	minimalPost,
	publishedEnglishPost,
	publishedSpanishPost,
	scheduledPost,
} from '../../fixtures/posts';

// ─── Basic rendering ───────────────────────────────────

describe('BlogCard', () => {
	describe('basic rendering', () => {
		it('renders post title', () => {
			render(BlogCard, {
				props: { post: publishedEnglishPost as never },
			});
			expect(screen.getByText('My Awesome Post')).toBeDefined();
		});

		it('renders post description', () => {
			render(BlogCard, {
				props: { post: publishedEnglishPost as never },
			});
			expect(
				screen.getByText('A published English blog post for testing'),
			).toBeDefined();
		});

		it('generates correct link URL for English post', () => {
			render(BlogCard, {
				props: { post: publishedEnglishPost as never, lang: 'en' },
			});
			const link = screen.getByText('My Awesome Post').closest('a');
			expect(link?.getAttribute('href')).toBe('/blog/my-awesome-post/');
		});

		it('generates correct link URL for Spanish post', () => {
			render(BlogCard, {
				props: { post: publishedSpanishPost as never, lang: 'es' },
			});
			const link = screen.getByText('Mi Post Increible').closest('a');
			expect(link?.getAttribute('href')).toBe(
				'/es/blog/mi-post-increible/',
			);
		});

		it('renders the post date', () => {
			const { container } = render(BlogCard, {
				props: { post: publishedEnglishPost as never },
			});
			const timeEl = container.querySelector('time');
			expect(timeEl).toBeDefined();
			expect(timeEl?.textContent).toBeTruthy();
		});
	});

	// ─── Hero image ────────────────────────────────────

	describe('hero image', () => {
		it('renders hero image when heroImage is provided', () => {
			render(BlogCard, {
				props: { post: publishedEnglishPost as never },
			});
			const img = screen.getByAltText('My Awesome Post');
			expect(img).toBeDefined();
			expect(img.getAttribute('src')).toBe(
				'/images/blog/posts/my-awesome-post/hero.jpg',
			);
		});

		it('does not render img element when heroImage is not provided', () => {
			const { container } = render(BlogCard, {
				props: { post: minimalPost as never },
			});
			expect(container.querySelector('img')).toBeNull();
		});
	});

	// ─── Tags ──────────────────────────────────────────

	describe('tags', () => {
		it('renders tag links when tags are provided', () => {
			render(BlogCard, {
				props: { post: publishedEnglishPost as never },
			});
			// Tags are rendered as links with # prefix
			const tagLinks = screen.getAllByText(/#(tech|astro)/);
			expect(tagLinks.length).toBeGreaterThan(0);
		});

		it('does not render tag elements when no tags', () => {
			const { container } = render(BlogCard, {
				props: { post: minimalPost as never },
			});
			// Tag links have href containing /blog/tag/
			const tagLinks = container.querySelectorAll('a[href*="/blog/tag/"]');
			expect(tagLinks).toHaveLength(0);
		});
	});

	// ─── Status badges ─────────────────────────────────

	describe('status badges', () => {
		it('shows draft badge for draft posts when isDev=true', () => {
			const { container } = render(BlogCard, {
				props: { post: draftPost as never, isDev: true },
			});
			// PostStatusBadge renders badge text from translations
			expect(container.textContent).toContain('Draft');
		});

		it('does not show badges when isDev=false', () => {
			const { container } = render(BlogCard, {
				props: { post: draftPost as never, isDev: false },
			});
			// No PostStatusBadge span should be rendered
			const badges = container.querySelectorAll('.border.rounded-md');
			expect(badges).toHaveLength(0);
		});

		it('shows demo badge for demo posts when isDev=true', () => {
			const { container } = render(BlogCard, {
				props: { post: demoEnglishPost as never, isDev: true },
			});
			expect(container.textContent).toContain('Demo');
		});
	});

	// ─── Preview mode ──────────────────────────────────

	describe('preview mode', () => {
		it('appends ?preview=all to tag URLs when isPreviewMode=true', () => {
			const { container } = render(BlogCard, {
				props: {
					post: publishedEnglishPost as never,
					isPreviewMode: true,
				},
			});
			const tagLinks = container.querySelectorAll('a[href*="/blog/tag/"]');
			for (const link of tagLinks) {
				expect(link.getAttribute('href')).toContain('?preview=all');
			}
		});

		it('does not append query string when isPreviewMode=false', () => {
			const { container } = render(BlogCard, {
				props: {
					post: publishedEnglishPost as never,
					isPreviewMode: false,
				},
			});
			const tagLinks = container.querySelectorAll('a[href*="/blog/tag/"]');
			for (const link of tagLinks) {
				expect(link.getAttribute('href')).not.toContain('?preview=all');
			}
		});
	});
});
