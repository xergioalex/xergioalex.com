/**
 * Translation type definitions
 *
 * Defines the shape of all translation objects.
 * Each locale file (en.ts, es.ts) must satisfy the SiteTranslations interface.
 */

export interface PagePassion {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface LanguageSkill {
  language: string;
  level: string;
}

export interface Venture {
  title: string;
  description: string;
  period: string;
}

export interface HighlightItem {
  title: string;
  description: string;
  icon: string;
}

export interface Activity {
  title: string;
  description: string;
  icon: string;
}

export interface SiteTranslations {
  // Site metadata
  siteTitle: string;
  siteTitleFull: string;
  siteDescription: string;

  // Navigation
  nav: {
    home: string;
    blog: string;
    work: string;
    portfolio: string;
    about: string;
    contact: string;
    aboutMe: string;
    cv: string;
    dailybot: string;
    entrepreneur: string;
    techTalks: string;
    maker: string;
    trading: string;
    foodie: string;
    hobbies: string;
  };

  // Footer
  footer: {
    copyright: string;
    allRightsReserved: string;
  };

  // Homepage hero
  hero: {
    tagline: string;
    description: string;
    typewriterWords: string[];
  };

  // Homepage sections
  homeSections: {
    about: {
      title: string;
      description: string;
      cta: string;
      cta2: string;
    };
    dailybot: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    techTalks: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    maker: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    makerHome: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    portfolio: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    trading: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    foodie: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    hobbies: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    builder: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    community: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    beyondCode: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    latestArticles: string;
    viewAllPosts: string;
    portfolioProjectsTitle: string;
    portfolioProjectsViewAll: string;
    portfolioProjectsEmpty: string;
    techTalksPostsTitle: string;
    techTalksPostsViewAll: string;
    techTalksPostsEmpty: string;
    dailybotPostsTitle: string;
    dailybotPostsViewAll: string;
    dailybotPostsEmpty: string;
    tradingPostsTitle: string;
    tradingPostsViewAll: string;
    tradingPostsEmpty: string;
  };

  // Contact section (homepage)
  contact: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
  };

  // About page
  aboutPage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    bioTitle: string;
    bioText: string;
    passionsTitle: string;
    passions: PagePassion[];
    quickFactsTitle: string;
    quickFacts: string[];
    ctaTitle: string;
    ctaDescription: string;
    ctaCv: string;
    ctaContact: string;
  };

  // CV page
  cvPage: {
    title: string;
    subtitle: string;
    description: string;
    summaryTitle: string;
    summaryText: string;
    experienceTitle: string;
    experiences: Experience[];
    educationTitle: string;
    educations: Education[];
    skillsTitle: string;
    skillsIntroText: string;
    skillCategories: SkillCategory[];
    languagesTitle: string;
    languages: LanguageSkill[];
    ctaText: string;
  };

  // DailyBot page
  dailybotPage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    storyTitle: string;
    storyText: string;
    ycTitle: string;
    ycText: string;
    roleTitle: string;
    roleText: string;
    featuresTitle: string;
    features: HighlightItem[];
    timelineTitle: string;
    emptyState: string;
    ctaText: string;
    ctaLink: string;
  };

  // Entrepreneur page
  entrepreneurPage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    journeyTitle: string;
    journeyText: string;
    venturesTitle: string;
    ventures: Venture[];
    philosophyTitle: string;
    philosophyText: string;
    lessonsTitle: string;
    lessons: string[];
  };

  // Tech Talks page
  techTalksPage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    communityTitle: string;
    communityText: string;
    topicsTitle: string;
    topics: HighlightItem[];
    philosophyTitle: string;
    philosophyText: string;
    ctaTitle: string;
    ctaText: string;
    timelineTitle: string;
    emptyState: string;
  };

  // Maker page
  makerPage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    philosophyTitle: string;
    philosophyText: string;
    areasTitle: string;
    areas: HighlightItem[];
    currentTitle: string;
    currentText: string;
    ctaText: string;
    ctaLink: string;
  };

  // Portfolio page
  portfolioPage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    journeyTitle: string;
    journeyText: string;
    areasTitle: string;
    areas: HighlightItem[];
    timelineTitle: string;
    emptyState: string;
  };

  // Trading page
  tradingPage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    journeyTitle: string;
    journeyText: string;
    approachTitle: string;
    approachText: string;
    areasTitle: string;
    areas: HighlightItem[];
    philosophyTitle: string;
    philosophyText: string;
    timelineTitle: string;
    emptyState: string;
  };

  // Foodie page
  foodiePage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    passionTitle: string;
    passionText: string;
    contentTitle: string;
    contentText: string;
    cookingTitle: string;
    cookingText: string;
    highlights: HighlightItem[];
    ctaText: string;
  };

  // Hobbies page
  hobbiesPage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    philosophyTitle: string;
    philosophyText: string;
    activities: Activity[];
    gamingTitle: string;
    gamingText: string;
    readingSciFiTitle: string;
    readingSciFiText: string;
    balanceTitle: string;
    balanceText: string;
  };

  // Contact page
  contactPage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    reasonLabel: string;
    reasonOptions: { value: string; label: string }[];
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    formNote: string;
    socialTitle: string;
    locationTitle: string;
    locationText: string;
  };

  // Homepage Let's Connect section
  contactSection: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  };

  // Search input
  searchPlaceholder: string;
  searchHint: string;
  clearSearch: string;
  resultsFound: (count: number) => string;

  // Loading states
  loadingIndex: string;
  searching: string;

  // Results
  noResults: (query: string) => string;
  noResultsSuggestion: string;
  noPostsAvailable: string;

  // Pagination
  previous: string;
  next: string;
  pageOf: (current: number, total: number) => string;

  // Blog header
  blogTitle: string;
  blogDescription: string;
  allPosts: string;
  showingArticles: (showing: number, total: number) => string;
  articlesAvailable: (total: number) => string;
  lastUpdatedOn: string;
  readingTime: (minutes: number) => string;
  relatedArticles: string;
  relatedArticlesDescription: string;

  // Tags
  postsTagged: (tag: string) => string;
  allTags: string;
  tagNames: Record<string, string>;
  tagDescriptions: Record<string, string>;

  // Date formatting
  dateLocale: string;

  // Read more
  readMore: string;

  // Scroll to timeline
  scrollToTimeline: string;
  viewLabel: (label: string) => string;

  // Post status (dev mode indicators)
  postStatus: {
    draft: string;
    scheduled: string;
    'draft+scheduled': string;
    demo: string;
  };
  previewMode: string;
  showAllPosts: string;
  showPublishedOnly: string;
  publishesOn: string;

  // 404 page
  notFoundPage: {
    title: string;
    description: string;
    heading: string;
    message: string;
    backHome: string;
    searchBlog: string;
  };

  // Errors
  searchError: string;
  loadError: string;
  retry: string;
}
