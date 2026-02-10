# Features Documentation

This directory contains detailed documentation for specific features implemented in the XergioAleX.com website.

## Available Feature Docs

| Feature | File | Description |
|---------|------|-------------|
| Blog Search | [blog-search.md](./blog-search.md) | Client-side search functionality |
| Dark Mode | [dark-mode.md](./dark-mode.md) | Theme toggle and persistence |
| Internationalization | [i18n.md](./i18n.md) | Multi-language support |
| Pagination | [pagination.md](./pagination.md) | Blog post pagination |
| RSS Feed | [rss-feed.md](./rss-feed.md) | RSS feed generation |

## Feature Documentation Pattern

Each feature document follows this structure:

1. **Overview** - What the feature does
2. **Architecture** - How it's implemented
3. **Components** - Related components and files
4. **Configuration** - How to configure/customize
5. **Usage Examples** - How to use/extend
6. **Related Documentation** - Links to related docs

## Adding New Feature Documentation

1. Create a new markdown file in this directory:
   ```bash
   touch docs/features/new-feature.md
   ```

2. Follow the documentation pattern above

3. Add entry to this README's table

4. Cross-reference from relevant component/page READMEs

## Related Documentation

- [Architecture Guide](../ARCHITECTURE.md)
- [Standards](../STANDARDS.md)
- [Documentation Guide](../DOCUMENTATION_GUIDE.md)
