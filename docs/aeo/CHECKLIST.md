# AEO Monthly Maintenance Checklist

**Purpose:** Repeatable checklist to maintain and improve the site's AEO (Answer Engine Optimization) health over time.

## 1. Content Freshness

- [ ] Check if `public/llms.txt` includes all recent blog posts and series chapters
- [ ] Check if `public/llms-full.txt` has accurate descriptions and URLs
- [ ] Verify blog post count in llms files matches actual content (`ls src/content/blog/en/ | grep -v _demo | wc -l`)
- [ ] If new blog posts were added, verify they have complete frontmatter (`title`, `description`, `pubDate`, `tags`, `heroImage`)

## 2. Indexation Health

- [ ] Check Google Search Console for crawl errors: https://search.google.com/search-console
- [ ] Check Bing Webmaster Tools: https://www.bing.com/webmasters
- [ ] Verify indexed page count matches expected (pages + blog posts in both languages)
- [ ] Check for any pages showing "Excluded" or "Not indexed" status

## 3. Sitemap & Robots

- [ ] Verify sitemap is accessible: `curl -s https://xergioalex.com/sitemap-index.xml | head -5`
- [ ] Verify robots.txt is accessible: `curl -s https://xergioalex.com/robots.txt | head -10`
- [ ] Confirm no accidental blocks in robots.txt for content pages
- [ ] Verify sitemap includes `<lastmod>` entries (automatically set at build time)

## 4. Schema Validation

- [ ] Run Rich Results Test on 2-3 pages:
  - Homepage: https://search.google.com/test/rich-results?url=https://xergioalex.com/
  - A blog post: https://search.google.com/test/rich-results?url=https://xergioalex.com/blog/building-multilingual-website/
  - About page: https://search.google.com/test/rich-results?url=https://xergioalex.com/about/
- [ ] Verify JSON-LD is valid (no warnings or errors)
- [ ] Check that BlogPosting schema has: headline, description, datePublished, dateModified, author (with image), publisher

## 5. LLM Testing

Test 5 target queries from `docs/aeo/QUERIES.md` across AI engines:

- [ ] **ChatGPT**: Ask 5 queries. Note: Does it mention xergioalex.com? Does it cite a specific URL?
- [ ] **Claude**: Same 5 queries. Note results.
- [ ] **Perplexity**: Same 5 queries. Note results (Perplexity shows sources explicitly).
- [ ] **Google AI Overview**: Search 3 queries on Google. Check if AI Overview cites the site.

Record results:

| Query | ChatGPT | Claude | Perplexity | Google AI |
|-------|---------|--------|------------|-----------|
| (query 1) | Cited? Y/N | Cited? Y/N | Cited? Y/N | Cited? Y/N |

## 6. Performance

- [ ] Run Lighthouse on homepage: `npm run lighthouse` (or Chrome DevTools)
- [ ] Confirm all scores remain at 100 (or 90+ minimum)
- [ ] Check Core Web Vitals in Google Search Console
- [ ] Verify no new JS was accidentally added (check bundle size)

## 7. RSS & Feeds

- [ ] Verify English RSS: `curl -s https://xergioalex.com/rss.xml | head -20`
- [ ] Verify Spanish RSS: `curl -s https://xergioalex.com/es/rss.xml | head -20`
- [ ] Confirm latest posts appear in feeds

## 8. Quick Local Validation

Run these commands before deploying:

```bash
# Full validation suite
npm run biome:check && npm run astro:check && npm run build && npm run test

# Check llms.txt files are in build output
ls -la dist/llms.txt dist/llms-full.txt

# Verify sitemap has lastmod
grep "lastmod" dist/sitemap-0.xml | head -3

# Check schema in a built blog post
grep "BlogPosting" dist/blog/building-multilingual-website/index.html | head -1
```

## Schedule

| Frequency | Tasks |
|-----------|-------|
| Every deploy | Section 8 (local validation) |
| Monthly | Sections 1-7 (full checklist) |
| Quarterly | Full audit refresh (re-run `/dwp-execute aeo_llm_discoverability` Task 1) |
