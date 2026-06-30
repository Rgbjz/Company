export type Locale = 'uk' | 'en';
type L = Record<Locale, string>;

export type Experience = {
  company: string;
  role: L;
  period: string;
  description: L;
  tech?: string[];
};

export type Member = {
  slug: string;
  name: L;
  role: L; // короткая роль на карточке
  position?: L; // основная должность (на странице профиля)
  /** путь к фото в /public, например '/team/kyrylo-kovalchuk.jpg' */
  photo?: string;
  /** CSS object-position для кадрирования фото, например '50% 65%' (по умолчанию центр) */
  photoPosition?: string;
  summary?: L;
  /** путь к видео в /public, например '/team/mykyta-burma.mp4' (пока заглушка) */
  video?: string;
  /** путь к WebM-версии (VP9/AV1) — основной источник, mp4 как фолбэк */
  videoWebm?: string;
  /** постер-превью для видео, например '/team/mykyta-burma.jpg' */
  videoPoster?: string;
  skills?: string[];
  experience?: Experience[];
  placeholder?: boolean;
};

export const TEAM: Member[] = [
  {
    slug: 'mykyta-burma',
    name: { uk: 'Микита Бурма', en: 'Mykyta Burma' },
    role: { uk: 'Blockchain-експерт · Fullstack', en: 'Blockchain Expert · Fullstack' },
    position: { uk: 'Blockchain-експерт / Fullstack-розробник', en: 'Blockchain Expert / Fullstack Developer' },
    video: '/team/mykyta-burma.mp4',
    videoWebm: '/team/mykyta-burma.webm',
    summary: {
      uk: 'Fullstack-розробник із 5+ роками досвіду створення масштабованих веб-застосунків. Блокчейн-експерт: глибока робота з TON, токеномікою та real-time мультиплеєром.',
      en: 'Fullstack developer with 5+ years building scalable web applications. Blockchain expert with deep hands-on work in TON, token economy and real-time multiplayer.',
    },
    skills: ['React.js', 'Next.js', 'NestJS', 'Node.js', 'TON', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'GraphQL', 'Docker'],
    experience: [
      {
        company: 'Telegram Game',
        role: { uk: 'Fullstack-розробник', en: 'Fullstack Developer' },
        period: '09.2024 — present',
        description: {
          uk: 'Web3-гра в Telegram (Top-10): core-механіки, торгівля TON, депозити та виведення токенів, real-time мультиплеєр і адмін-панель.',
          en: 'Top-10 Telegram Web3 game: core mechanics, TON trading, token deposits/withdrawals, real-time multiplayer and an admin panel.',
        },
        tech: ['React.js', 'NestJS', 'MongoDB', 'Redis', 'BullMQ', 'TON'],
      },
      {
        company: 'Mithril Development',
        role: { uk: 'Fullstack-розробник', en: 'Fullstack Developer' },
        period: '04.2023 — 07.2024',
        description: {
          uk: 'AI-платформа операційного моніторингу для нафтогазу: GraphQL-to-REST адаптер, керування користувачами (AWS Cognito), SSO (SAML/OIDC), мікросервіси на AWS Lambda.',
          en: 'AI-powered operational intelligence platform for oil & gas: GraphQL-to-REST adapter, user management (AWS Cognito), SSO (SAML/OIDC), microservices on AWS Lambda.',
        },
        tech: ['React.js', 'NestJS', 'AWS Lambda', 'DynamoDB', 'GraphQL'],
      },
      {
        company: 'Mithril Development',
        role: { uk: 'Fullstack-розробник', en: 'Fullstack Developer' },
        period: '01.2021 — 02.2023',
        description: {
          uk: 'AI-платформа для розвитку комунікації на OpenAI (текст + голос) та high-load gambling-платформа з інтеграцією провайдерів і платежів.',
          en: 'OpenAI-powered communication-skills platform (text + voice) and a high-load gambling platform with game-provider and payment integrations.',
        },
        tech: ['React.js', 'Node.js', 'OpenAI', 'PostgreSQL', 'Firebase'],
      },
    ],
  },
  {
    slug: 'oleksandr-lambert',
    name: { uk: 'Олександр Ламбер', en: 'Oleksandr Lambert' },
    role: { uk: 'Project Manager · Fullstack', en: 'Project Manager · Fullstack' },
    position: { uk: 'Project Manager / Fullstack-розробник', en: 'Project Manager / Fullstack Developer' },
    photo: '/team/oleksandr-lambert.jpg',
    photoPosition: '50% 35%',
    summary: {
      uk: 'Fullstack-розробник із 4 роками досвіду та проджект-менеджер. Веде продукти від ідеї до релізу в e-commerce, логістиці та фінтеху. Agile/Scrum, чистий код і чудовий UX.',
      en: 'Fullstack developer (4 years) and project manager. Drives products from idea to release across e-commerce, logistics and fintech. Agile/Scrum, clean code, great UX.',
    },
    skills: ['React.js', 'Vue.js', 'NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'TailwindCSS', 'Agile/Scrum'],
    experience: [
      {
        company: 'E-Commerce Admin Dashboard',
        role: { uk: 'Project Manager / Fullstack', en: 'Project Manager / Fullstack' },
        period: '2025 — present',
        description: {
          uk: 'Адмін-панель для онлайн-рітейлу: React + Zustand, NestJS + PostgreSQL, Redis-кеш, налаштування CI/CD (GitHub Actions).',
          en: 'Admin panel for online retail: React + Zustand, NestJS + PostgreSQL, Redis caching, CI/CD pipelines (GitHub Actions).',
        },
        tech: ['React.js', 'NestJS', 'PostgreSQL', 'Redis', 'TypeORM'],
      },
      {
        company: 'Delivery Management System',
        role: { uk: 'Frontend-розробник', en: 'Frontend Developer' },
        period: '2023 — 2024',
        description: {
          uk: 'Логістична платформа: real-time трекінг доставок (WebSocket), дашборди диспетчерів, складні форми зі схема-валідацією.',
          en: 'Logistics platform: real-time delivery tracking (WebSocket), dispatcher dashboards, complex schema-validated forms.',
        },
        tech: ['React.js', 'NestJS', 'Socket.IO', 'PostgreSQL'],
      },
      {
        company: 'Investment Banking Platform',
        role: { uk: 'Frontend-розробник', en: 'Frontend Developer' },
        period: '2022 — 2023',
        description: {
          uk: 'Портфельна аналітика, deal pipeline, real-time котирування, складні таблиці з пагінацією та віртуалізацією.',
          en: 'Portfolio analytics, deal pipeline, real-time quotes, complex tables with pagination and virtualization.',
        },
        tech: ['React.js', 'Redux', 'React Query', 'WebSockets'],
      },
    ],
  },
  {
    slug: 'kyrylo-kovalchuk',
    name: { uk: 'Кирило Ковальчук', en: 'Kyrylo Kovalchuk' },
    role: { uk: 'Бізнес-аналітик · Fullstack', en: 'Business Analyst · Fullstack' },
    video: '/team/kyrylo-kovalchuk.mp4',
    videoWebm: '/team/kyrylo-kovalchuk.webm',
    position: { uk: 'Бізнес-аналітик / Fullstack-розробник', en: 'Business Analyst / Fullstack Developer' },
    photo: '/team/kyrylo-kovalchuk.jpg',
    summary: {
      uk: 'Fullstack-розробник із 5 роками досвіду (proptech, фінтех, AI) та бізнес-аналітик. Володіє фічею від API-контракту до UI; запускав AI-агентів у проді (LangGraph + OpenAI).',
      en: 'Fullstack developer (5 years across proptech, fintech, AI) and business analyst. Owns features from API contract to UI; shipped AI agents to production (LangGraph + OpenAI).',
    },
    skills: ['React.js', 'Next.js', 'NestJS', 'Node.js', 'FastAPI', 'TypeScript', 'PostgreSQL', 'LangGraph', 'OpenAI', 'Redis', 'Docker'],
    experience: [
      {
        company: 'Mithril Development',
        role: { uk: 'Fullstack-розробник', en: 'Fullstack Developer' },
        period: '2023 — 2026',
        description: {
          uk: 'Швейцарська платформа авто-лізингу (онлайн-заявка, калькулятор, e-signature/KYC) та AI-агент оптимізації покупок (LangGraph, OpenAI/Azure) — у проді на 100% користувачів.',
          en: 'Swiss auto-leasing platform (online application, rate calculator, e-signature/KYC) and an AI shopping-optimization agent (LangGraph, OpenAI/Azure) rolled out to 100% of users.',
        },
        tech: ['React.js', 'Next.js', 'NestJS', 'LangGraph', 'OpenAI'],
      },
      {
        company: 'Elementica',
        role: { uk: 'Fullstack-розробник', en: 'Fullstack Developer' },
        period: '2022 — 2023',
        description: {
          uk: 'B2B SaaS для реєстрів акцій і комплаєнсу: TS-монорепо (React + Vite), спільна UI-бібліотека, авто-генерований API-клієнт, бекенд на FastAPI + Celery.',
          en: 'B2B SaaS for share registries and compliance: TS monorepo (React + Vite), shared UI library, auto-generated API client, FastAPI + Celery backend.',
        },
        tech: ['React.js', 'Vite', 'FastAPI', 'Celery', 'PostgreSQL'],
      },
      {
        company: 'Ficus Tech',
        role: { uk: 'Frontend / Fullstack', en: 'Frontend / Fullstack' },
        period: '2021 — 2022',
        description: {
          uk: 'SaaS для оренди житла й управління каналами (Airbnb/Booking): дашборд, синхронізація з OTA API, єдина скринька повідомлень і динамічне ціноутворення.',
          en: 'Vacation-rental & channel-management SaaS (Airbnb/Booking): dashboard, OTA API sync, unified messaging inbox and dynamic pricing.',
        },
        tech: ['React.js', 'NestJS', 'PostgreSQL', 'Redis'],
      },
    ],
  },
  {
    slug: 'volodymyr-tarasiuk',
    name: { uk: 'Володимир Тарасюк', en: 'Volodymyr Tarasiuk' },
    role: { uk: 'Full-Stack JS · AI', en: 'Full-Stack JS · AI' },
    position: { uk: 'Full-Stack JS-розробник (Node.js / AI)', en: 'Full-Stack JS Developer (Node.js / AI)' },
    photo: '/team/volodymyr-tarasiuk.jpg?v=5',
    summary: {
      uk: 'Full-Stack розробник із 3+ роками досвіду: Node.js, React/Next.js та AI-застосунки. Інтегрує LLM-архітектури (RAG) у бізнес-процеси та модернізує застарілі enterprise-системи; чистий код і масштабовані платформи.',
      en: 'Full-Stack developer with 3+ years of experience: Node.js, React/Next.js and AI-driven apps. Integrates LLM architectures (RAG) into business workflows and modernizes legacy enterprise systems; clean code and scalable platforms.',
    },
    skills: ['React', 'Next.js', 'Node.js', 'NestJS', 'TypeScript', 'Python', 'LangChain', 'RAG', 'PostgreSQL', 'Redis', 'Supabase', 'GraphQL', 'Docker'],
    experience: [
      {
        company: 'Mithril Development',
        role: { uk: 'Full-Stack розробник (Node.js / AI)', en: 'Full-Stack Developer (Node.js / AI)' },
        period: '2024 — 2026',
        description: {
          uk: 'AI-освітня платформа (семантичний пошук та індексація документів на LangChain + векторні БД), фронтенд AI travel-соцмережі з чат-помічником, SaaS-платформа настільних ігор на Next.js, мульти-тенантне Telegram-казино та B2B-інтеграції ігрових провайдерів.',
          en: 'AI educational platform (semantic search & document indexing with LangChain + vector DBs), frontend for an AI travel social network with a chat helper, a Next.js SaaS board-game platform, a multi-tenant Telegram social casino, and B2B gaming-provider integrations.',
        },
        tech: ['Node.js', 'NestJS', 'Next.js', 'LangChain', 'PostgreSQL'],
      },
      {
        company: 'ArtyDev',
        role: { uk: 'Full-Stack розробник (SharePoint / Frontend)', en: 'Full-Stack Developer (SharePoint / Frontend)' },
        period: '2021 — 2022',
        description: {
          uk: 'Міграція legacy enterprise-систем (.NET Framework → .NET Core, Razor Pages → Angular 14), кастомні SharePoint web-parts на React/Angular та клієнтська генерація PDF (jsPDF).',
          en: 'Legacy enterprise migration (.NET Framework → .NET Core, Razor Pages → Angular 14), custom SharePoint web parts in React/Angular, and client-side PDF generation (jsPDF).',
        },
        tech: ['ASP.NET Core', 'C#', 'React', 'Angular', 'SharePoint'],
      },
    ],
  },
  {
    slug: 'oles-lukashev',
    name: { uk: 'Олесь Лукашев', en: 'Oles Lukashev' },
    role: { uk: 'Full-Stack JavaScript', en: 'Full-Stack JavaScript' },
    position: { uk: 'Full-Stack JavaScript-розробник', en: 'Full-Stack JavaScript Developer' },
    photo: '/team/oles-lukashev.jpg?v=2',
    summary: {
      uk: 'Full-Stack JavaScript-розробник із 4 роками досвіду створення динамічних вебзастосунків і масштабованих сервісів. Впевнено працює з Node.js, React та TypeScript на всьому циклі розробки; пише чистий, підтримуваний і продуктивний код.',
      en: 'Full-Stack JavaScript developer with 4 years of experience building dynamic web applications and scalable backend services. Proficient with Node.js, React and TypeScript across the full development lifecycle; writes clean, maintainable and high-performance code.',
    },
    skills: ['JavaScript', 'TypeScript', 'Node.js', 'Express', 'React', 'REST API', 'PostgreSQL', 'MongoDB', 'Git'],
    experience: [
      {
        company: 'Remote / Contract Work',
        role: { uk: 'Middle Full-Stack розробник', en: 'Middle Full Stack Developer' },
        period: '2024 — Present',
        description: {
          uk: 'Проєктування й розробка масштабованої серверної логіки та REST API на Node.js і Express, оптимізація рендеру фронтенду й UI-компонентів, проєктування схем БД (PostgreSQL, MongoDB) та підтримка крос-платформних середовищ (macOS/Linux).',
          en: 'Architected and developed scalable server-side logic and REST APIs with Node.js and Express, optimized frontend rendering and UI components, designed database schemas (PostgreSQL, MongoDB) and maintained cross-platform dev environments (macOS/Linux).',
        },
        tech: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
      },
      {
        company: 'Mithrill',
        role: { uk: 'Junior Full-Stack веброзробник', en: 'Junior Full-Stack Web Developer' },
        period: '2022 — 2024',
        description: {
          uk: 'Розробка інтерактивних користувацьких фіч на сучасних JS-фреймворках із адаптивним дизайном, інтеграція фронтенду з бекенд-сервісами та сторонніми API, робота з Git (rebase, вирішення конфліктів) у командному середовищі.',
          en: 'Built interactive user-facing features with modern JS frameworks and responsive design, integrated frontend with backend services and third-party APIs, and managed version control with Git (rebasing, conflict resolution) in a collaborative team.',
        },
        tech: ['JavaScript', 'React', 'REST API', 'Git'],
      },
    ],
  },
  { slug: 'open-1', name: { uk: 'Скоро', en: 'Coming soon' }, role: { uk: 'Відкрита позиція', en: 'Open position' }, placeholder: true },
];

export const getMember = (slug: string) => TEAM.find((m) => m.slug === slug);

export const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
