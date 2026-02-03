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
        title: "Hello, I'm <span class='text-secondary'>Sergio</span>",
        description: `Passionate about developing conversational interfaces. Currently CTO at DailyBot building an assistant for asynchronous team collaboration.<br /><br />
Computer science engineer, MSc in data science and passionate entrepreneur, with talent and more than 10 years of experience building digital businesses. In the search for the ideation of disruptive business models as agents of change and success.<br /><br />
\u{1F4BB}\u{1F399}\u{1F4DA} | Speaker, researcher, athlete, gamer, and geek 100%.`,
        cta: 'Learn more about me',
        cta2: 'View my CV',
      },
      dailybot: {
        title: 'DailyBot (YC S21)',
        subtitle: 'CTO & Cofounder',
        description:
          'I have led the development of an innovative platform that connects teams globally, facilitating collaboration and effective communication between members. In 2021, we were selected by Y Combinator, which allowed us to accelerate our growth, improve our technological capabilities and reinforce our focus on customer satisfaction. \u{1F680}',
        cta: 'Learn more about DailyBot',
      },
      techTalks: {
        title: 'Tech Talks',
        subtitle: 'Cofounder & Speaker',
        description:
          'As cofounder and organizer of the Pereira Tech Talks community, I have driven the creation of spaces to share knowledge and connect technology professionals. I have had the opportunity to be a speaker at multiple technical talks, where I enjoy sharing experiences and learning alongside the community.',
        cta: 'Learn more about my talks',
      },
      maker: {
        title: 'Maker',
        subtitle: 'Tech enthusiast, AI & Project developer',
        description:
          'As a technology and artificial intelligence enthusiast, I have led and developed multiple innovative projects, exploring various technologies to create digital applications and high-impact technical solutions. My passion for innovation and constant learning drives me to always be at the forefront, researching new tools and trends to transform ideas into tangible realities. I enjoy tackling complex challenges and adding value through technology.',
        cta: 'View my projects',
      },
      trading: {
        title: 'Trading',
        subtitle: 'Enthusiastic trader & Algorithmic trading learner',
        description:
          'As an enthusiastic trader, I have dedicated the last two years to training in the foreign exchange market (forex) and deepening my knowledge of algorithmic trading, with the goal of optimizing and automating my investment strategies. I am motivated by continuous learning and financial market research, always looking for new tools and approaches to improve my performance and make more informed decisions.',
        cta: 'Learn more about me',
      },
      foodie: {
        title: 'Foodie Enthusiast',
        subtitle: 'Content creator & Foodie lover',
        description:
          'Beyond technology, I am a passionate content creator and food lover. I enjoy exploring new places to eat, sharing recommendations and culinary experiences, and connecting with people through my social media. I am motivated to inspire others to discover unique places and live new experiences, combining my enthusiasm for communication, creativity and good food.',
        cta: 'Learn more about me',
      },
      hobbies: {
        title: 'Hobbies',
        subtitle: 'Sports and active lifestyle enthusiast',
        description:
          'Outside the professional world, I am passionate about sports and wellness. I enjoy cycling around the city and staying active through running, basketball and chess. Additionally, I find in video games a form of entertainment and mental challenge. Sports are a fundamental part of my life, as they inspire me to constantly improve and maintain a healthy balance.',
        cta: 'Learn more about me',
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
        description: `Apasionado por el desarrollo de interfaces conversacionales. Actualmente CTO en DailyBot construyendo un asistente para la colaboraci\u00F3n asincr\u00F3nica de equipos.<br /><br />
Ingeniero en ciencias de la computaci\u00F3n, MSc en ciencia de datos y emprendedor apasionado, con talento y m\u00E1s de 10 a\u00F1os de experiencia construyendo negocios digitales. En la b\u00FAsqueda de la ideaci\u00F3n de modelos de negocio disruptivos como agentes de cambio y \u00E9xito.<br /><br />
\u{1F4BB}\u{1F399}\u{1F4DA} | Speaker, investigador, atleta, gamer y geek al 100%.`,
        cta: 'Conoce m\u00E1s sobre m\u00ED',
        cta2: 'Ver mi CV',
      },
      dailybot: {
        title: 'DailyBot (YC S21)',
        subtitle: 'CTO & Cofundador',
        description:
          'He liderado el desarrollo de una plataforma innovadora que conecta equipos globalmente, facilitando la colaboraci\u00F3n y comunicaci\u00F3n efectiva entre miembros. En 2021, fuimos seleccionados por Y Combinator, lo que nos permiti\u00F3 acelerar nuestro crecimiento, mejorar nuestras capacidades tecnol\u00F3gicas y reforzar nuestro enfoque en la satisfacci\u00F3n del cliente. \u{1F680}',
        cta: 'Conoce m\u00E1s sobre DailyBot',
      },
      techTalks: {
        title: 'Tech Talks',
        subtitle: 'Cofundador & Speaker',
        description:
          'Como cofundador y organizador de la comunidad Pereira Tech Talks, he impulsado la creaci\u00F3n de espacios para compartir conocimiento y conectar a profesionales de tecnolog\u00EDa. He tenido la oportunidad de ser speaker en m\u00FAltiples charlas t\u00E9cnicas, donde disfruto compartir experiencias y aprender junto a la comunidad.',
        cta: 'Conoce m\u00E1s sobre mis charlas',
      },
      maker: {
        title: 'Maker',
        subtitle:
          'Entusiasta de la tecnolog\u00EDa, IA & Desarrollador de proyectos',
        description:
          'Como entusiasta de la tecnolog\u00EDa y la inteligencia artificial, he liderado y desarrollado m\u00FAltiples proyectos innovadores, explorando diversas tecnolog\u00EDas para crear aplicaciones digitales y soluciones t\u00E9cnicas de alto impacto. Mi pasi\u00F3n por la innovaci\u00F3n y el aprendizaje constante me impulsa a estar siempre a la vanguardia, investigando nuevas herramientas y tendencias para transformar ideas en realidades tangibles. Disfruto enfrentar desaf\u00EDos complejos y aportar valor a trav\u00E9s de la tecnolog\u00EDa.',
        cta: 'Ver mis proyectos',
      },
      trading: {
        title: 'Trading',
        subtitle: 'Trader entusiasta & Aprendiz de trading algor\u00EDtmico',
        description:
          'Como trader entusiasta, he dedicado los \u00FAltimos dos a\u00F1os a formarme en el mercado de divisas (forex) y a profundizar en el trading algor\u00EDtmico, con el objetivo de optimizar y automatizar mis estrategias de inversi\u00F3n. Me motiva el aprendizaje continuo y la investigaci\u00F3n de los mercados financieros, siempre en busca de nuevas herramientas y enfoques que me permitan mejorar mi desempe\u00F1o y tomar decisiones m\u00E1s informadas.',
        cta: 'Conoce m\u00E1s sobre m\u00ED',
      },
      foodie: {
        title: 'Foodie Enthusiast',
        subtitle: 'Creador de contenido & Foodie lover',
        description:
          'M\u00E1s all\u00E1 de la tecnolog\u00EDa, soy un apasionado creador de contenido y amante de la gastronom\u00EDa. Disfruto explorar nuevos lugares para comer, compartir recomendaciones y experiencias culinarias, y conectar con personas a trav\u00E9s de mis redes sociales. Me motiva inspirar a otros a descubrir sitios \u00FAnicos y vivir nuevas experiencias, combinando mi entusiasmo por la comunicaci\u00F3n, la creatividad y el buen comer.',
        cta: 'Conoce m\u00E1s sobre m\u00ED',
      },
      hobbies: {
        title: 'Hobbies',
        subtitle: 'Apasionado del deporte y la vida activa',
        description:
          'Fuera del mundo profesional, soy un apasionado del deporte y el bienestar. Disfruto recorrer la ciudad en bicicleta y mantenerme activo a trav\u00E9s del running, el baloncesto y el ajedrez. Adem\u00E1s, encuentro en los videojuegos una forma de entretenimiento y desaf\u00EDo mental. El deporte es una parte fundamental de mi vida, ya que me inspira a superarme constantemente y a mantener un equilibrio saludable.',
        cta: 'Conoce m\u00E1s sobre m\u00ED',
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
