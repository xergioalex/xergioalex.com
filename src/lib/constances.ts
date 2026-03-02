export const SITE_TITLE: string =
  'XergioAleX - CTO & Co-founder at DailyBot (YC S21)';
export const SITE_DESCRIPTION: string =
  'Sergio Alexander Florez Galeano — CTO & Co-founder at DailyBot (YC S21). Full Stack Developer, MSc in Data Science, speaker, maker, and tech entrepreneur with 14+ years building digital products.';
export const BLOG_PAGE_SIZE: number = 30;

// Analytics configuration — scripts load only when IDs are provided
export const ANALYTICS = {
  umami: {
    websiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || '',
    scriptUrl:
      import.meta.env.PUBLIC_UMAMI_SCRIPT_URL ||
      'https://cloud.umami.is/script.js',
  },
  clarity: {
    projectId: import.meta.env.PUBLIC_CLARITY_PROJECT_ID || '',
  },
  verification: {
    google: import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    bing: import.meta.env.PUBLIC_BING_SITE_VERIFICATION || '',
  },
} as const;

// Contact form configuration — Google Forms direct POST
export const CONTACT_FORM = {
  googleForms: {
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScuGSujpXLKF5eS4Z_6ZGAYf6j1iPrOIHwtJ-3i1_7MGk466Q/formResponse',
    entries: {
      name: 'entry.1008715654',
      email: 'entry.903587259',
      reason: 'entry.677814908',
      subject: 'entry.1738397177',
      message: 'entry.110815800',
    },
  },
} as const;
