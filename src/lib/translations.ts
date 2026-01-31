/**
 * Blog search translations
 * Supports English (en) and Spanish (es)
 */

export type Language = 'en' | 'es';

export interface BlogSearchTranslations {
  // Search input
  searchPlaceholder: string;
  resultsFound: (count: number) => string;

  // Loading states
  loadingIndex: string;
  searching: string;

  // Results
  noResults: (query: string) => string;

  // Pagination
  previous: string;
  next: string;
  pageOf: (current: number, total: number) => string;

  // Blog header
  blogTitle: string;
  blogDescription: string;
  allPosts: string;

  // Tags
  postsTagged: (tag: string) => string;
  allTags: string;

  // Date formatting
  dateLocale: string;

  // Read more
  readMore: string;

  // Errors
  searchError: string;
  loadError: string;
}

const translations: Record<Language, BlogSearchTranslations> = {
  en: {
    // Search input
    searchPlaceholder: 'Search articles...',
    resultsFound: (count) => `${count} result${count !== 1 ? 's' : ''} found`,

    // Loading states
    loadingIndex: 'Loading search index...',
    searching: 'Searching articles...',

    // Results
    noResults: (query) => `No articles found matching "${query}"`,

    // Pagination
    previous: 'Previous',
    next: 'Next',
    pageOf: (current, total) => `Page ${current} of ${total}`,

    // Blog header
    blogTitle: 'Blog',
    blogDescription: 'Articles about technology, programming, and more',
    allPosts: 'All Posts',

    // Tags
    postsTagged: (tag) => `Posts tagged "${tag}"`,
    allTags: 'All Tags',

    // Date formatting
    dateLocale: 'en-US',

    // Read more
    readMore: 'Read more',

    // Errors
    searchError: 'An error occurred while searching. Please try again.',
    loadError: 'Failed to load search index. Please refresh the page.',
  },
  es: {
    // Search input
    searchPlaceholder: 'Buscar artículos...',
    resultsFound: (count) =>
      `${count} resultado${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`,

    // Loading states
    loadingIndex: 'Cargando índice de búsqueda...',
    searching: 'Buscando artículos...',

    // Results
    noResults: (query) =>
      `No se encontraron artículos que coincidan con "${query}"`,

    // Pagination
    previous: 'Anterior',
    next: 'Siguiente',
    pageOf: (current, total) => `Página ${current} de ${total}`,

    // Blog header
    blogTitle: 'Blog',
    blogDescription: 'Artículos sobre tecnología, programación y más',
    allPosts: 'Todos los Posts',

    // Tags
    postsTagged: (tag) => `Posts etiquetados con "${tag}"`,
    allTags: 'Todas las Etiquetas',

    // Date formatting
    dateLocale: 'es-ES',

    // Read more
    readMore: 'Leer más',

    // Errors
    searchError: 'Ocurrió un error al buscar. Por favor intenta de nuevo.',
    loadError:
      'Error al cargar el índice de búsqueda. Por favor recarga la página.',
  },
};

/**
 * Get translations for a specific language
 * @param lang - Language code ('en' or 'es')
 * @returns Translation object for the specified language
 */
export function getTranslations(lang: Language): BlogSearchTranslations {
  return translations[lang] || translations.en;
}

/**
 * Check if a language code is supported
 * @param lang - Language code to check
 * @returns True if the language is supported
 */
export function isValidLanguage(lang: string): lang is Language {
  return lang === 'en' || lang === 'es';
}

/**
 * Get the default language
 * @returns Default language code
 */
export function getDefaultLanguage(): Language {
  return 'en';
}

export default translations;
