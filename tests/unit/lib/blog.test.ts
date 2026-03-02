import { describe, expect, it } from 'vitest';

import {
	getPostLanguage,
	getPostSlug,
	getReadingTimeFromContent,
	getWordCount,
	isDemoPost,
} from '@/lib/blog';

import {
	demoEnglishPost,
	demoSpanishPost,
	draftPost,
	emptyContent,
	longContent,
	minimalPost,
	publishedEnglishPost,
	publishedSpanishPost,
	sampleMarkdownContent,
	shortContent,
} from '../../fixtures/posts';

// ─── getPostSlug ────────────────────────────────────────

describe('getPostSlug', () => {
	it('strips language prefix and date prefix from post ID', () => {
		expect(getPostSlug('en/2024-03-15_my-awesome-post')).toBe(
			'my-awesome-post',
		);
	});

	it('strips Spanish language prefix and date prefix', () => {
		expect(getPostSlug('es/2024-03-15_mi-post-increible')).toBe(
			'mi-post-increible',
		);
	});

	it('handles post IDs without date prefix (backwards compatibility)', () => {
		expect(getPostSlug('en/old-post-no-date')).toBe('old-post-no-date');
	});

	it('handles demo post paths with _demo/ subfolder', () => {
		// Extracts clean slug from demo posts (strips _demo/ prefix and date)
		expect(getPostSlug('en/_demo/2024-01-01_demo-post')).toBe('demo-post');
	});

	it('handles post ID without language prefix', () => {
		expect(getPostSlug('2024-03-15_some-post')).toBe('some-post');
	});

	it('returns the full slug for a post with no prefix at all', () => {
		expect(getPostSlug('simple-post')).toBe('simple-post');
	});
});

// ─── getPostLanguage ────────────────────────────────────

describe('getPostLanguage', () => {
	it('extracts "en" from English post ID', () => {
		expect(getPostLanguage('en/2024-03-15_my-post')).toBe('en');
	});

	it('extracts "es" from Spanish post ID', () => {
		expect(getPostLanguage('es/2024-03-15_mi-post')).toBe('es');
	});

	it('extracts "en" from demo post path', () => {
		expect(getPostLanguage('en/_demo/2024-01-01_demo-post')).toBe('en');
	});

	it('returns "en" as default when no language prefix present', () => {
		expect(getPostLanguage('some-post')).toBe('en');
	});
});

// ─── isDemoPost ─────────────────────────────────────────

describe('isDemoPost', () => {
	it('returns true for English demo posts', () => {
		expect(isDemoPost(demoEnglishPost as never)).toBe(true);
	});

	it('returns true for Spanish demo posts', () => {
		expect(isDemoPost(demoSpanishPost as never)).toBe(true);
	});

	it('returns false for regular published posts', () => {
		expect(isDemoPost(publishedEnglishPost as never)).toBe(false);
	});

	it('returns false for draft posts', () => {
		expect(isDemoPost(draftPost as never)).toBe(false);
	});

	it('returns false for minimal posts', () => {
		expect(isDemoPost(minimalPost as never)).toBe(false);
	});
});

// ─── getWordCount ───────────────────────────────────────

describe('getWordCount', () => {
	it('returns 0 for empty content', () => {
		expect(getWordCount(emptyContent)).toBe(0);
	});

	it('counts words in short content', () => {
		expect(getWordCount(shortContent)).toBe(2);
	});

	it('counts words in long content', () => {
		expect(getWordCount(longContent)).toBe(500);
	});

	it('strips markdown formatting from word count', () => {
		const count = getWordCount(sampleMarkdownContent);
		expect(count).toBeGreaterThan(0);
		// Should not count markdown syntax as words
		expect(count).toBeLessThan(sampleMarkdownContent.split(/\s+/).length);
	});

	it('strips code blocks from word count', () => {
		const withCode = '```\nconst x = 1;\n```\nOne two three.';
		expect(getWordCount(withCode)).toBe(3);
	});

	it('strips inline code from word count', () => {
		const withInline = 'Use `const` to declare.';
		const count = getWordCount(withInline);
		expect(count).toBeGreaterThanOrEqual(2);
	});

	it('handles content with only whitespace', () => {
		expect(getWordCount('   \n\n  ')).toBe(0);
	});
});

// ─── getReadingTimeFromContent ──────────────────────────

describe('getReadingTimeFromContent', () => {
	it('returns minimum of 1 minute for short content', () => {
		expect(getReadingTimeFromContent(shortContent)).toBe(1);
	});

	it('returns minimum of 1 minute for empty content', () => {
		expect(getReadingTimeFromContent(emptyContent)).toBe(1);
	});

	it('returns correct reading time for long content (500 words = 3 min)', () => {
		// 500 words / 200 WPM = 2.5, ceil = 3
		expect(getReadingTimeFromContent(longContent)).toBe(3);
	});

	it('returns correct reading time for 200 words (1 minute)', () => {
		const twoHundredWords = Array(200).fill('word').join(' ');
		expect(getReadingTimeFromContent(twoHundredWords)).toBe(1);
	});

	it('returns correct reading time for 201 words (2 minutes)', () => {
		const twoHundredOneWords = Array(201).fill('word').join(' ');
		expect(getReadingTimeFromContent(twoHundredOneWords)).toBe(2);
	});
});
