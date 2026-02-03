/**
 * Site-wide translations
 * Supports English (en) and Spanish (es)
 */

export type Language = 'en' | 'es';

export interface SiteTranslations {
  // Site metadata
  siteTitle: string;
  siteDescription: string;

  // Navigation
  nav: {
    home: string;
    blog: string;
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
    latestArticles: string;
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
    description: string;
  };

  // Contact page
  contactPage: {
    title: string;
    description: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
  };

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
  tagNames: Record<string, string>;
  tagDescriptions: Record<string, string>;

  // Date formatting
  dateLocale: string;

  // Read more
  readMore: string;

  // Errors
  searchError: string;
  loadError: string;
  retry: string;
}

const translations: Record<Language, SiteTranslations> = {
  en: {
    // Site metadata
    siteTitle: 'XergioAleX',
    siteDescription:
      'Personal website and blog by Sergio Alexander Florez Galeano',

    // Navigation
    nav: {
      home: 'Home',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
      aboutMe: 'About Me',
      cv: 'CV',
      dailybot: 'DailyBot',
      entrepreneur: 'Entrepreneur',
      techTalks: 'Tech Talks',
      maker: 'Maker / Builder',
      trading: 'Trading',
      foodie: 'Foodie Enthusiast',
      hobbies: 'Hobbies',
    },

    // Footer
    footer: {
      copyright: 'XergioAleX',
      allRightsReserved: 'All rights reserved.',
    },

    // Homepage hero
    hero: {
      description:
        'CTO & Co-founder at <a href="https://dailybot.com" target="_blank" rel="noopener" class="text-white hover:text-gray-300 transition-colors underline">DailyBot (YC S21)</a> — Full Stack Developer, MSc in Data Science, 10+ years building digital products.',
      typewriterWords: [
        'Full Stack Developer',
        'CTO & Co-founder',
        'Tech Speaker',
        'AI Enthusiast',
        'Maker',
        'Trader',
      ],
    },

    // Homepage sections
    homeSections: {
      about: {
        title: "Hi, I'm <span class='text-secondary'>Sergio</span>",
        description:
          'Computer Science Engineer and MSc in Data Science with 10+ years of experience building digital products. Currently leading technology at DailyBot, a Y Combinator-backed platform for team collaboration.<br /><br />Speaker, open-source contributor, and passionate entrepreneur turning ideas into products that impact thousands of teams worldwide.',
        cta: 'More about me',
        cta2: 'View my CV',
      },
      dailybot: {
        title: "DailyBot <span class='text-secondary'>(YC S21)</span>",
        subtitle: 'CTO & Co-founder',
        description:
          'Leading the development of an AI-powered platform used by thousands of teams worldwide for async collaboration, standups, and workflow automation. Selected by Y Combinator in 2021 (S21 batch), scaling the product from startup to a global SaaS platform.',
        cta: 'Explore DailyBot',
      },
      techTalks: {
        title: 'Tech Talks',
        subtitle: 'Co-founder & Speaker',
        description:
          'Co-founded Pereira Tech Talks, a thriving tech community connecting professionals and sharing knowledge. Speaker at multiple technical conferences covering topics from AI to distributed systems and entrepreneurship.',
        cta: 'See my talks',
      },
      maker: {
        title: 'Maker',
        subtitle: 'AI Enthusiast & Project Builder',
        description:
          'Constantly building and shipping \u2014 from AI-powered applications and open-source tools to experimental side projects. Driven by curiosity and the belief that the best way to learn technology is to build with it.',
        cta: 'View projects',
      },
      trading: {
        title: 'Trading',
        subtitle: 'Algorithmic Trading & Market Research',
        description:
          'Exploring the intersection of technology and financial markets through forex trading and algorithmic strategies. Building automated trading systems and applying data science to market analysis.',
        cta: 'Read my blog',
      },
      foodie: {
        title: 'Foodie',
        subtitle: 'Content Creator & Food Explorer',
        description:
          'Beyond tech, a passionate food content creator exploring the best restaurants and culinary experiences. Sharing recommendations and connecting people through the universal language of good food.',
        cta: 'Follow on Instagram',
      },
      hobbies: {
        title: 'Active Life',
        subtitle: 'Sports & Well-being Enthusiast',
        description:
          'Cycling through the city, running, playing basketball, strategic chess matches, and gaming sessions keep me balanced. Sport is a core part of my life \u2014 a constant reminder that growth happens outside the comfort zone.',
        cta: 'Connect with me',
      },
      latestArticles: 'Latest Articles',
    },

    // Contact section (homepage)
    contact: {
      title: 'Contact',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Write your message...',
      sendButton: 'Send message',
    },

    // About page
    aboutPage: {
      title: 'About Me',
      description: 'Write something about yourself here.',
    },

    // Contact page
    contactPage: {
      title: 'Contact',
      description: 'Get in touch with Sergio Alexander Florez Galeano.',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      sendButton: 'Send',
    },

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
    tagNames: {
      tech: 'Tech',
      personal: 'Personal',
      talks: 'Talks',
      trading: 'Trading',
    },
    tagDescriptions: {
      tech: 'Tutorials, guides, and technical articles.',
      personal: 'Articles about my life and experiences.',
      talks: 'Tech talks, slides, videos, and events.',
      trading: 'Trading journal, analysis, and learnings.',
    },

    // Date formatting
    dateLocale: 'en-US',

    // Read more
    readMore: 'Read more',

    // Errors
    searchError: 'An error occurred while searching. Please try again.',
    loadError: 'Failed to load search index. Please refresh the page.',
    retry: 'Try again',
  },
  es: {
    // Site metadata
    siteTitle: 'XergioAleX',
    siteDescription:
      'Sitio web personal y blog de Sergio Alexander Florez Galeano',

    // Navigation
    nav: {
      home: 'Inicio',
      blog: 'Blog',
      about: 'Acerca de',
      contact: 'Contacto',
      aboutMe: 'Sobre m\u00ED',
      cv: 'CV',
      dailybot: 'DailyBot',
      entrepreneur: 'Emprendedor',
      techTalks: 'Charlas Tech',
      maker: 'Maker / Creador',
      trading: 'Trading',
      foodie: 'Foodie',
      hobbies: 'Hobbies',
    },

    // Footer
    footer: {
      copyright: 'XergioAleX',
      allRightsReserved: 'Todos los derechos reservados.',
    },

    // Homepage hero
    hero: {
      description:
        'CTO y Cofundador en <a href="https://dailybot.com" target="_blank" rel="noopener" class="text-white hover:text-gray-300 transition-colors underline">DailyBot (YC S21)</a> — Desarrollador Full Stack, MSc en Ciencia de Datos, 10+ a\u00F1os construyendo productos digitales.',
      typewriterWords: [
        'Desarrollador Full Stack',
        'CTO y Cofundador',
        'Speaker de Tecnolog\u00EDa',
        'Entusiasta de la IA',
        'Maker',
        'Trader',
      ],
    },

    // Homepage sections
    homeSections: {
      about: {
        title: "Hola, soy <span class='text-secondary'>Sergio</span>",
        description:
          'Ingeniero en Ciencias de la Computaci\u00F3n y MSc en Ciencia de Datos con m\u00E1s de 10 a\u00F1os de experiencia construyendo productos digitales. Actualmente liderando la tecnolog\u00EDa en DailyBot, una plataforma respaldada por Y Combinator para colaboraci\u00F3n en equipos.<br /><br />Speaker, contribuidor open-source y emprendedor apasionado transformando ideas en productos que impactan miles de equipos en todo el mundo.',
        cta: 'M\u00E1s sobre m\u00ED',
        cta2: 'Ver mi CV',
      },
      dailybot: {
        title: "DailyBot <span class='text-secondary'>(YC S21)</span>",
        subtitle: 'CTO y Cofundador',
        description:
          'Liderando el desarrollo de una plataforma impulsada por IA utilizada por miles de equipos en el mundo para colaboraci\u00F3n as\u00EDncrona, standups y automatizaci\u00F3n de flujos de trabajo. Seleccionados por Y Combinator en 2021 (batch S21), escalando el producto de startup a plataforma SaaS global.',
        cta: 'Explorar DailyBot',
      },
      techTalks: {
        title: 'Tech Talks',
        subtitle: 'Cofundador y Speaker',
        description:
          'Cofundador de Pereira Tech Talks, una comunidad tecnol\u00F3gica activa que conecta profesionales y comparte conocimiento. Speaker en m\u00FAltiples conferencias t\u00E9cnicas cubriendo temas desde IA hasta sistemas distribuidos y emprendimiento.',
        cta: 'Ver mis charlas',
      },
      maker: {
        title: 'Maker',
        subtitle: 'Entusiasta de IA y Constructor de Proyectos',
        description:
          'Constantemente construyendo y lanzando \u2014 desde aplicaciones impulsadas por IA y herramientas open-source hasta proyectos experimentales. Impulsado por la curiosidad y la creencia de que la mejor forma de aprender tecnolog\u00EDa es construyendo con ella.',
        cta: 'Ver proyectos',
      },
      trading: {
        title: 'Trading',
        subtitle: 'Trading Algor\u00EDtmico e Investigaci\u00F3n de Mercados',
        description:
          'Explorando la intersecci\u00F3n entre tecnolog\u00EDa y mercados financieros a trav\u00E9s de trading en forex y estrategias algor\u00EDtmicas. Construyendo sistemas de trading automatizado y aplicando ciencia de datos al an\u00E1lisis de mercados.',
        cta: 'Leer mi blog',
      },
      foodie: {
        title: 'Foodie',
        subtitle: 'Creador de Contenido y Explorador Gastron\u00F3mico',
        description:
          'M\u00E1s all\u00E1 de la tecnolog\u00EDa, un apasionado creador de contenido gastron\u00F3mico explorando los mejores restaurantes y experiencias culinarias. Compartiendo recomendaciones y conectando personas a trav\u00E9s del lenguaje universal de la buena comida.',
        cta: 'Seguir en Instagram',
      },
      hobbies: {
        title: 'Vida Activa',
        subtitle: 'Entusiasta del Deporte y el Bienestar',
        description:
          'Recorriendo la ciudad en bicicleta, corriendo, jugando baloncesto, partidas estrat\u00E9gicas de ajedrez y sesiones de gaming me mantienen en equilibrio. El deporte es parte fundamental de mi vida \u2014 un recordatorio constante de que el crecimiento sucede fuera de la zona de confort.',
        cta: 'Conectar conmigo',
      },
      latestArticles: '\u00DAltimos Art\u00EDculos',
    },

    // Contact section (homepage)
    contact: {
      title: 'Contacto',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Email',
      emailPlaceholder: 'tu@email.com',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Escribe tu mensaje...',
      sendButton: 'Enviar mensaje',
    },

    // About page
    aboutPage: {
      title: 'Sobre M\u00ED',
      description: 'Escribe algo sobre ti aqu\u00ED.',
    },

    // Contact page
    contactPage: {
      title: 'Contacto',
      description: 'Ponte en contacto con Sergio Alexander Florez Galeano.',
      namePlaceholder: 'Tu Nombre',
      emailPlaceholder: 'Tu Email',
      messagePlaceholder: 'Tu Mensaje',
      sendButton: 'Enviar',
    },

    // Search input
    searchPlaceholder: 'Buscar art\u00EDculos...',
    resultsFound: (count) =>
      `${count} resultado${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`,

    // Loading states
    loadingIndex: 'Cargando \u00EDndice de b\u00FAsqueda...',
    searching: 'Buscando art\u00EDculos...',

    // Results
    noResults: (query) =>
      `No se encontraron art\u00EDculos que coincidan con "${query}"`,

    // Pagination
    previous: 'Anterior',
    next: 'Siguiente',
    pageOf: (current, total) => `P\u00E1gina ${current} de ${total}`,

    // Blog header
    blogTitle: 'Blog',
    blogDescription:
      'Art\u00EDculos sobre tecnolog\u00EDa, programaci\u00F3n y m\u00E1s',
    allPosts: 'Todos los Posts',

    // Tags
    postsTagged: (tag) => `Posts etiquetados con "${tag}"`,
    allTags: 'Todas las Etiquetas',
    tagNames: {
      tech: 'Tecnolog\u00EDa',
      personal: 'Personal',
      talks: 'Charlas',
      trading: 'Trading',
    },
    tagDescriptions: {
      tech: 'Tutoriales, gu\u00EDas y art\u00EDculos t\u00E9cnicos.',
      personal: 'Art\u00EDculos sobre mi vida y experiencias.',
      talks: 'Charlas t\u00E9cnicas, slides, videos y eventos.',
      trading: 'Diario de trading, an\u00E1lisis y aprendizajes.',
    },

    // Date formatting
    dateLocale: 'es-ES',

    // Read more
    readMore: 'Leer m\u00E1s',

    // Errors
    searchError: 'Ocurri\u00F3 un error al buscar. Por favor intenta de nuevo.',
    loadError:
      'Error al cargar el \u00EDndice de b\u00FAsqueda. Por favor recarga la p\u00E1gina.',
    retry: 'Intentar de nuevo',
  },
};

/**
 * Get translations for a specific language
 * @param lang - Language code ('en' or 'es')
 * @returns Translation object for the specified language
 */
export function getTranslations(lang: Language): SiteTranslations {
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
