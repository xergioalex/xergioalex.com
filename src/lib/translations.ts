/**
 * Site-wide translations
 * Supports English (en) and Spanish (es)
 */

export type Language = 'en' | 'es';

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
  siteTitleFull: string; // Full title for browser tab (homepage)
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
    portfolioProjectsTitle: string;
    portfolioProjectsViewAll: string;
    portfolioProjectsEmpty: string;
    techTalksPostsTitle: string;
    techTalksPostsViewAll: string;
    techTalksPostsEmpty: string;
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

  // Errors
  searchError: string;
  loadError: string;
  retry: string;
}

const translations: Record<Language, SiteTranslations> = {
  en: {
    // Site metadata
    siteTitle: 'XergioAleX',
    siteTitleFull: 'Sergio Florez — CTO & Co-founder at DailyBot (YC S21)',
    siteDescription:
      'Personal website and blog by Sergio Alexander Florez Galeano',

    // Navigation
    nav: {
      home: 'Home',
      blog: 'Blog',
      work: 'Work',
      about: 'About',
      contact: 'Contact',
      aboutMe: 'About Me',
      cv: 'CV',
      dailybot: 'DailyBot',
      entrepreneur: 'Entrepreneur',
      techTalks: 'Tech Talks',
      maker: 'Maker / Builder',
      portfolio: 'Portfolio',
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
      tagline: 'CTO at DailyBot (YC S21) · Builder of 20+ Products',
      description:
        'I build technology that empowers teams. CTO & Co-founder at <a href="https://dailybot.com" target="_blank" rel="noopener" class="text-white hover:text-gray-300 transition-colors underline">DailyBot (YC S21)</a>, where we help thousands of teams collaborate better. 10+ years shipping digital products, from AI-powered platforms to open source tools.',
      typewriterWords: [
        'CTO at DailyBot (YC S21)',
        'Builder of 20+ Products',
        'Community Founder',
        'AI & Tech Explorer',
        'Open Source Contributor',
      ],
    },

    // Homepage sections
    homeSections: {
      about: {
        title: "Hello, I'm <span class='text-secondary'>Sergio</span>",
        description: `Today I lead engineering at DailyBot (YC S21), where I focus on product strategy, AI-powered workflows, and reliable systems that help teams move faster.<br /><br />
My strengths are turning complex ideas into simple products, scaling engineering teams, and shipping end-to-end: architecture, execution, and iteration based on real user feedback.<br /><br />
I currently focus on AI applications, developer productivity, and high-impact products that combine speed, quality, and measurable business results.`,
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
      makerHome: {
        title: 'What I Built',
        subtitle: 'Entrepreneur, maker & tech enthusiast',
        description:
          "Beyond DailyBot, I'm an entrepreneur and maker passionate about technology. I build side projects, explore AI, and contribute to open source — from Moltbot (AI on Raspberry Pi) to Syntro (AI-powered support) to SysPrompt (LLM prompt management). With 113+ repositories on GitHub, I believe the best way to learn is to build something real.",
        cta: 'Explore my projects',
      },
      portfolio: {
        title: 'Portfolio',
        subtitle: 'Projects & Open Source',
        description:
          'A curated timeline of my personal projects — from software and web applications to robotics and open source contributions. Each project represents a milestone in my journey as a maker and developer.',
        cta: 'Explore my portfolio',
      },
      trading: {
        title: 'Trading',
        subtitle: 'Enthusiastic trader & Algorithmic trading learner',
        description:
          'As an enthusiastic trader, I have dedicated the last two years to training in the foreign exchange market (forex) and deepening my knowledge of algorithmic trading, with the goal of optimizing and automating my investment strategies. I am motivated by continuous learning and financial market research, always looking for new tools and approaches to improve my performance and make more informed decisions.',
        cta: 'Learn more about trading',
      },
      foodie: {
        title: 'Foodie Enthusiast',
        subtitle: 'Content creator & Foodie lover',
        description:
          'Beyond technology, I am a passionate content creator and food lover. I enjoy exploring new places to eat, sharing recommendations and culinary experiences, and connecting with people through my social media. I am motivated to inspire others to discover unique places and live new experiences, combining my enthusiasm for communication, creativity and good food.',
        cta: 'Discover my foodie side',
      },
      hobbies: {
        title: 'Hobbies',
        subtitle: 'Sports and active lifestyle enthusiast',
        description:
          'Outside the professional world, I am passionate about sports and wellness. I enjoy cycling around the city and staying active through running, basketball and chess. Additionally, I find in video games a form of entertainment and mental challenge. Sports are a fundamental part of my life, as they inspire me to constantly improve and maintain a healthy balance.',
        cta: 'See my hobbies',
      },
      builder: {
        title: 'What I Build',
        subtitle: 'From AI-powered platforms to open source tools',
        description:
          'Building is what I do best. As CTO of <a href="https://dailybot.com" target="_blank" rel="noopener" class="text-secondary hover:underline">DailyBot (YC S21)</a>, I\'ve architected a platform used by thousands of teams on Slack, Microsoft Teams, and Google Chat. Beyond DailyBot, I\'m constantly shipping side projects \u2014 from Moltbot (AI on Raspberry Pi) to Syntro (AI-powered support) to SysPrompt (LLM prompt management).<br /><br />With 113+ repositories on GitHub and projects spanning Python, Go, TypeScript, and more, I believe the best way to learn new technology is to build something real with it.',
        cta: 'Explore my projects',
      },
      community: {
        title: 'Community & Speaking',
        subtitle: 'Sharing knowledge, building ecosystems',
        description:
          "I co-founded Pereira Tech Talks, PereiraJS, and Python Pereira \u2014 three tech communities dedicated to connecting professionals and sharing knowledge in Colombia. As a speaker, I've talked about Docker, serverless architectures, conversational AI, and more at conferences and meetups. I believe technology grows faster when we share what we learn \u2014 that's why I write this blog and speak at events.",
        cta: 'See my talks',
      },
      beyondCode: {
        title: 'Beyond Code',
        subtitle: 'What fuels the builder',
        description:
          "When I'm not building products, I'm exploring other passions. I love reading, especially science fiction \u2014 Isaac Asimov is one of my favorite authors \u2014 and films about time travel, dystopian futures, and space exploration. I study financial markets and algorithmic trading to understand the world of business from a different angle. I stay active through cycling, running, and basketball \u2014 sports keep me energized and disciplined. And I love discovering great food and sharing culinary finds. Life is better when you're curious about everything.",
        cta: 'More about my interests',
      },
      latestArticles: 'Latest Articles',
      portfolioProjectsTitle: 'Portfolio & Projects',
      portfolioProjectsViewAll: 'View all portfolio posts',
      portfolioProjectsEmpty: 'More projects coming soon.',
      techTalksPostsTitle: 'Recent Tech Talks',
      techTalksPostsViewAll: 'View all tech talks',
      techTalksPostsEmpty: 'More talks coming soon.',
      tradingPostsTitle: 'Trading Journal',
      tradingPostsViewAll: 'View all trading entries',
      tradingPostsEmpty: 'Trading journal entries coming soon.',
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
      subtitle: 'Technology Enthusiast, Entrepreneur & Lifelong Learner',
      description:
        'Get to know Sergio Alexander Florez Galeano — CTO, entrepreneur, maker, and technology enthusiast from Colombia.',
      heroDescription:
        'CTO & Cofounder of DailyBot (YC S21). Computer Science Engineer, MSc in Data Science, with 10+ years building digital products and businesses.',
      bioTitle: 'Who I Am',
      bioText:
        "I'm Sergio Alexander Florez Galeano, a Computer Science Engineer from Universidad Nacional de Colombia with a Master's degree in Data Science. For over a decade, I've been building digital products, leading engineering teams, and co-founding technology ventures.<br /><br />Currently, I serve as CTO and Cofounder of DailyBot, a Y Combinator-backed platform (S21) that helps thousands of teams collaborate asynchronously. Beyond my professional work, I'm a maker at heart — constantly exploring new technologies from AI and 3D printing to IoT and physical computing.<br /><br />I'm also the cofounder of Pereira Tech Talks, a tech community dedicated to connecting professionals and sharing knowledge. I believe in learning every day, building things from scratch, and sharing the journey with others \u2014 that's why I write this blog and speak at tech events.",
      passionsTitle: 'What Drives Me',
      passions: [
        {
          title: 'Technology & AI',
          description:
            'Exploring artificial intelligence, machine learning, and emerging technologies to build innovative solutions.',
          icon: '\u{1F916}',
          link: '/maker',
        },
        {
          title: 'Entrepreneurship',
          description:
            'Building digital businesses and turning ideas into products that impact teams worldwide.',
          icon: '\u{1F680}',
          link: '/entrepreneur',
        },
        {
          title: 'Tech Community',
          description:
            'Sharing knowledge through tech talks, writing, mentoring, and building the local tech ecosystem.',
          icon: '\u{1F399}',
          link: '/tech-talks',
        },
        {
          title: 'Trading & Markets',
          description:
            'Studying forex markets, developing algorithmic strategies, and understanding global economics.',
          icon: '\u{1F4C8}',
          link: '/trading',
        },
        {
          title: 'Sports & Outdoors',
          description:
            'Cycling, running, basketball, and mountain hiking keep me balanced and energized.',
          icon: '\u{1F6B4}',
          link: '/hobbies',
        },
        {
          title: 'Food & Culture',
          description:
            'Exploring restaurants, creating food content, and experimenting with cooking at home.',
          icon: '\u{1F37D}',
          link: '/foodie',
        },
      ],
      quickFactsTitle: 'Quick Facts',
      quickFacts: [
        'Based in Colombia',
        'Favorite games: The Legend of Zelda & Hollow Knight',
        'Favorite reads: Isaac Asimov, sci-fi & dystopian futures',
        'Currently learning: 3D printing, IoT & Physical AI',
        'Languages: Spanish (native), English (professional)',
        '113+ repositories on GitHub',
        'Philosophy: Build, learn, share, repeat',
      ],
      ctaTitle: 'Want to Know More?',
      ctaDescription:
        "Check out my professional experience or get in touch — I'm always open to new conversations and collaborations.",
      ctaCv: 'View my CV',
      ctaContact: 'Get in touch',
    },

    // CV page
    cvPage: {
      title: 'Curriculum Vitae',
      subtitle: 'CTO & Cofounder | Full Stack Developer | Entrepreneur',
      description:
        'Professional resume of Sergio Alexander Florez Galeano — CTO of DailyBot, Full Stack Developer, and technology entrepreneur.',
      summaryTitle: 'Professional Summary',
      summaryText:
        'Technology leader with 10+ years of experience building and scaling digital products. Full-stack engineer who works across frontend, backend, DevOps, and AI — building whatever the product needs. Currently serving as CTO and Cofounder of DailyBot (Y Combinator S21), leading the engineering team behind an AI-powered platform used by thousands of teams globally. Computer Science Engineer with an MSc in Data Science, combining deep technical expertise with entrepreneurial vision.',
      experienceTitle: 'Work Experience',
      experiences: [
        {
          role: 'CTO & Cofounder',
          company: 'DailyBot (Y Combinator S21)',
          period: '2017 - Present',
          description:
            'Leading the technical vision and engineering team behind DailyBot, an AI-powered platform for asynchronous team collaboration.',
          highlights: [
            'Architected and built the platform from the ground up, scaling to thousands of teams worldwide',
            'Led the company through Y Combinator S21 batch, accelerating growth and product development',
            'Designed AI-powered features for automated standups, workflow automation, and team analytics',
            'Built integrations with Slack, Microsoft Teams, Google Chat, and Discord',
            'Managed cloud infrastructure on AWS with serverless architecture',
          ],
        },
        {
          role: 'Cofounder & Organizer',
          company: 'Pereira Tech Talks',
          period: '2016 - Present',
          description:
            'Co-founded a technology community focused on knowledge sharing and connecting tech professionals.',
          highlights: [
            'Organized regular tech meetups and conferences',
            'Grew the community to become a reference in the local tech ecosystem',
            'Speaker on topics including Docker, serverless, TypeScript, and AI',
          ],
        },
        {
          role: 'Full Stack Developer & Consultant',
          company: 'Independent',
          period: '2014 - 2017',
          description:
            'Developed web applications and provided technology consulting for various companies and startups.',
          highlights: [
            'Built full-stack applications with Python/Django and Node.js',
            'Implemented DevOps practices including Docker containerization and CI/CD pipelines',
            'Contributed to open-source projects and developed development tools',
          ],
        },
      ],
      educationTitle: 'Education',
      educations: [
        {
          degree: 'MSc in Data Science',
          institution: 'Universidad Tecnológica de Pereira',
          period: '2020 - 2022',
          description:
            'Advanced studies in machine learning, data analytics, and statistical modeling applied to real-world problems.',
        },
        {
          degree: 'Computer Science Engineering',
          institution: 'Universidad Nacional de Colombia',
          period: '2014 - 2019',
          description:
            'Comprehensive education in computer science fundamentals, algorithms, software engineering, and systems design.',
        },
      ],
      skillsTitle: 'Technical Skills',
      skillsIntroText:
        'Full-stack engineer who works across frontend, backend, DevOps, and AI. I build whatever the product needs — from APIs and UIs to infrastructure and ML pipelines. Current stack:',
      skillCategories: [
        {
          category: 'Languages',
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
          category: 'DevOps & Cloud',
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
          category: 'Data & AI',
          skills: [
            'Machine Learning',
            'Data Science',
            'LLMs',
            'AI Integration',
          ],
        },
        {
          category: 'Tools',
          skills: ['Git', 'Cypress', 'Biome', 'Jira'],
        },
      ],
      languagesTitle: 'Languages',
      languages: [
        { language: 'Spanish', level: 'Native' },
        { language: 'English', level: 'Professional proficiency' },
      ],
      ctaText: 'Get in Touch',
    },

    // DailyBot page
    dailybotPage: {
      title: 'DailyBot',
      subtitle: 'CTO & Cofounder — Y Combinator S21',
      description:
        'DailyBot is an AI-powered platform for asynchronous team collaboration, backed by Y Combinator.',
      heroDescription:
        'Building the future of team collaboration — an AI-powered platform used by thousands of teams worldwide.',
      storyTitle: 'The Story',
      storyText:
        'DailyBot was born from a simple observation: distributed teams need better tools for asynchronous communication. What started as a solution to run automated standups evolved into a comprehensive platform that helps teams stay connected, aligned, and productive regardless of time zones or work schedules.<br /><br />Since its inception, the platform has grown to serve thousands of teams across the globe, integrating seamlessly with the tools they already use — Slack, Microsoft Teams, Google Chat, and Discord.',
      ycTitle: 'Y Combinator Journey',
      ycText:
        "In 2021, DailyBot was selected for Y Combinator's Summer batch (S21). Being part of YC was a transformative experience — it accelerated our growth, sharpened our focus on product-market fit, and connected us with an incredible network of founders, mentors, and investors.<br /><br />The YC experience taught us to move fast, talk to users obsessively, and build what matters. It validated our vision and gave us the resources and confidence to scale globally.",
      roleTitle: 'My Role as CTO',
      roleText:
        "As CTO, I lead the technical vision and engineering team behind DailyBot. From architecture decisions to AI feature development, I'm responsible for ensuring our technology delivers real value to teams.<br /><br />This includes designing scalable systems, integrating AI capabilities (including LLMs) into the product, managing cloud infrastructure on AWS, and fostering a culture of engineering excellence within the team.",
      featuresTitle: 'Platform Features',
      features: [
        {
          title: 'Async Stand-ups & Check-ins',
          description:
            'Automated team updates that run on your schedule, keeping everyone aligned without meetings.',
          icon: '\u{1F4CB}',
        },
        {
          title: 'AI-Powered Assistant',
          description:
            'An intelligent assistant that helps teams work smarter with AI-driven insights and automation.',
          icon: '\u{1F916}',
        },
        {
          title: 'Kudos & Recognition',
          description:
            'A peer recognition system that boosts team morale and celebrates achievements.',
          icon: '\u2B50',
        },
        {
          title: 'Workflows & Automations',
          description:
            'Custom workflows triggered by events or schedules to streamline team processes.',
          icon: '\u2699\uFE0F',
        },
        {
          title: 'Mood & Wellness Tracking',
          description:
            'Track team sentiment over time to maintain a healthy and engaged workforce.',
          icon: '\u{1F4CA}',
        },
        {
          title: 'Multi-Platform Integration',
          description:
            'Works with Slack, Microsoft Teams, Google Chat, Discord, and many more tools.',
          icon: '\u{1F517}',
        },
      ],
      timelineTitle: 'DailyBot Articles',
      emptyState: 'No DailyBot articles available yet. Check back soon!',
      ctaText: 'Visit DailyBot',
      ctaLink: 'https://dailybot.com',
    },

    // Entrepreneur page
    entrepreneurPage: {
      title: 'Entrepreneur',
      subtitle: 'Building the future, one venture at a time',
      description:
        'The entrepreneurial journey of Sergio Alexander Florez Galeano — from engineer to founder.',
      heroDescription:
        'Over a decade of building digital businesses, turning ideas into products, and learning from every challenge along the way.',
      journeyTitle: 'My Entrepreneurial Journey',
      journeyText:
        'My entrepreneurial path began at the intersection of engineering and ambition. With a Computer Science degree and a passion for building things, I set out to create digital products that solve real problems for real people.<br /><br />The journey has been filled with lessons — from early freelancing and consulting work to co-founding DailyBot, which would later be selected by Y Combinator. Each step taught me something new about product development, team building, and the relentless pursuit of creating value.',
      venturesTitle: 'Ventures & Projects',
      ventures: [
        {
          title: 'DailyBot (YC S21)',
          description:
            'AI-powered platform for asynchronous team collaboration. CTO & Cofounder. Selected by Y Combinator in 2021, serving thousands of teams worldwide.',
          period: '2017 - Present',
        },
        {
          title: 'Pereira Tech Talks',
          description:
            'Co-founded a thriving technology community focused on knowledge sharing, mentoring, and growing the local tech ecosystem.',
          period: '2016 - Present',
        },
        {
          title: 'Open Source & Tools',
          description:
            'Created and contributed to open-source projects including development tools, DevOps utilities, and educational resources with 113+ repositories on GitHub.',
          period: 'Ongoing',
        },
      ],
      philosophyTitle: 'My Philosophy',
      philosophyText:
        "I believe technology is a powerful force for change. The best entrepreneurs are not just builders — they are problem solvers who deeply understand the people they serve. Success comes from relentless focus on delivering value, combined with the humility to learn from every failure.<br /><br />Community is at the heart of everything I do. Whether it's building a product used by thousands of teams or organizing tech meetups in my city, the goal is always the same: connect people, share knowledge, and create opportunities.",
      lessonsTitle: 'Key Lessons',
      lessons: [
        'Talk to your users — their feedback is worth more than any assumption',
        'Move fast, but build things that last',
        'Surround yourself with people who are better than you',
        'The best time to start is now — perfectionism is the enemy of progress',
        'Community and collaboration accelerate everything',
        'Stay curious — the best ideas come from unexpected places',
      ],
    },

    // Tech Talks page
    techTalksPage: {
      title: 'Tech Talks',
      subtitle: 'Sharing knowledge, building community',
      description:
        "Sergio's involvement in tech communities, speaking engagements, and knowledge sharing.",
      heroDescription:
        'Cofounder of Pereira Tech Talks. Speaker at multiple technical conferences. Passionate about connecting professionals and sharing knowledge.',
      communityTitle: 'Pereira Tech Talks',
      communityText:
        "As cofounder and organizer of Pereira Tech Talks, I've helped build one of the most active tech communities in the region. The mission is simple: create spaces where technology professionals can share knowledge, learn from each other, and grow together.<br /><br />From small meetups to larger conferences, the community has become a platform for developers, designers, and entrepreneurs to connect, collaborate, and push the boundaries of what's possible.",
      topicsTitle: 'Topics I Cover',
      topics: [
        {
          title: 'Docker & Containers',
          description:
            'Containerization best practices, Docker workflows, and orchestration for modern applications.',
          icon: '\u{1F433}',
        },
        {
          title: 'Serverless Architecture',
          description:
            'Building scalable applications with serverless patterns on AWS and other cloud providers.',
          icon: '\u2601\uFE0F',
        },
        {
          title: 'TypeScript & Node.js',
          description:
            'Type-safe development, API design, and building robust backend services.',
          icon: '\u{1F4DD}',
        },
        {
          title: 'AI & Machine Learning',
          description:
            'Practical AI integration, LLMs in production, and the future of intelligent applications.',
          icon: '\u{1F9E0}',
        },
        {
          title: 'DevOps & CI/CD',
          description:
            'Continuous integration, deployment pipelines, and infrastructure as code practices.',
          icon: '\u{1F504}',
        },
        {
          title: 'Remote Team Building',
          description:
            'Strategies for building effective distributed teams, async communication, and team culture.',
          icon: '\u{1F30D}',
        },
        {
          title: 'Entrepreneurship in Tech',
          description:
            'Lessons from founding a YC-backed startup, product development, and growing a tech business.',
          icon: '\u{1F4A1}',
        },
        {
          title: 'Open Source Development',
          description:
            'Contributing to and maintaining open-source projects, community-driven development.',
          icon: '\u{1F310}',
        },
      ],
      philosophyTitle: 'Why I Speak',
      philosophyText:
        'I believe that the best way to learn is by teaching. Every time I prepare a talk, I deepen my own understanding. Every question from the audience opens a new perspective.<br /><br />Tech communities are the backbone of innovation. When professionals share their knowledge openly, everyone grows — from juniors learning their first framework to seniors discovering new patterns. My goal is to contribute to that cycle of knowledge and inspire others to share their own experiences.',
      ctaTitle: 'Want Me to Speak at Your Event?',
      ctaText:
        "I'm always open to speaking opportunities — from local meetups to international conferences. Let's connect!",
      timelineTitle: 'My Talks',
      emptyState: 'No tech talks available yet. Check back soon!',
    },

    // Maker page
    makerPage: {
      title: 'Maker / Builder',
      subtitle: 'Building ideas into reality',
      description:
        "Sergio's maker journey — from software projects to 3D printing, IoT, and AI exploration.",
      heroDescription:
        'A lifelong builder and technology enthusiast. From code to hardware, constantly creating and experimenting with new technologies.',
      philosophyTitle: 'The Maker Mindset',
      philosophyText:
        "I've always been driven by the urge to build things. Whether it's a web application, an open-source tool, a 3D printed prototype, or an IoT device — the process of taking an idea and turning it into something tangible is what excites me most.<br /><br />Technology is evolving at an incredible pace, and I believe the best way to understand it is to get your hands dirty. Every new project is a chance to learn, experiment, and push boundaries.",
      areasTitle: 'Areas of Exploration',
      areas: [
        {
          title: 'Artificial Intelligence',
          description:
            'Exploring AI integration, machine learning models, LLMs, and building AI-powered applications that solve real problems.',
          icon: '\u{1F916}',
        },
        {
          title: '3D Printing',
          description:
            'Recently started my 3D printing journey — designing objects, prototyping ideas, and learning CAD modeling to bring concepts to life.',
          icon: '\u{1F5A8}\uFE0F',
        },
        {
          title: 'IoT & Hardware',
          description:
            'Building connected devices, sensor projects, and exploring the world of physical computing and home automation.',
          icon: '\u{1F4E1}',
        },
        {
          title: 'Physical AI & Robotics',
          description:
            'Fascinated by embodied AI, robotics, and the convergence of software intelligence with physical systems.',
          icon: '\u{1F9BE}',
        },
        {
          title: 'Open Source',
          description:
            'With 113+ repositories on GitHub, contributing to and creating tools that help other developers build better software.',
          icon: '\u{1F310}',
        },
        {
          title: 'Full Stack Development',
          description:
            'Building web applications, APIs, and cloud-native systems with modern technologies and best practices.',
          icon: '\u{1F4BB}',
        },
      ],
      currentTitle: "What I'm Building Now",
      currentText:
        "Right now, my focus is on the exciting intersection of software and hardware. I recently got a 3D printer and I'm learning to design and print functional objects. I'm also experimenting with IoT devices and exploring how AI can be embedded into physical systems.<br /><br />Every day is an opportunity to learn something new. Whether it's a new programming language (currently exploring GoLang), a new manufacturing technique, or a new AI model — the goal is always the same: build, learn, share, repeat.",
      ctaText: 'Check My GitHub',
      ctaLink: 'https://github.com/xergioalex',
    },

    // Trading page
    tradingPage: {
      title: 'Trading Journal',
      subtitle: 'Markets, strategies & lessons learned',
      description:
        "Sergio's trading journal — weekly updates, market analysis, strategies, and lessons learned from active trading.",
      heroDescription:
        'My personal trading journal where I document my journey through the financial markets — weekly reviews, analysis, strategies, and the lessons I learn along the way.',
      journeyTitle: 'My Trading Journey',
      journeyText:
        "Trading came into my life as a natural extension of my passion for data, analysis, and pattern recognition. What started as curiosity about how financial markets work quickly became a deep interest in forex trading — the largest and most liquid market in the world.<br /><br />Over the past two years, I've dedicated significant time to studying market dynamics, understanding how macroeconomic events affect currency prices, and developing my own trading approach. This is more than a hobby — it's a discipline that challenges me every day.",
      approachTitle: 'My Approach',
      approachText:
        'I approach trading with the same mindset I bring to engineering: systematic, data-driven, and disciplined. I combine fundamental analysis (understanding how news, economic data, and geopolitical events move markets) with technical analysis (reading charts, identifying patterns, and using indicators).<br /><br />Risk management is central to my philosophy. Every trade has a clear plan — entry, stop loss, and take profit. I keep a detailed trading journal to track performance and continuously improve my decision-making process.',
      areasTitle: 'What I Study',
      areas: [
        {
          title: 'Forex Trading',
          description:
            'Currency pairs, market sessions, central bank policies, and macroeconomic drivers that move the forex market.',
          icon: '\u{1F4B1}',
        },
        {
          title: 'Algorithmic Trading',
          description:
            'Automating trading strategies, backtesting systems, and applying programming skills to build trading bots.',
          icon: '\u{1F4BB}',
        },
        {
          title: 'Market Analysis',
          description:
            'News impact analysis, economic indicators, sentiment analysis, and understanding how global events affect prices.',
          icon: '\u{1F4CA}',
        },
        {
          title: 'Risk Management',
          description:
            'Position sizing, stop-loss strategies, risk-reward ratios, and protecting capital through disciplined trading.',
          icon: '\u{1F6E1}\uFE0F',
        },
      ],
      philosophyTitle: 'Trading Philosophy',
      philosophyText:
        'Trading is a discipline, not a gamble. Success comes from education, patience, and emotional control — not from chasing quick profits. The market is the best teacher: it rewards consistency and punishes impulsiveness.<br /><br />As a technologist, I see unique opportunities in combining my engineering skills with trading. Building algorithmic systems, analyzing data patterns, and automating strategies are areas where my tech background gives me an edge. The goal is not just to trade, but to understand the markets deeply and build systems that can make intelligent decisions.',
      timelineTitle: 'Trading Journal',
      emptyState: 'No trading journal entries yet. Check back soon!',
    },

    // Foodie page
    foodiePage: {
      title: 'Foodie Enthusiast',
      subtitle: 'Exploring flavors, sharing experiences',
      description:
        "Sergio's passion for food — restaurant exploration, content creation, and cooking adventures.",
      heroDescription:
        'Beyond technology, a passionate food explorer and content creator. Discovering the best flavors and sharing them with the world.',
      passionTitle: 'My Food Passion',
      passionText:
        "Food is one of those universal languages that connects people across cultures and backgrounds. I've always been passionate about discovering new restaurants, trying new cuisines, and sharing those experiences with others.<br /><br />Whether it's a hidden gem in the city, a street food stall, or a fine dining experience — every meal tells a story. I love the adventure of exploring new flavors and the joy of recommending great places to friends and followers.",
      contentTitle: 'Content Creation',
      contentText:
        "I used to be very active sharing food content on Instagram (@xergioalex), documenting my culinary explorations through photos and stories. From restaurant recommendations to cooking experiments, my feed was a celebration of good food.<br /><br />While I've been less active recently, I'm planning to revive my food content journey. There are too many amazing restaurants and culinary experiences waiting to be discovered and shared. Stay tuned!",
      cookingTitle: 'Cooking Adventures',
      cookingText:
        "I'm not a professional chef — far from it. But I enjoy getting into the kitchen and experimenting with recipes. Cooking for me is like coding: you follow a recipe (or break one), iterate, taste-test, and sometimes create something unexpectedly delicious.<br /><br />From simple home meals to more ambitious experiments, cooking is another way I express creativity and learn something new.",
      highlights: [
        {
          title: 'Restaurant Explorer',
          description:
            'Discovering hidden gems, local favorites, and unique culinary experiences wherever I go.',
          icon: '\u{1F37D}\uFE0F',
        },
        {
          title: 'Food Photography',
          description:
            'Capturing the beauty and story behind every dish through photos and social media.',
          icon: '\u{1F4F8}',
        },
        {
          title: 'Home Cooking',
          description:
            'Experimenting with recipes, learning new techniques, and the joy of cooking for others.',
          icon: '\u{1F468}\u200D\u{1F373}',
        },
        {
          title: 'Sharing & Community',
          description:
            'Inspiring others to explore great food and connecting people through culinary experiences.',
          icon: '\u{1F91D}',
        },
      ],
      ctaText: 'Follow on Instagram',
    },

    // Hobbies page
    hobbiesPage: {
      title: 'Hobbies',
      subtitle: 'Stay active, stay curious',
      description:
        "Sergio's hobbies and active lifestyle — cycling, running, basketball, gaming, and more.",
      heroDescription:
        'Sports, gaming, and outdoor adventures — the activities that keep me balanced, energized, and inspired.',
      philosophyTitle: 'Active Lifestyle',
      philosophyText:
        "I believe that a healthy body fuels a creative mind. Sports and physical activity are not just hobbies for me — they are essential to who I am. They teach discipline, resilience, and the value of consistent effort.<br /><br />Outside of work and technology, you'll find me on a bike, on a trail, on a basketball court, or deep in a gaming session. These activities keep me grounded and provide the perfect counterbalance to the intensity of building technology products.",
      activities: [
        {
          title: 'Cycling',
          description:
            'Exploring the city on two wheels, enjoying long rides, and finding freedom on the road. Cycling is meditation in motion.',
          icon: '\u{1F6B4}',
        },
        {
          title: 'Running',
          description:
            'Building endurance, clearing the mind, and pushing personal limits. Every run is a conversation with yourself.',
          icon: '\u{1F3C3}',
        },
        {
          title: 'Basketball',
          description:
            'The thrill of team sport — competition, strategy, and the joy of playing with friends.',
          icon: '\u{1F3C0}',
        },
        {
          title: 'Mountain Hiking',
          description:
            'Conquering trails, breathing fresh air, and discovering incredible landscapes in the mountains of Colombia.',
          icon: '\u26F0\uFE0F',
        },
        {
          title: 'Chess',
          description:
            'Strategic thinking, patience, and the beauty of calculated moves. Chess is the gym for the mind.',
          icon: '\u265F\uFE0F',
        },
      ],
      gamingTitle: 'Gaming',
      gamingText:
        "Video games have been a lifelong companion. From the epic adventures of The Legend of Zelda to the hauntingly beautiful world of Hollow Knight, gaming is how I unwind, explore new worlds, and appreciate incredible storytelling and design.<br /><br />I see gaming as more than entertainment — it's interactive art. The creativity and engineering behind great games inspire me in my own work with technology.",
      readingSciFiTitle: 'Reading & Sci-Fi',
      readingSciFiText:
        "I've always been drawn to science fiction \u2014 both in books and on screen. Isaac Asimov is one of my favorite authors; his visions of the future and the ethics of technology still resonate deeply. I love films that explore time travel, dystopian futures, and space exploration. These stories fuel my imagination and offer fresh perspectives on how technology shapes humanity.",
      balanceTitle: 'Finding Balance',
      balanceText:
        "The best ideas often come when you step away from the screen. Whether it's during a long cycling ride, a mountain hike, or a competitive chess match — these moments of disconnection spark creativity and bring fresh perspectives to my work.<br /><br />Sports teach me that growth happens outside the comfort zone. That lesson applies to everything — building products, learning new skills, and living a fulfilling life.",
    },

    // Portfolio page
    portfolioPage: {
      title: 'Portfolio',
      subtitle: 'Projects & Work',
      description:
        'A showcase of my projects, experiments, and technical work across software engineering, robotics, and more.',
      heroDescription:
        'Explore my portfolio of projects spanning software development, DevOps, robotics, and emerging technologies.',
      journeyTitle: 'Building Things That Matter',
      journeyText:
        "I've always believed the best way to learn is by building. Over the years, I've worked on projects ranging from large-scale SaaS products to weekend experiments with microcontrollers. Each project taught me something new — whether it was a new technology, a better architecture pattern, or simply how to ship faster.<br /><br />This portfolio is a living collection of the work I'm most proud of. From open-source tools and DevOps infrastructure to robotics prototypes and AI experiments — each entry represents a problem I found interesting enough to solve.",
      areasTitle: "What You'll Find Here",
      areas: [
        {
          title: 'Software & SaaS',
          description:
            'Full-stack applications, APIs, and products built with modern technologies — from startup MVPs to production systems serving thousands of users.',
          icon: '\u{1F4BB}',
        },
        {
          title: 'DevOps & Infrastructure',
          description:
            'CI/CD pipelines, containerized deployments, cloud architectures, and open-source tools for developer productivity.',
          icon: '\u{2699}\uFE0F',
        },
        {
          title: 'Robotics & Hardware',
          description:
            'Autonomous robots, IoT devices, 3D printing projects, and experiments at the intersection of software and the physical world.',
          icon: '\u{1F916}',
        },
        {
          title: 'AI & Experiments',
          description:
            "Machine learning prototypes, generative AI explorations, and side projects pushing the boundaries of what's possible.",
          icon: '\u{1F9EA}',
        },
      ],
      timelineTitle: 'Projects',
      emptyState: 'No portfolio projects available yet. Check back soon!',
    },

    // Contact page
    contactPage: {
      title: 'Contact',
      subtitle: "Let's connect and build something together",
      description:
        'Get in touch with Sergio Alexander Florez Galeano — open to collaborations, speaking, and new opportunities.',
      heroDescription:
        "I'm always open to new opportunities, collaborations, and conversations. Whether you have a project idea, a speaking invitation, or just want to say hi — I'd love to hear from you.",
      formTitle: 'Send a Message',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      reasonLabel: 'I want to contact you about',
      reasonOptions: [
        { value: '', label: '— Select a topic —' },
        { value: 'general', label: 'General / Just saying hello' },
        { value: 'tech-talk', label: 'Tech talk / Speaking invitation' },
        { value: 'collaboration', label: 'Collaboration / Partnership' },
        { value: 'project', label: 'Project / Work inquiry' },
        { value: 'dailybot', label: 'Question about DailyBot' },
        { value: 'trading', label: 'Questions about my trading' },
        { value: 'other', label: 'Other' },
      ],
      subjectLabel: 'Subject',
      subjectPlaceholder: 'What is this about?',
      messageLabel: 'Message',
      messagePlaceholder: 'Write your message...',
      sendButton: 'Send Message',
      formNote: "I'll get back to you as soon as possible.",
      socialTitle: 'Connect With Me',
      locationTitle: 'Location',
      locationText:
        'Based in Colombia. Open to remote collaboration worldwide.',
    },

    contactSection: {
      title: "Let's Connect",
      description:
        "I'm always open to interesting conversations, collaboration opportunities, and new ideas. Whether you want to talk tech, entrepreneurship, or just say hello.",
      ctaText: 'Get in touch',
      ctaLink: '/contact',
    },

    // Search input
    searchPlaceholder: 'Search articles...',
    searchHint: 'Tip: press Esc to clear the search.',
    clearSearch: 'Clear',
    resultsFound: (count) => `${count} result${count !== 1 ? 's' : ''} found`,

    // Loading states
    loadingIndex: 'Loading search index...',
    searching: 'Searching articles...',

    // Results
    noResults: (query) => `No articles found matching "${query}"`,
    noResultsSuggestion: 'Try a broader keyword or browse all posts.',
    noPostsAvailable: 'No posts available yet.',

    // Pagination
    previous: 'Previous',
    next: 'Next',
    pageOf: (current, total) => `Page ${current} of ${total}`,

    // Blog header
    blogTitle: 'Blog',
    blogDescription: 'Articles about technology, programming, and more',
    allPosts: 'All Posts',
    showingArticles: (showing, total) =>
      `Showing ${showing} of ${total} articles`,
    articlesAvailable: (total) =>
      `${total} article${total !== 1 ? 's' : ''} available`,
    lastUpdatedOn: 'Last updated on',
    readingTime: (minutes) => `${minutes} min read`,
    relatedArticles: 'Related Articles',
    relatedArticlesDescription: 'You might also enjoy these posts',

    // Tags
    postsTagged: (tag) => `Posts tagged "${tag}"`,
    allTags: 'All Tags',
    tagNames: {
      tech: 'Tech',
      personal: 'Personal',
      talks: 'Talks',
      trading: 'Trading',
      portfolio: 'Portfolio',
      dailybot: 'DailyBot',
      demo: 'Demo',
    },
    tagDescriptions: {
      tech: 'Tutorials, guides, and technical articles.',
      personal: 'Articles about my life and experiences.',
      talks: 'Tech talks, slides, videos, and events.',
      trading: 'Trading journal, analysis, and learnings.',
      portfolio: 'Personal projects, software, robotics, and open source work.',
      dailybot:
        'DailyBot articles: product journey, workflow automation, and team productivity.',
      demo: 'Demo posts showcasing blog features. Only visible in dev mode.',
    },

    // Date formatting
    dateLocale: 'en-US',

    // Read more
    readMore: 'Read more',

    // Post status (dev mode indicators)
    postStatus: {
      draft: 'Draft',
      scheduled: 'Scheduled',
      'draft+scheduled': 'Draft + Scheduled',
      demo: 'Demo',
    },
    previewMode: 'Preview Mode',
    showAllPosts: 'Show all posts',
    showPublishedOnly: 'Show published only',
    publishesOn: 'Publishes on',

    // Errors
    searchError: 'An error occurred while searching. Please try again.',
    loadError: 'Failed to load search index. Please refresh the page.',
    retry: 'Try again',
  },
  es: {
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
          'Construir es lo que mejor hago. Como CTO de <a href="https://dailybot.com" target="_blank" rel="noopener" class="text-secondary hover:underline">DailyBot (YC S21)</a>, he dise\u00F1ado la arquitectura de una plataforma utilizada por miles de equipos en Slack, Microsoft Teams y Google Chat. M\u00E1s all\u00E1 de DailyBot, estoy constantemente lanzando proyectos \u2014 desde Moltbot (IA en Raspberry Pi) hasta Syntro (soporte con IA) y SysPrompt (gesti\u00F3n de prompts para LLMs).<br /><br />Con 113+ repositorios en GitHub y proyectos en Python, Go, TypeScript y m\u00E1s, creo que la mejor forma de aprender nueva tecnolog\u00EDa es construir algo real con ella.',
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
      portfolioProjectsTitle: 'Portafolio y Proyectos',
      portfolioProjectsViewAll: 'Ver todos los posts del portafolio',
      portfolioProjectsEmpty: 'Próximamente más proyectos.',
      techTalksPostsTitle: 'Charlas Recientes',
      techTalksPostsViewAll: 'Ver todas las charlas',
      techTalksPostsEmpty: 'Próximamente más charlas.',
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
      emptyState:
        'Aún no hay entradas en el diario de trading. ¡Vuelve pronto!',
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

    // Errors
    searchError: 'Ocurrió un error al buscar. Por favor intenta de nuevo.',
    loadError:
      'Error al cargar el índice de búsqueda. Por favor recarga la página.',
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
