/**
 * English translations
 */

import type { SiteTranslations } from './types';

export const en: SiteTranslations = {
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
    viewAllPosts: 'View all posts',
    portfolioProjectsTitle: 'Portfolio & Projects',
    portfolioProjectsViewAll: 'View all portfolio posts',
    portfolioProjectsEmpty: 'More projects coming soon.',
    techTalksPostsTitle: 'Recent Tech Talks',
    techTalksPostsViewAll: 'View all tech talks',
    techTalksPostsEmpty: 'More talks coming soon.',
    dailybotPostsTitle: 'Latest DailyBot Articles',
    dailybotPostsViewAll: 'View all DailyBot articles',
    dailybotPostsEmpty: 'DailyBot articles coming soon.',
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
        skills: ['Machine Learning', 'Data Science', 'LLMs', 'AI Integration'],
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
    locationText: 'Based in Colombia. Open to remote collaboration worldwide.',
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

  // Scroll to timeline
  scrollToTimeline: 'View Timeline',
  viewLabel: (label: string) => `View ${label}`,

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
};
