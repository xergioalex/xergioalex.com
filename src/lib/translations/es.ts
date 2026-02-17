/**
 * Spanish translations
 */

import type { SiteTranslations } from './types';

export const es: SiteTranslations = {
  // Site metadata
  siteTitle: 'XergioAleX',
  siteTitleFull: 'Sergio Florez — CTO y Cofundador en DailyBot (YC S21)',
  siteDescription:
    'Sitio web personal y blog de Sergio Alexander Florez Galeano',

  // Navigation
  nav: {
    home: 'Inicio',
    blog: 'Blog',
    work: 'Trabajo',
    about: 'Acerca de',
    contact: 'Contacto',
    aboutMe: 'Sobre m\u00ED',
    cv: 'CV',
    dailybot: 'DailyBot',
    entrepreneur: 'Emprendedor',
    techTalks: 'Charlas Tech',
    maker: 'Maker / Creador',
    portfolio: 'Portafolio',
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
    tagline: 'CTO en DailyBot (YC S21) · Creador de 20+ Productos',
    description:
      'Construyo tecnolog\u00EDa que empodera equipos. CTO y Cofundador en <a href="https://dailybot.com" target="_blank" rel="noopener" class="text-white hover:text-gray-300 transition-colors underline">DailyBot (YC S21)</a>, donde ayudamos a miles de equipos a colaborar mejor. M\u00E1s de 10 a\u00F1os creando productos digitales, desde plataformas potenciadas por IA hasta herramientas open source.',
    typewriterWords: [
      'CTO en DailyBot (YC S21)',
      'Creador de 20+ Productos',
      'Fundador de Comunidades',
      'Explorador de IA & Tech',
      'Contribuidor Open Source',
    ],
  },

  // Homepage sections
  homeSections: {
    about: {
      title: "Hola, soy <span class='text-secondary'>Sergio</span>",
      description: `Hoy lidero ingenieria en DailyBot (YC S21), donde me enfoco en estrategia de producto, flujos potenciados por IA y sistemas confiables que ayudan a los equipos a avanzar mas rapido.<br /><br />
Mis fortalezas estan en convertir ideas complejas en productos simples, escalar equipos de ingenieria y ejecutar end-to-end: arquitectura, implementacion e iteracion basada en feedback real de usuarios.<br /><br />
Actualmente estoy enfocado en aplicaciones de IA, productividad para developers y productos de alto impacto que combinan velocidad, calidad y resultados de negocio medibles.`,
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
    makerHome: {
      title: 'Lo Que He Construido',
      subtitle: 'Emprendedor, maker y entusiasta de la tecnolog\u00EDa',
      description:
        'M\u00E1s all\u00E1 de DailyBot, soy emprendedor y maker apasionado por la tecnolog\u00EDa. Construyo proyectos paralelos, exploro IA y contribuyo al open source \u2014 desde Moltbot (IA en Raspberry Pi) hasta Syntro (soporte con IA) y SysPrompt (gesti\u00F3n de prompts para LLMs). Con 113+ repositorios en GitHub, creo que la mejor forma de aprender es construir algo real.',
      cta: 'Explorar mis proyectos',
    },
    portfolio: {
      title: 'Portafolio',
      subtitle: 'Proyectos & Open Source',
      description:
        'Una l\u00EDnea de tiempo curada de mis proyectos personales \u2014 desde software y aplicaciones web hasta rob\u00F3tica y contribuciones open source. Cada proyecto representa un hito en mi camino como maker y desarrollador.',
      cta: 'Explorar mi portafolio',
    },
    trading: {
      title: 'Trading',
      subtitle: 'Trader entusiasta & Aprendiz de trading algor\u00EDtmico',
      description:
        'Como trader entusiasta, he dedicado los \u00FAltimos dos a\u00F1os a formarme en el mercado de divisas (forex) y a profundizar en el trading algor\u00EDtmico, con el objetivo de optimizar y automatizar mis estrategias de inversi\u00F3n. Me motiva el aprendizaje continuo y la investigaci\u00F3n de los mercados financieros, siempre en busca de nuevas herramientas y enfoques que me permitan mejorar mi desempe\u00F1o y tomar decisiones m\u00E1s informadas.',
      cta: 'Conoce m\u00E1s sobre trading',
    },
    foodie: {
      title: 'Foodie Enthusiast',
      subtitle: 'Creador de contenido & Foodie lover',
      description:
        'M\u00E1s all\u00E1 de la tecnolog\u00EDa, soy un apasionado creador de contenido y amante de la gastronom\u00EDa. Disfruto explorar nuevos lugares para comer, compartir recomendaciones y experiencias culinarias, y conectar con personas a trav\u00E9s de mis redes sociales. Me motiva inspirar a otros a descubrir sitios \u00FAnicos y vivir nuevas experiencias, combinando mi entusiasmo por la comunicaci\u00F3n, la creatividad y el buen comer.',
      cta: 'Descubre mi lado foodie',
    },
    hobbies: {
      title: 'Hobbies',
      subtitle: 'Apasionado del deporte y la vida activa',
      description:
        'Fuera del mundo profesional, soy un apasionado del deporte y el bienestar. Disfruto recorrer la ciudad en bicicleta y mantenerme activo a trav\u00E9s del running, el baloncesto y el ajedrez. Adem\u00E1s, encuentro en los videojuegos una forma de entretenimiento y desaf\u00EDo mental. El deporte es una parte fundamental de mi vida, ya que me inspira a superarme constantemente y a mantener un equilibrio saludable.',
      cta: 'Ver mis hobbies',
    },
    builder: {
      title: 'Lo Que Construyo',
      subtitle: 'Desde plataformas con IA hasta herramientas open source',
      description:
        'Construir es lo que mejor hago. Como CTO de <a href="https://dailybot.com" target="_blank" rel="noopener" class="text-gray-900 dark:text-white font-semibold underline hover:no-underline">DailyBot (YC S21)</a>, he dise\u00F1ado la arquitectura de una plataforma utilizada por miles de equipos en Slack, Microsoft Teams y Google Chat. M\u00E1s all\u00E1 de DailyBot, estoy constantemente lanzando proyectos \u2014 desde Moltbot (IA en Raspberry Pi) hasta Syntro (soporte con IA) y SysPrompt (gesti\u00F3n de prompts para LLMs).<br /><br />Con 113+ repositorios en GitHub y proyectos en Python, Go, TypeScript y m\u00E1s, creo que la mejor forma de aprender nueva tecnolog\u00EDa es construir algo real con ella.',
      cta: 'Explorar mis proyectos',
    },
    community: {
      title: 'Comunidad & Charlas',
      subtitle: 'Compartiendo conocimiento, construyendo ecosistemas',
      description:
        'Cofund\u00E9 Pereira Tech Talks, PereiraJS y Python Pereira \u2014 tres comunidades tech dedicadas a conectar profesionales y compartir conocimiento en Colombia. Como speaker, he hablado sobre Docker, arquitecturas serverless, IA conversacional y m\u00E1s en conferencias y meetups. Creo que la tecnolog\u00EDa crece m\u00E1s r\u00E1pido cuando compartimos lo que aprendemos \u2014 por eso escribo este blog y doy charlas.',
      cta: 'Ver mis charlas',
    },
    beyondCode: {
      title: 'M\u00E1s All\u00E1 del C\u00F3digo',
      subtitle: 'Lo que impulsa al constructor',
      description:
        'Cuando no estoy construyendo productos, exploro otras pasiones. Me encanta leer, especialmente ciencia ficci\u00F3n \u2014 Isaac Asimov es uno de mis autores favoritos \u2014 y pel\u00EDculas sobre viajes en el tiempo, futuros dist\u00F3picos y exploraci\u00F3n espacial. Estudio los mercados financieros y el trading algor\u00EDtmico para entender el mundo de los negocios desde otro \u00E1ngulo. Me mantengo activo con ciclismo, running y baloncesto \u2014 el deporte me mantiene con energ\u00EDa y disciplina. Y me encanta descubrir buena comida y compartir hallazgos culinarios. La vida es mejor cuando eres curioso por todo.',
      cta: 'M\u00E1s sobre mis intereses',
    },
    latestArticles: '\u00DAltimos Art\u00EDculos',
    viewAllPosts: 'Ver todos los art\u00EDculos',
    portfolioProjectsTitle: 'Portafolio y Proyectos',
    portfolioProjectsViewAll: 'Ver todos los posts del portafolio',
    portfolioProjectsEmpty: 'Próximamente más proyectos.',
    techTalksPostsTitle: 'Charlas Recientes',
    techTalksPostsViewAll: 'Ver todas las charlas',
    techTalksPostsEmpty: 'Próximamente más charlas.',
    dailybotPostsTitle: 'Últimos Artículos de DailyBot',
    dailybotPostsViewAll: 'Ver todos los artículos de DailyBot',
    dailybotPostsEmpty: 'Próximamente artículos de DailyBot.',
    tradingPostsTitle: 'Diario de Trading',
    tradingPostsViewAll: 'Ver todas las entradas de trading',
    tradingPostsEmpty: 'Próximamente entradas del diario de trading.',
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
    subtitle:
      'Entusiasta de la Tecnolog\u00EDa, Emprendedor y Aprendiz Constante',
    description:
      'Conoce a Sergio Alexander Florez Galeano — CTO, emprendedor, maker y entusiasta de la tecnolog\u00EDa de Colombia.',
    heroDescription:
      'CTO y Cofundador de DailyBot (YC S21). Ingeniero en Ciencias de la Computaci\u00F3n, MSc en Ciencia de Datos, con m\u00E1s de 10 a\u00F1os construyendo productos y negocios digitales.',
    bioTitle: 'Qui\u00E9n Soy',
    bioText:
      'Soy Sergio Alexander Florez Galeano, Ingeniero en Ciencias de la Computaci\u00F3n de la Universidad Nacional de Colombia con una Maestr\u00EDa en Ciencia de Datos. Durante m\u00E1s de una d\u00E9cada, he construido productos digitales, liderado equipos de ingenier\u00EDa y cofundado emprendimientos tecnol\u00F3gicos.<br /><br />Actualmente, soy CTO y Cofundador de DailyBot, una plataforma respaldada por Y Combinator (S21) que ayuda a miles de equipos a colaborar de forma as\u00EDncrona. M\u00E1s all\u00E1 de mi trabajo profesional, soy un maker de coraz\u00F3n — constantemente explorando nuevas tecnolog\u00EDas desde IA e impresi\u00F3n 3D hasta IoT y computaci\u00F3n f\u00EDsica.<br /><br />Tambi\u00E9n soy cofundador de Pereira Tech Talks, una comunidad tech dedicada a conectar profesionales y compartir conocimiento. Creo en aprender cada d\u00EDa, construir cosas desde cero y compartir el camino con otros \u2014 por eso escribo este blog y doy charlas tech.',
    passionsTitle: 'Lo Que Me Mueve',
    passions: [
      {
        title: 'Tecnolog\u00EDa e IA',
        description:
          'Explorando inteligencia artificial, machine learning y tecnolog\u00EDas emergentes para crear soluciones innovadoras.',
        icon: '\u{1F916}',
        link: '/es/maker',
      },
      {
        title: 'Emprendimiento',
        description:
          'Construyendo negocios digitales y transformando ideas en productos que impactan equipos en todo el mundo.',
        icon: '\u{1F680}',
        link: '/es/entrepreneur',
      },
      {
        title: 'Comunidad Tech',
        description:
          'Compartiendo conocimiento a trav\u00E9s de charlas tech, escritura, mentor\u00EDa y construyendo el ecosistema tech local.',
        icon: '\u{1F399}',
        link: '/es/tech-talks',
      },
      {
        title: 'Trading y Mercados',
        description:
          'Estudiando mercados forex, desarrollando estrategias algor\u00EDtmicas y entendiendo la econom\u00EDa global.',
        icon: '\u{1F4C8}',
        link: '/es/trading',
      },
      {
        title: 'Deportes y Naturaleza',
        description:
          'Ciclismo, running, baloncesto y senderismo de monta\u00F1a me mantienen en equilibrio y lleno de energ\u00EDa.',
        icon: '\u{1F6B4}',
        link: '/es/hobbies',
      },
      {
        title: 'Comida y Cultura',
        description:
          'Explorando restaurantes, creando contenido gastron\u00F3mico y experimentando con la cocina en casa.',
        icon: '\u{1F37D}',
        link: '/es/foodie',
      },
    ],
    quickFactsTitle: 'Datos R\u00E1pidos',
    quickFacts: [
      'Ubicado en Colombia',
      'Juegos favoritos: The Legend of Zelda y Hollow Knight',
      'Lecturas favoritas: Isaac Asimov, ciencia ficci\u00F3n y futuros dist\u00F3picos',
      'Aprendiendo actualmente: Impresi\u00F3n 3D, IoT y IA F\u00EDsica',
      'Idiomas: Espa\u00F1ol (nativo), Ingl\u00E9s (profesional)',
      '113+ repositorios en GitHub',
      'Filosof\u00EDa: Construir, aprender, compartir, repetir',
    ],
    ctaTitle: '\u00BFQuieres Saber M\u00E1s?',
    ctaDescription:
      'Revisa mi experiencia profesional o ponte en contacto — siempre estoy abierto a nuevas conversaciones y colaboraciones.',
    ctaCv: 'Ver mi CV',
    ctaContact: 'Contactar',
  },

  // CV page
  cvPage: {
    title: 'Curr\u00EDculum Vitae',
    subtitle: 'CTO y Cofundador | Desarrollador Full Stack | Emprendedor',
    description:
      'Curr\u00EDculum profesional de Sergio Alexander Florez Galeano — CTO de DailyBot, Desarrollador Full Stack y emprendedor tecnol\u00F3gico.',
    summaryTitle: 'Resumen Profesional',
    summaryText:
      'L\u00EDder tecnol\u00F3gico con m\u00E1s de 10 a\u00F1os de experiencia construyendo y escalando productos digitales. Ingeniero full-stack que trabaja en frontend, backend, DevOps e IA \u2014 construyendo lo que el producto necesita. Actualmente CTO y Cofundador de DailyBot (Y Combinator S21), liderando el equipo de ingenier\u00EDa detr\u00E1s de una plataforma impulsada por IA utilizada por miles de equipos globalmente. Ingeniero en Ciencias de la Computaci\u00F3n con MSc en Ciencia de Datos, combinando profunda experiencia t\u00E9cnica con visi\u00F3n emprendedora.',
    experienceTitle: 'Experiencia Laboral',
    experiences: [
      {
        role: 'CTO y Cofundador',
        company: 'DailyBot (Y Combinator S21)',
        period: '2017 - Presente',
        description:
          'Liderando la visi\u00F3n t\u00E9cnica y el equipo de ingenier\u00EDa detr\u00E1s de DailyBot, una plataforma impulsada por IA para colaboraci\u00F3n as\u00EDncrona de equipos.',
        highlights: [
          'Dise\u00F1\u00E9 y constru\u00ED la plataforma desde cero, escal\u00E1ndola a miles de equipos en todo el mundo',
          'Lider\u00E9 a la empresa a trav\u00E9s del batch S21 de Y Combinator, acelerando crecimiento y desarrollo de producto',
          'Dise\u00F1\u00E9 funcionalidades impulsadas por IA para standups automatizados, automatizaci\u00F3n de flujos y anal\u00EDticas de equipo',
          'Constru\u00ED integraciones con Slack, Microsoft Teams, Google Chat y Discord',
          'Gestion\u00E9 infraestructura cloud en AWS con arquitectura serverless',
        ],
      },
      {
        role: 'Cofundador y Organizador',
        company: 'Pereira Tech Talks',
        period: '2016 - Presente',
        description:
          'Cofund\u00E9 una comunidad tecnol\u00F3gica enfocada en compartir conocimiento y conectar profesionales tech.',
        highlights: [
          'Organiz\u00E9 meetups y conferencias tech regulares',
          'Crecimos la comunidad hasta convertirla en referencia del ecosistema tech local',
          'Speaker en temas como Docker, serverless, TypeScript e IA',
        ],
      },
      {
        role: 'Desarrollador Full Stack y Consultor',
        company: 'Independiente',
        period: '2014 - 2017',
        description:
          'Desarrollo de aplicaciones web y consultor\u00EDa tecnol\u00F3gica para diversas empresas y startups.',
        highlights: [
          'Constru\u00ED aplicaciones full-stack con Python/Django y Node.js',
          'Implement\u00E9 pr\u00E1cticas DevOps incluyendo contenedorizaci\u00F3n con Docker y pipelines CI/CD',
          'Contribu\u00ED a proyectos open-source y desarroll\u00E9 herramientas de desarrollo',
        ],
      },
    ],
    educationTitle: 'Educaci\u00F3n',
    educations: [
      {
        degree: 'MSc en Ciencia de Datos',
        institution: 'Universidad Tecnológica de Pereira',
        period: '2020 - 2022',
        description:
          'Estudios avanzados en machine learning, an\u00E1lisis de datos y modelado estad\u00EDstico aplicado a problemas del mundo real.',
      },
      {
        degree: 'Ingenier\u00EDa en Ciencias de la Computaci\u00F3n',
        institution: 'Universidad Nacional de Colombia',
        period: '2014 - 2019',
        description:
          'Formaci\u00F3n integral en fundamentos de ciencias de la computaci\u00F3n, algoritmos, ingenier\u00EDa de software y dise\u00F1o de sistemas.',
      },
    ],
    skillsTitle: 'Habilidades T\u00E9cnicas',
    skillsIntroText:
      'Ingeniero full-stack que trabaja en frontend, backend, DevOps e IA. Construyo lo que el producto necesita — desde APIs y UIs hasta infraestructura y pipelines de ML. Stack actual:',
    skillCategories: [
      {
        category: 'Lenguajes',
        skills: [
          'TypeScript',
          'JavaScript',
          'Python',
          'Go',
          'Kotlin',
          'C++',
          'SQL',
        ],
      },
      {
        category: 'Frontend',
        skills: [
          'React',
          'Vue',
          'Alpine.js',
          'Svelte',
          'Astro',
          'Tailwind CSS',
          'HTML/CSS',
        ],
      },
      {
        category: 'Backend',
        skills: ['Node.js', 'Django', 'Express', 'REST APIs', 'GraphQL'],
      },
      {
        category: 'DevOps y Cloud',
        skills: [
          'Docker',
          'AWS',
          'Serverless',
          'CI/CD',
          'Terraform',
          'Linux',
          'Bash',
        ],
      },
      {
        category: 'Datos e IA',
        skills: [
          'Machine Learning',
          'Ciencia de Datos',
          'LLMs',
          'Integraci\u00F3n de IA',
        ],
      },
      {
        category: 'Herramientas',
        skills: ['Git', 'Cypress', 'Biome', 'Jira'],
      },
    ],
    languagesTitle: 'Idiomas',
    languages: [
      { language: 'Espa\u00F1ol', level: 'Nativo' },
      { language: 'Ingl\u00E9s', level: 'Competencia profesional' },
    ],
    ctaText: 'Contactar',
  },

  // DailyBot page
  dailybotPage: {
    title: 'DailyBot',
    subtitle: 'CTO y Cofundador — Y Combinator S21',
    description:
      'DailyBot es una plataforma impulsada por IA para colaboraci\u00F3n as\u00EDncrona de equipos, respaldada por Y Combinator.',
    heroDescription:
      'Construyendo el futuro de la colaboraci\u00F3n en equipos — una plataforma impulsada por IA utilizada por miles de equipos en todo el mundo.',
    storyTitle: 'La Historia',
    storyText:
      'DailyBot naci\u00F3 de una observaci\u00F3n simple: los equipos distribuidos necesitan mejores herramientas para la comunicaci\u00F3n as\u00EDncrona. Lo que comenz\u00F3 como una soluci\u00F3n para ejecutar standups automatizados evolucion\u00F3 en una plataforma integral que ayuda a los equipos a mantenerse conectados, alineados y productivos sin importar zonas horarias o horarios de trabajo.<br /><br />Desde sus inicios, la plataforma ha crecido para servir a miles de equipos en todo el mundo, integr\u00E1ndose perfectamente con las herramientas que ya usan — Slack, Microsoft Teams, Google Chat y Discord.',
    ycTitle: 'La Experiencia Y Combinator',
    ycText:
      'En 2021, DailyBot fue seleccionado para el batch de verano de Y Combinator (S21). Ser parte de YC fue una experiencia transformadora — aceler\u00F3 nuestro crecimiento, agudiz\u00F3 nuestro enfoque en product-market fit y nos conect\u00F3 con una red incre\u00EDble de fundadores, mentores e inversores.<br /><br />La experiencia YC nos ense\u00F1\u00F3 a movernos r\u00E1pido, hablar con usuarios obsesivamente y construir lo que importa. Valid\u00F3 nuestra visi\u00F3n y nos dio los recursos y la confianza para escalar globalmente.',
    roleTitle: 'Mi Rol como CTO',
    roleText:
      'Como CTO, lidero la visi\u00F3n t\u00E9cnica y el equipo de ingenier\u00EDa detr\u00E1s de DailyBot. Desde decisiones de arquitectura hasta el desarrollo de funcionalidades de IA, soy responsable de asegurar que nuestra tecnolog\u00EDa entregue valor real a los equipos.<br /><br />Esto incluye dise\u00F1ar sistemas escalables, integrar capacidades de IA (incluyendo LLMs) en el producto, gestionar infraestructura cloud en AWS y fomentar una cultura de excelencia en ingenier\u00EDa dentro del equipo.',
    featuresTitle: 'Funcionalidades de la Plataforma',
    features: [
      {
        title: 'Standups y Check-ins As\u00EDncronos',
        description:
          'Actualizaciones de equipo automatizadas que se ejecutan en tu horario, manteniendo a todos alineados sin reuniones.',
        icon: '\u{1F4CB}',
      },
      {
        title: 'Asistente con IA',
        description:
          'Un asistente inteligente que ayuda a los equipos a trabajar de forma m\u00E1s inteligente con insights y automatizaci\u00F3n impulsados por IA.',
        icon: '\u{1F916}',
      },
      {
        title: 'Kudos y Reconocimiento',
        description:
          'Un sistema de reconocimiento entre pares que eleva la moral del equipo y celebra los logros.',
        icon: '\u2B50',
      },
      {
        title: 'Flujos y Automatizaciones',
        description:
          'Flujos de trabajo personalizados activados por eventos o programaciones para optimizar procesos del equipo.',
        icon: '\u2699\uFE0F',
      },
      {
        title: 'Seguimiento de Estado de \u00C1nimo',
        description:
          'Rastrea el sentimiento del equipo a lo largo del tiempo para mantener una fuerza laboral saludable y comprometida.',
        icon: '\u{1F4CA}',
      },
      {
        title: 'Integraci\u00F3n Multi-Plataforma',
        description:
          'Funciona con Slack, Microsoft Teams, Google Chat, Discord y muchas m\u00E1s herramientas.',
        icon: '\u{1F517}',
      },
    ],
    timelineTitle: 'Artículos sobre DailyBot',
    emptyState: '¡Aún no hay artículos sobre DailyBot. Vuelve pronto!',
    ctaText: 'Visitar DailyBot',
    ctaLink: 'https://dailybot.com',
  },

  // Entrepreneur page
  entrepreneurPage: {
    title: 'Emprendedor',
    subtitle: 'Construyendo el futuro, un proyecto a la vez',
    description:
      'El camino emprendedor de Sergio Alexander Florez Galeano — de ingeniero a fundador.',
    heroDescription:
      'M\u00E1s de una d\u00E9cada construyendo negocios digitales, transformando ideas en productos y aprendiendo de cada desaf\u00EDo en el camino.',
    journeyTitle: 'Mi Camino Emprendedor',
    journeyText:
      'Mi camino emprendedor comenz\u00F3 en la intersecci\u00F3n entre ingenier\u00EDa y ambici\u00F3n. Con un t\u00EDtulo en Ciencias de la Computaci\u00F3n y una pasi\u00F3n por construir cosas, me propuse crear productos digitales que resuelvan problemas reales para personas reales.<br /><br />El camino ha estado lleno de lecciones — desde el trabajo freelance y consultor\u00EDa hasta cofundar DailyBot, que luego ser\u00EDa seleccionado por Y Combinator. Cada paso me ense\u00F1\u00F3 algo nuevo sobre desarrollo de producto, construcci\u00F3n de equipos y la b\u00FAsqueda incansable de crear valor.',
    venturesTitle: 'Proyectos y Emprendimientos',
    ventures: [
      {
        title: 'DailyBot (YC S21)',
        description:
          'Plataforma impulsada por IA para colaboraci\u00F3n as\u00EDncrona de equipos. CTO y Cofundador. Seleccionados por Y Combinator en 2021, sirviendo a miles de equipos en todo el mundo.',
        period: '2017 - Presente',
      },
      {
        title: 'Pereira Tech Talks',
        description:
          'Cofund\u00E9 una comunidad tecnol\u00F3gica activa enfocada en compartir conocimiento, mentor\u00EDa y hacer crecer el ecosistema tech local.',
        period: '2016 - Presente',
      },
      {
        title: 'Open Source y Herramientas',
        description:
          'Cre\u00E9 y contribu\u00ED a proyectos open-source incluyendo herramientas de desarrollo, utilidades DevOps y recursos educativos con 113+ repositorios en GitHub.',
        period: 'Continuo',
      },
    ],
    philosophyTitle: 'Mi Filosof\u00EDa',
    philosophyText:
      'Creo que la tecnolog\u00EDa es una fuerza poderosa de cambio. Los mejores emprendedores no son solo constructores — son solucionadores de problemas que entienden profundamente a las personas a las que sirven. El \u00E9xito viene del enfoque incansable en entregar valor, combinado con la humildad de aprender de cada fracaso.<br /><br />La comunidad est\u00E1 en el coraz\u00F3n de todo lo que hago. Ya sea construyendo un producto usado por miles de equipos u organizando meetups tech en mi ciudad, el objetivo siempre es el mismo: conectar personas, compartir conocimiento y crear oportunidades.',
    lessonsTitle: 'Lecciones Clave',
    lessons: [
      'Habla con tus usuarios — su feedback vale m\u00E1s que cualquier suposici\u00F3n',
      'Mu\u00E9vete r\u00E1pido, pero construye cosas que duren',
      'Rod\u00E9ate de personas que sean mejores que t\u00FA',
      'El mejor momento para empezar es ahora — el perfeccionismo es el enemigo del progreso',
      'La comunidad y la colaboraci\u00F3n aceleran todo',
      'Mant\u00E9n la curiosidad — las mejores ideas vienen de lugares inesperados',
    ],
  },

  // Tech Talks page
  techTalksPage: {
    title: 'Charlas Tech',
    subtitle: 'Compartiendo conocimiento, construyendo comunidad',
    description:
      'La participaci\u00F3n de Sergio en comunidades tech, charlas y difusi\u00F3n de conocimiento.',
    heroDescription:
      'Cofundador de Pereira Tech Talks. Speaker en m\u00FAltiples conferencias t\u00E9cnicas. Apasionado por conectar profesionales y compartir conocimiento.',
    communityTitle: 'Pereira Tech Talks',
    communityText:
      'Como cofundador y organizador de Pereira Tech Talks, he ayudado a construir una de las comunidades tech m\u00E1s activas de la regi\u00F3n. La misi\u00F3n es simple: crear espacios donde profesionales de tecnolog\u00EDa puedan compartir conocimiento, aprender unos de otros y crecer juntos.<br /><br />Desde peque\u00F1os meetups hasta conferencias m\u00E1s grandes, la comunidad se ha convertido en una plataforma para desarrolladores, dise\u00F1adores y emprendedores para conectar, colaborar y empujar los l\u00EDmites de lo posible.',
    topicsTitle: 'Temas que Cubro',
    topics: [
      {
        title: 'Docker y Contenedores',
        description:
          'Mejores pr\u00E1cticas de contenedorizaci\u00F3n, flujos de Docker y orquestaci\u00F3n para aplicaciones modernas.',
        icon: '\u{1F433}',
      },
      {
        title: 'Arquitectura Serverless',
        description:
          'Construyendo aplicaciones escalables con patrones serverless en AWS y otros proveedores cloud.',
        icon: '\u2601\uFE0F',
      },
      {
        title: 'TypeScript y Node.js',
        description:
          'Desarrollo type-safe, dise\u00F1o de APIs y construcci\u00F3n de servicios backend robustos.',
        icon: '\u{1F4DD}',
      },
      {
        title: 'IA y Machine Learning',
        description:
          'Integraci\u00F3n pr\u00E1ctica de IA, LLMs en producci\u00F3n y el futuro de las aplicaciones inteligentes.',
        icon: '\u{1F9E0}',
      },
      {
        title: 'DevOps y CI/CD',
        description:
          'Integraci\u00F3n continua, pipelines de despliegue y pr\u00E1cticas de infraestructura como c\u00F3digo.',
        icon: '\u{1F504}',
      },
      {
        title: 'Equipos Remotos',
        description:
          'Estrategias para construir equipos distribuidos efectivos, comunicaci\u00F3n as\u00EDncrona y cultura de equipo.',
        icon: '\u{1F30D}',
      },
      {
        title: 'Emprendimiento Tech',
        description:
          'Lecciones de fundar una startup respaldada por YC, desarrollo de producto y hacer crecer un negocio tech.',
        icon: '\u{1F4A1}',
      },
      {
        title: 'Desarrollo Open Source',
        description:
          'Contribuir y mantener proyectos open-source, desarrollo impulsado por la comunidad.',
        icon: '\u{1F310}',
      },
    ],
    philosophyTitle: 'Por Qu\u00E9 Hablo',
    philosophyText:
      'Creo que la mejor forma de aprender es ense\u00F1ando. Cada vez que preparo una charla, profundizo mi propio entendimiento. Cada pregunta de la audiencia abre una nueva perspectiva.<br /><br />Las comunidades tech son la columna vertebral de la innovaci\u00F3n. Cuando los profesionales comparten su conocimiento abiertamente, todos crecen — desde juniors aprendiendo su primer framework hasta seniors descubriendo nuevos patrones. Mi meta es contribuir a ese ciclo de conocimiento e inspirar a otros a compartir sus propias experiencias.',
    ctaTitle: '\u00BFQuieres que Hable en Tu Evento?',
    ctaText:
      'Siempre estoy abierto a oportunidades de charlas — desde meetups locales hasta conferencias internacionales. \u00A1Conect\u00E9monos!',
    timelineTitle: 'Mis Charlas',
    emptyState: '\u00A1A\u00FAn no hay charlas disponibles. Vuelve pronto!',
  },

  // Maker page
  makerPage: {
    title: 'Maker / Creador',
    subtitle: 'Transformando ideas en realidad',
    description:
      'El camino maker de Sergio — desde proyectos de software hasta impresi\u00F3n 3D, IoT y exploraci\u00F3n de IA.',
    heroDescription:
      'Un constructor y entusiasta de la tecnolog\u00EDa de por vida. Del c\u00F3digo al hardware, constantemente creando y experimentando con nuevas tecnolog\u00EDas.',
    philosophyTitle: 'La Mentalidad Maker',
    philosophyText:
      'Siempre me ha impulsado la necesidad de construir cosas. Ya sea una aplicaci\u00F3n web, una herramienta open-source, un prototipo impreso en 3D o un dispositivo IoT — el proceso de tomar una idea y convertirla en algo tangible es lo que m\u00E1s me emociona.<br /><br />La tecnolog\u00EDa evoluciona a un ritmo incre\u00EDble, y creo que la mejor forma de entenderla es ensuci\u00E1ndose las manos. Cada nuevo proyecto es una oportunidad para aprender, experimentar y empujar l\u00EDmites.',
    areasTitle: '\u00C1reas de Exploraci\u00F3n',
    areas: [
      {
        title: 'Inteligencia Artificial',
        description:
          'Explorando integraci\u00F3n de IA, modelos de machine learning, LLMs y construyendo aplicaciones impulsadas por IA que resuelven problemas reales.',
        icon: '\u{1F916}',
      },
      {
        title: 'Impresi\u00F3n 3D',
        description:
          'Recientemente comenc\u00E9 mi camino en impresi\u00F3n 3D — dise\u00F1ando objetos, prototipando ideas y aprendiendo modelado CAD para dar vida a conceptos.',
        icon: '\u{1F5A8}\uFE0F',
      },
      {
        title: 'IoT y Hardware',
        description:
          'Construyendo dispositivos conectados, proyectos con sensores y explorando el mundo de la computaci\u00F3n f\u00EDsica y automatizaci\u00F3n del hogar.',
        icon: '\u{1F4E1}',
      },
      {
        title: 'IA F\u00EDsica y Rob\u00F3tica',
        description:
          'Fascinado por la IA embodied, rob\u00F3tica y la convergencia de la inteligencia de software con sistemas f\u00EDsicos.',
        icon: '\u{1F9BE}',
      },
      {
        title: 'Open Source',
        description:
          'Con 113+ repositorios en GitHub, contribuyendo y creando herramientas que ayudan a otros desarrolladores a construir mejor software.',
        icon: '\u{1F310}',
      },
      {
        title: 'Desarrollo Full Stack',
        description:
          'Construyendo aplicaciones web, APIs y sistemas cloud-native con tecnolog\u00EDas modernas y mejores pr\u00E1cticas.',
        icon: '\u{1F4BB}',
      },
    ],
    currentTitle: 'Lo Que Estoy Construyendo Ahora',
    currentText:
      'Ahora mismo, mi enfoque est\u00E1 en la emocionante intersecci\u00F3n entre software y hardware. Recientemente obtuve una impresora 3D y estoy aprendiendo a dise\u00F1ar e imprimir objetos funcionales. Tambi\u00E9n estoy experimentando con dispositivos IoT y explorando c\u00F3mo la IA puede integrarse en sistemas f\u00EDsicos.<br /><br />Cada d\u00EDa es una oportunidad para aprender algo nuevo. Ya sea un nuevo lenguaje de programaci\u00F3n (actualmente explorando GoLang), una nueva t\u00E9cnica de fabricaci\u00F3n o un nuevo modelo de IA — el objetivo siempre es el mismo: construir, aprender, compartir, repetir.',
    ctaText: 'Ver Mi GitHub',
    ctaLink: 'https://github.com/xergioalex',
  },

  // Trading page
  tradingPage: {
    title: 'Diario de Trading',
    subtitle: 'Mercados, estrategias y lecciones aprendidas',
    description:
      'El diario de trading de Sergio — actualizaciones semanales, análisis de mercado, estrategias y lecciones aprendidas del trading activo.',
    heroDescription:
      'Mi diario personal de trading donde documento mi camino por los mercados financieros — revisiones semanales, análisis, estrategias y las lecciones que aprendo en el camino.',
    journeyTitle: 'Mi Camino en el Trading',
    journeyText:
      'El trading llegó a mi vida como una extensión natural de mi pasión por los datos, el análisis y el reconocimiento de patrones. Lo que comenzó como curiosidad sobre cómo funcionan los mercados financieros rápidamente se convirtió en un profundo interés en el trading forex — el mercado más grande y líquido del mundo.<br /><br />Durante los últimos dos años, he dedicado tiempo significativo a estudiar la dinámica del mercado, entender cómo los eventos macroeconómicos afectan los precios de las divisas y desarrollar mi propio enfoque de trading. Esto es más que un hobby — es una disciplina que me desafía cada día.',
    approachTitle: 'Mi Enfoque',
    approachText:
      'Abordo el trading con la misma mentalidad que aplico a la ingeniería: sistemática, basada en datos y disciplinada. Combino análisis fundamental (entender cómo las noticias, datos económicos y eventos geopolíticos mueven los mercados) con análisis técnico (leer gráficos, identificar patrones y usar indicadores).<br /><br />La gestión del riesgo es central en mi filosofía. Cada operación tiene un plan claro — entrada, stop loss y take profit. Mantengo un diario de trading detallado para rastrear el rendimiento y mejorar continuamente mi proceso de toma de decisiones.',
    areasTitle: 'Lo Que Estudio',
    areas: [
      {
        title: 'Trading Forex',
        description:
          'Pares de divisas, sesiones de mercado, políticas de bancos centrales y factores macroeconómicos que mueven el mercado forex.',
        icon: '💱',
      },
      {
        title: 'Trading Algorítmico',
        description:
          'Automatizando estrategias de trading, backtesting de sistemas y aplicando habilidades de programación para construir bots de trading.',
        icon: '💻',
      },
      {
        title: 'Análisis de Mercado',
        description:
          'Análisis de impacto de noticias, indicadores económicos, análisis de sentimiento y entender cómo eventos globales afectan los precios.',
        icon: '📊',
      },
      {
        title: 'Gestión del Riesgo',
        description:
          'Dimensionamiento de posiciones, estrategias de stop-loss, ratios riesgo-recompensa y protección del capital a través de trading disciplinado.',
        icon: '🛡️',
      },
    ],
    philosophyTitle: 'Filosofía de Trading',
    philosophyText:
      'El trading es una disciplina, no una apuesta. El éxito viene de la educación, la paciencia y el control emocional — no de perseguir ganancias rápidas. El mercado es el mejor maestro: recompensa la consistencia y castiga la impulsividad.<br /><br />Como tecnólogo, veo oportunidades únicas en combinar mis habilidades de ingeniería con el trading. Construir sistemas algorítmicos, analizar patrones de datos y automatizar estrategias son áreas donde mi formación tech me da una ventaja. El objetivo no es solo operar, sino entender los mercados profundamente y construir sistemas que puedan tomar decisiones inteligentes.',
    timelineTitle: 'Diario de Trading',
    emptyState: 'Aún no hay entradas en el diario de trading. ¡Vuelve pronto!',
  },

  // Foodie page
  foodiePage: {
    title: 'Foodie Enthusiast',
    subtitle: 'Explorando sabores, compartiendo experiencias',
    description:
      'La pasi\u00F3n de Sergio por la comida — exploraci\u00F3n de restaurantes, creaci\u00F3n de contenido y aventuras culinarias.',
    heroDescription:
      'M\u00E1s all\u00E1 de la tecnolog\u00EDa, un apasionado explorador gastron\u00F3mico y creador de contenido. Descubriendo los mejores sabores y comparti\u00E9ndolos con el mundo.',
    passionTitle: 'Mi Pasi\u00F3n por la Comida',
    passionText:
      'La comida es uno de esos lenguajes universales que conecta personas a trav\u00E9s de culturas y or\u00EDgenes. Siempre he sido apasionado por descubrir nuevos restaurantes, probar nuevas cocinas y compartir esas experiencias con otros.<br /><br />Ya sea una joya escondida en la ciudad, un puesto de comida callejera o una experiencia de alta gastronom\u00EDa — cada comida cuenta una historia. Me encanta la aventura de explorar nuevos sabores y la alegr\u00EDa de recomendar grandes lugares a amigos y seguidores.',
    contentTitle: 'Creaci\u00F3n de Contenido',
    contentText:
      'Sol\u00EDa ser muy activo compartiendo contenido gastron\u00F3mico en Instagram (@xergioalex), documentando mis exploraciones culinarias a trav\u00E9s de fotos e historias. Desde recomendaciones de restaurantes hasta experimentos de cocina, mi feed era una celebraci\u00F3n de la buena comida.<br /><br />Aunque he estado menos activo recientemente, estoy planeando revivir mi camino de contenido gastron\u00F3mico. Hay demasiados restaurantes incre\u00EDbles y experiencias culinarias esperando ser descubiertas y compartidas. \u00A1Estate atento!',
    cookingTitle: 'Aventuras en la Cocina',
    cookingText:
      'No soy un chef profesional — ni de cerca. Pero disfruto meterme en la cocina y experimentar con recetas. Cocinar para m\u00ED es como programar: sigues una receta (o la rompes), iteras, pruebas y a veces creas algo inesperadamente delicioso.<br /><br />Desde comidas simples en casa hasta experimentos m\u00E1s ambiciosos, cocinar es otra forma de expresar creatividad y aprender algo nuevo.',
    highlights: [
      {
        title: 'Explorador de Restaurantes',
        description:
          'Descubriendo joyas ocultas, favoritos locales y experiencias culinarias \u00FAnicas donde sea que vaya.',
        icon: '\u{1F37D}\uFE0F',
      },
      {
        title: 'Fotograf\u00EDa de Comida',
        description:
          'Capturando la belleza y la historia detr\u00E1s de cada plato a trav\u00E9s de fotos y redes sociales.',
        icon: '\u{1F4F8}',
      },
      {
        title: 'Cocina en Casa',
        description:
          'Experimentando con recetas, aprendiendo nuevas t\u00E9cnicas y la alegr\u00EDa de cocinar para otros.',
        icon: '\u{1F468}\u200D\u{1F373}',
      },
      {
        title: 'Compartir y Comunidad',
        description:
          'Inspirando a otros a explorar buena comida y conectando personas a trav\u00E9s de experiencias culinarias.',
        icon: '\u{1F91D}',
      },
    ],
    ctaText: 'Seguir en Instagram',
  },

  // Hobbies page
  hobbiesPage: {
    title: 'Hobbies',
    subtitle: 'Mant\u00E9n activo, mant\u00E9n la curiosidad',
    description:
      'Los hobbies y estilo de vida activo de Sergio — ciclismo, running, baloncesto, gaming y m\u00E1s.',
    heroDescription:
      'Deportes, gaming y aventuras al aire libre — las actividades que me mantienen en equilibrio, lleno de energ\u00EDa e inspirado.',
    philosophyTitle: 'Vida Activa',
    philosophyText:
      'Creo que un cuerpo saludable alimenta una mente creativa. Los deportes y la actividad f\u00EDsica no son solo hobbies para m\u00ED — son esenciales para quien soy. Ense\u00F1an disciplina, resiliencia y el valor del esfuerzo constante.<br /><br />Fuera del trabajo y la tecnolog\u00EDa, me encontrar\u00E1s en una bicicleta, en un sendero, en una cancha de baloncesto o inmerso en una sesi\u00F3n de gaming. Estas actividades me mantienen con los pies en la tierra y proporcionan el contrapeso perfecto a la intensidad de construir productos tecnol\u00F3gicos.',
    activities: [
      {
        title: 'Ciclismo',
        description:
          'Explorando la ciudad sobre dos ruedas, disfrutando largos recorridos y encontrando libertad en el camino. El ciclismo es meditaci\u00F3n en movimiento.',
        icon: '\u{1F6B4}',
      },
      {
        title: 'Running',
        description:
          'Construyendo resistencia, despejando la mente y superando l\u00EDmites personales. Cada carrera es una conversaci\u00F3n contigo mismo.',
        icon: '\u{1F3C3}',
      },
      {
        title: 'Baloncesto',
        description:
          'La emoci\u00F3n del deporte en equipo — competencia, estrategia y la alegr\u00EDa de jugar con amigos.',
        icon: '\u{1F3C0}',
      },
      {
        title: 'Senderismo de Monta\u00F1a',
        description:
          'Conquistando senderos, respirando aire fresco y descubriendo paisajes incre\u00EDbles en las monta\u00F1as de Colombia.',
        icon: '\u26F0\uFE0F',
      },
      {
        title: 'Ajedrez',
        description:
          'Pensamiento estrat\u00E9gico, paciencia y la belleza de las jugadas calculadas. El ajedrez es el gimnasio de la mente.',
        icon: '\u265F\uFE0F',
      },
    ],
    gamingTitle: 'Gaming',
    gamingText:
      'Los videojuegos han sido un compa\u00F1ero de toda la vida. Desde las \u00E9picas aventuras de The Legend of Zelda hasta el hermoso y sombr\u00EDo mundo de Hollow Knight, el gaming es c\u00F3mo me relajo, exploro nuevos mundos y aprecio una incre\u00EDble narrativa y dise\u00F1o.<br /><br />Veo el gaming como m\u00E1s que entretenimiento — es arte interactivo. La creatividad e ingenier\u00EDa detr\u00E1s de los grandes juegos me inspiran en mi propio trabajo con tecnolog\u00EDa.',
    readingSciFiTitle: 'Lectura y Ciencia Ficci\u00F3n',
    readingSciFiText:
      'Siempre me ha atra\u00EDdo la ciencia ficci\u00F3n \u2014 tanto en libros como en pantalla. Isaac Asimov es uno de mis autores favoritos; sus visiones del futuro y la \u00E9tica de la tecnolog\u00EDa siguen resonando profundamente. Me encantan las pel\u00EDculas que exploran viajes en el tiempo, futuros dist\u00F3picos y exploraci\u00F3n espacial. Estas historias alimentan mi imaginaci\u00F3n y ofrecen nuevas perspectivas sobre c\u00F3mo la tecnolog\u00EDa moldea a la humanidad.',
    balanceTitle: 'Encontrando el Equilibrio',
    balanceText:
      'Las mejores ideas a menudo llegan cuando te alejas de la pantalla. Ya sea durante un largo recorrido en bicicleta, una caminata de monta\u00F1a o una partida competitiva de ajedrez — estos momentos de desconexi\u00F3n encienden la creatividad y traen perspectivas frescas a mi trabajo.<br /><br />Los deportes me ense\u00F1an que el crecimiento sucede fuera de la zona de confort. Esa lecci\u00F3n aplica a todo — construir productos, aprender nuevas habilidades y vivir una vida plena.',
  },

  // Portfolio page
  portfolioPage: {
    title: 'Portafolio',
    subtitle: 'Proyectos y Trabajo',
    description:
      'Una muestra de mis proyectos, experimentos y trabajo técnico en ingeniería de software, robótica y más.',
    heroDescription:
      'Explora mi portafolio de proyectos en desarrollo de software, DevOps, robótica y tecnologías emergentes.',
    journeyTitle: 'Construyendo Cosas que Importan',
    journeyText:
      'Siempre he creído que la mejor forma de aprender es construyendo. A lo largo de los años, he trabajado en proyectos que van desde productos SaaS a gran escala hasta experimentos de fin de semana con microcontroladores. Cada proyecto me enseñó algo nuevo — ya sea una nueva tecnología, un mejor patrón de arquitectura, o simplemente cómo entregar más rápido.<br /><br />Este portafolio es una colección viva del trabajo del que estoy más orgulloso. Desde herramientas open-source e infraestructura DevOps hasta prototipos de robótica y experimentos con IA — cada entrada representa un problema que encontré lo suficientemente interesante como para resolver.',
    areasTitle: 'Lo Que Encontrarás Aquí',
    areas: [
      {
        title: 'Software y SaaS',
        description:
          'Aplicaciones full-stack, APIs y productos construidos con tecnologías modernas — desde MVPs de startups hasta sistemas en producción sirviendo a miles de usuarios.',
        icon: '💻',
      },
      {
        title: 'DevOps e Infraestructura',
        description:
          'Pipelines CI/CD, despliegues containerizados, arquitecturas en la nube y herramientas open-source para productividad de desarrolladores.',
        icon: '⚙️',
      },
      {
        title: 'Robótica y Hardware',
        description:
          'Robots autónomos, dispositivos IoT, proyectos de impresión 3D y experimentos en la intersección del software y el mundo físico.',
        icon: '🤖',
      },
      {
        title: 'IA y Experimentos',
        description:
          'Prototipos de machine learning, exploraciones de IA generativa y proyectos paralelos empujando los límites de lo posible.',
        icon: '🧪',
      },
    ],
    timelineTitle: 'Proyectos',
    emptyState:
      'Aún no hay proyectos de portafolio disponibles. ¡Vuelve pronto!',
  },

  // Contact page
  contactPage: {
    title: 'Contacto',
    subtitle: 'Conectemos y construyamos algo juntos',
    description:
      'Ponte en contacto con Sergio Alexander Florez Galeano — abierto a colaboraciones, charlas y nuevas oportunidades.',
    heroDescription:
      'Siempre estoy abierto a nuevas oportunidades, colaboraciones y conversaciones. Ya sea que tengas una idea de proyecto, una invitaci\u00F3n para hablar o simplemente quieras saludar — me encantar\u00EDa saber de ti.',
    formTitle: 'Enviar un Mensaje',
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre',
    emailLabel: 'Email',
    emailPlaceholder: 'tu@email.com',
    reasonLabel: 'Quiero contactarte por',
    reasonOptions: [
      { value: '', label: '— Selecciona un tema —' },
      { value: 'general', label: 'General / Solo saludar' },
      { value: 'tech-talk', label: 'Charla tech / Invitación a hablar' },
      { value: 'collaboration', label: 'Colaboración / Partnership' },
      { value: 'project', label: 'Proyecto / Consulta laboral' },
      { value: 'dailybot', label: 'Pregunta sobre DailyBot' },
      { value: 'trading', label: 'Preguntas sobre mi trading' },
      { value: 'other', label: 'Otro' },
    ],
    subjectLabel: 'Asunto',
    subjectPlaceholder: '\u00BFDe qu\u00E9 se trata?',
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Escribe tu mensaje...',
    sendButton: 'Enviar Mensaje',
    formNote: 'Te responder\u00E9 lo antes posible.',
    socialTitle: 'Con\u00E9ctate Conmigo',
    locationTitle: 'Ubicaci\u00F3n',
    locationText:
      'Ubicado en Colombia. Abierto a colaboraci\u00F3n remota en todo el mundo.',
  },

  contactSection: {
    title: 'Conectemos',
    description:
      'Siempre estoy abierto a conversaciones interesantes, oportunidades de colaboración e ideas nuevas. Ya sea para hablar de tech, emprendimiento o simplemente saludar.',
    ctaText: 'Ponte en contacto',
    ctaLink: '/es/contact',
  },

  // Search input
  searchPlaceholder: 'Buscar art\u00EDculos...',
  searchHint: 'Tip: presiona Esc para limpiar la b\u00FAsqueda.',
  clearSearch: 'Limpiar',
  resultsFound: (count) =>
    `${count} resultado${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`,

  // Loading states
  loadingIndex: 'Cargando \u00EDndice de b\u00FAsqueda...',
  searching: 'Buscando art\u00EDculos...',

  // Results
  noResults: (query) =>
    `No se encontraron art\u00EDculos que coincidan con "${query}"`,
  noResultsSuggestion:
    'Prueba una palabra m\u00E1s amplia o navega todos los art\u00EDculos.',
  noPostsAvailable: 'Aún no hay artículos disponibles.',

  // Pagination
  previous: 'Anterior',
  next: 'Siguiente',
  pageOf: (current, total) => `P\u00E1gina ${current} de ${total}`,

  // Blog header
  blogTitle: 'Blog',
  blogDescription: 'Artículos sobre tecnología, programación y más',
  allPosts: 'Todos los Posts',
  showingArticles: (showing, total) =>
    `Mostrando ${showing} de ${total} artículos`,
  articlesAvailable: (total) =>
    `${total} artículo${total !== 1 ? 's' : ''} disponible${total !== 1 ? 's' : ''}`,
  lastUpdatedOn: 'Última actualización:',
  readingTime: (minutes) => `${minutes} min de lectura`,
  relatedArticles: 'Artículos Relacionados',
  relatedArticlesDescription: 'También te pueden interesar estos artículos',

  // Tags
  postsTagged: (tag) => `Posts etiquetados con "${tag}"`,
  allTags: 'Todas las Etiquetas',
  tagNames: {
    tech: 'Tecnología',
    personal: 'Personal',
    talks: 'Charlas',
    trading: 'Trading',
    portfolio: 'Portafolio',
    dailybot: 'DailyBot',
    demo: 'Demo',
  },
  tagDescriptions: {
    tech: 'Tutoriales, guías y artículos técnicos.',
    personal: 'Artículos sobre mi vida y experiencias.',
    talks: 'Charlas técnicas, slides, videos y eventos.',
    trading: 'Diario de trading, análisis y aprendizajes.',
    portfolio:
      'Proyectos personales, software, robótica y trabajo open source.',
    dailybot:
      'Artículos sobre DailyBot: historia del producto, automatización de flujos y productividad de equipos.',
    demo: 'Posts de demostración mostrando funcionalidades del blog. Solo visibles en modo desarrollo.',
  },

  // Date formatting
  dateLocale: 'es-ES',

  // Read more
  readMore: 'Leer m\u00E1s',

  // Scroll to timeline
  scrollToTimeline: 'Ver Timeline',
  viewLabel: (label: string) => `Ver ${label}`,

  // Post status (dev mode indicators)
  postStatus: {
    draft: 'Borrador',
    scheduled: 'Programado',
    'draft+scheduled': 'Borrador + Programado',
    demo: 'Demo',
  },
  previewMode: 'Modo Vista Previa',
  showAllPosts: 'Mostrar todos los posts',
  showPublishedOnly: 'Solo publicados',
  publishesOn: 'Se publica el',

  // 404 page
  notFoundPage: {
    title: 'Pagina no encontrada',
    description: 'La pagina que buscas no existe o ha sido movida.',
    heading: 'Pagina no encontrada',
    message:
      'Lo sentimos, la pagina que buscas no existe o pudo haber sido movida. Intenta volver a la pagina principal o buscar en el blog.',
    backHome: 'Volver al inicio',
    searchBlog: 'Buscar en el blog',
  },

  // Errors
  searchError: 'Ocurrió un error al buscar. Por favor intenta de nuevo.',
  loadError:
    'Error al cargar el índice de búsqueda. Por favor recarga la página.',
  retry: 'Intentar de nuevo',
};
