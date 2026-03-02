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
// Form only loads when formUrl is provided
export const CONTACT_FORM = {
  googleForms: {
    formUrl: import.meta.env.PUBLIC_GOOGLE_FORM_URL || '',
    entries: {
      name: import.meta.env.PUBLIC_GOOGLE_FORM_ENTRY_NAME || '',
      email: import.meta.env.PUBLIC_GOOGLE_FORM_ENTRY_EMAIL || '',
      reason: import.meta.env.PUBLIC_GOOGLE_FORM_ENTRY_REASON || '',
      subject: import.meta.env.PUBLIC_GOOGLE_FORM_ENTRY_SUBJECT || '',
      message: import.meta.env.PUBLIC_GOOGLE_FORM_ENTRY_MESSAGE || '',
    },
  },
} as const;
