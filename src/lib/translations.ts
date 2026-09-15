export const translations = {
  ru: {
    seo: {
      title: "Revyakin.tech — Веб-разработка и мобильные приложения",
      description: "Разрабатываю сайты, мобильные приложения и сервисы под ключ. React, Flutter, Next.js, Python. Прокопьевск, Россия.",
      keywords: "веб-разработка, мобильные приложения, React, Flutter, Python, создание сайтов, разработка ПО, Прокопьевск",
      ogTitle: "Revyakin.tech — Веб-разработка и мобильные приложения",
      ogDescription: "Разрабатываю сайты, мобильные приложения и сервисы под ключ. От идеи до запуска.",
    },
    nav: {
      home: "Главная",
      work: "Работы",
      services: "Услуги",
      about: "Обо мне",
      contact: "Контакты",
    },
    hero: {
      badge: "Веб-разработка & App",
      title: "Сайты и приложения, которые работают на ваш бизнес",
      description: "Создаю сайты, мобильные приложения и сервисы под ключ — от идеи до запуска. Быстро, надёжно, с заботой о деталях.",
      ctaProject: "Обсудить проект",
      ctaServices: "Мои услуги",
    },
    work: {
      title: "Проекты",
      subtitle: "/ Избранные работы",
      githubLink: "🔗 Посмотреть на GitHub",
      liveLink: "🔗 Открыть сайт",
      projects: [
        {
          n: "00",
          t: "SkinCanvas — AI-сервис для татуировок",
          s: "Личный проект / React + Express + OpenAI",
          y: "2026",
          description: "<strong>SkinCanvas</strong> — AI-сервис для тех, кто собирается сделать татуировку: помогает придумать эскиз, примерить его на фото своего тела и доработать уже существующую работу.\n\n<strong>Задача.</strong> Решиться на татуировку сложно: непонятно, как рисунок будет смотреться на теле, как совместить его со старыми работами и что показать мастеру. Нужен был сервис, где всё это можно увидеть заранее — без походов по салонам и долгих переписок.\n\n<strong>Что сделал.</strong> Собственный проект — полностью в одиночку: от интерфейса и нейросетевых сценариев до платежей и юридической части.\n\n<strong>Для пользователя</strong> — девять сценариев на нейросетях: бесплатный AI-консультант, генерация эскизов и рукавов, примерка рисунка на фото тела, доработка, связка и перекрытие существующих татуировок, эскиз для мастера. Результаты сохраняются в личную галерею.\n\n<strong>Деньги.</strong> Внутренний счёт с ценой на каждой кнопке, приём платежей через Robokassa, защита от двойных списаний и автоматический возврат, если нейросеть не справилась. После подтверждения почты начисляются пробные единицы — человек видит результат раньше, чем достаёт карту.\n\n<strong>Надёжность.</strong> Очередь задач для долгих генераций, которая переживает перезапуск сервера; проверка запроса до платного вызова модели; защита загрузок от подмены и «бомб» в картинках. Код покрыт автотестами — больше 90 тестовых файлов.\n\n<strong>Поиск и закон.</strong> Около 50 публичных страниц — сценарии, стили, места на теле, блог — отрисовываются заранее, чтобы их видели Яндекс и Google. Данные хранятся на сервере в России по 152-ФЗ, документы и согласия оформлены.\n\n<strong>Результат.</strong> Запущен в продакшен за 3 месяца — работает и принимает оплату.\n\n<strong>Стек:</strong> React · TypeScript · Vite · TanStack Query · Express · PostgreSQL · Prisma · OpenAI · MinIO (S3) · sharp · Robokassa · Docker · Caddy",
          liveLink: "https://skincanvas.ru",
        },
        {
          n: "00",
          t: "Moodboard — платформа для онлайн-издания",
          s: "Медиаплатформа / React + TanStack Start + PostgreSQL",
          y: "2026",
          description: "<strong>Moodboard</strong> — медиаплатформа с полным редакционным циклом: авторы и эксперты присылают материалы через личный кабинет, редакция их принимает и публикует, читатели сохраняют статьи, комментируют и записываются на события.\n\n<strong>Задача.</strong> Издание жило на разрозненных инструментах: тексты приходили в почту и мессенджеры, публикация делалась вручную, у авторов не было своего пространства, а у редакции — единой картины, что на каком этапе. Нужна была своя платформа: витрина для читателей, кабинеты для авторов и полноценная редакционная система.\n\n<strong>Что сделал.</strong> Спроектировал и разработал продукт целиком — в одиночку, включая дизайн.\n\n<strong>Для читателя</strong> — сайт издания с рубриками, новостями, лентой событий, подписками на авторов, сохранёнными материалами и персональной подборкой по интересам. Страницы рендерятся на сервере, поэтому материалы сразу видны поисковикам.\n\n<strong>Для авторов и экспертов</strong> — личные кабинеты: подать материал, получить правки от редакции, вести переписку, отвечать на запросы.\n\n<strong>Для редакции</strong> — административная панель: приёмка материалов по этапам, модерация комментариев и заявок, управление рубриками и рекламными кампаниями, рассылка с подтверждением подписки, работа с обращениями.\n\n<strong>Медиа.</strong> Загрузка фотографий с автоматической подготовкой под все размеры экранов, кадрирование обложек, приватное хранилище документов, загрузка и конвертация видео.\n\n<strong>Дизайн</strong> — от концепции до вёрстки: фирменная система стилей и интерактивный навигатор в виде вращающегося купола, ставший визуальной подписью издания.\n\n<strong>Результат.</strong> Первая версия запущена в продакшен за 4 месяца — от идеи до работающего издания на собственном сервере с резервным копированием и обновлением одной кнопкой. Проект развивается дальше: в работе следующий пакет функциональности.\n\n<strong>Стек:</strong> React · TypeScript · TanStack Start · PostgreSQL · Drizzle ORM · Better Auth · MinIO (S3) · sharp · ffmpeg · Docker · Nginx",
        },
        {
          n: "01",
          t: "WorkHub — маркетплейс услуг",
          s: "Веб-платформа / React 19 + Express + PostgreSQL",
          y: "2026",
          description: "<strong>WorkHub</strong> — маркетплейс услуг: заказчики публикуют задачи, исполнители откликаются. Поиск заказов на карте, чат в реальном времени, взаимные оценки после сделки.\n\n<strong>Задача.</strong> Свести заказчиков и исполнителей в одном месте — вместо разрозненных объявлений, переписок в мессенджерах и сделок без гарантий.\n\n<strong>Что сделал.</strong> Весь проект — в одиночку: пользовательское приложение, административную панель для модерации и статистики, серверную инфраструктуру. Отдельно — защиту от накруток и мошенничества: подтверждение почты, дневные лимиты действий, блокировки. Настроил мониторинг: бот в Telegram сам сообщает о сбоях, месте на диске, бэкапах и сроке сертификата.\n\n<strong>Результат.</strong> Полностью рабочий продукт с нуля за 3 месяца, развёрнут на VPS с резервным копированием и защищённым соединением.\n\n<strong>Стек:</strong> React 19 · TypeScript · TanStack Query · Express.js · PostgreSQL · Drizzle ORM · Яндекс Карты · nginx · PM2",
        },
        {
          n: "02",
          t: "GreenG — сервис заказа садовых услуг",
          s: "Мобильное приложение и веб / Flutter + NestJS",
          y: "2026",
          description: "<strong>GreenG</strong> — сервис заказа садовых услуг для рынка США. Мобильное приложение и сайт для поиска исполнителей: заказы на карте, общение с мастером и оплата внутри сервиса.\n\n<strong>Задача.</strong> Быстро найти исполнителя рядом и провести всё — от выбора до оплаты — в одном приложении, без телефонных звонков и расчётов наличными.\n\n<strong>Что сделал.</strong> Весь проект — в одиночку: мобильное приложение для iOS и Android, веб-версию и панель администратора на общей серверной части. Подключил карты и геопоиск, чат с мгновенной доставкой сообщений и push-уведомлениями, приём платежей через Stripe. Настроил систему наблюдения за сервисом с дашбордами — проблемы видно до того, как о них сообщат пользователи.\n\n<strong>Результат.</strong> Проект сдан заказчику за 9 месяцев: путь клиента от заявки до оплаты закрыт внутри сервиса.\n\n<strong>Стек:</strong> Flutter · React · NestJS · TypeScript · MongoDB · Redis · Socket.IO · Stripe · Google Maps · Firebase · Docker · Grafana",
        },
        {
          n: "03",
          t: "Inna Bot — AI-ассистент в Telegram",
          s: "Личный проект / Python + OpenAI",
          y: "2025",
          description: "<strong>Inna Bot</strong> — личный AI-ассистент, который работает прямо в аккаунте Telegram. Помнит прошлые разговоры, понимает голосовые сообщения и картинки, сам ищет информацию в интернете и ставит напоминания.\n\n<strong>Задача.</strong> Обычные чат-боты отвечают шаблонно и забывают разговор через пару сообщений. Хотелось ассистента, который помнит, о чём шла речь неделю назад, и подстраивается под собеседника.\n\n<strong>Что сделал.</strong> Собственный проект — полностью в одиночку. Долговременную память с поиском по смыслу: бот находит в истории переписки нужные фрагменты и опирается на них в ответе (RAG). Анализ предпочтений собеседника для персонализации. Распознавание и озвучку голосовых, разбор изображений. Веб-поиск, который бот включает сам, когда без свежих данных не ответить. Напоминания и контроль расходов на запросы к нейросети.\n\n<strong>Результат.</strong> Рабочий ассистент за 2 месяца. Модульная архитектура: каждая возможность — отдельный сервис, новые добавляются без переписывания остального.\n\n<strong>Стек:</strong> Python · asyncio · Telethon · OpenAI GPT-4o · ChromaDB · Sentence Transformers · scikit-learn · spaCy · Yandex SpeechKit · SerpAPI · SQLite",
        },
        {
          n: "04",
          t: "СантехникЪ — сайт магазина сантехники",
          s: "Сайт-каталог / React + TypeScript",
          y: "2026",
          description: "<strong>СантехникЪ</strong> — сайт магазина сантехники в Саратове: каталог товаров с многоуровневыми разделами, поиск, страницы доставки и контактов.\n\n<strong>Задача.</strong> Дать местному магазину удобную витрину в интернете: чтобы покупатель быстро находил нужную позицию в большом ассортименте — и с телефона, и с компьютера, — а сам сайт находили в поиске по городу.\n\n<strong>Что сделал.</strong> Весь проект — в одиночку: каталог с вложенными разделами (категория → группа → товар), поиск по товарам, страницы «О компании», «Доставка» и «Контакты», адаптивный интерфейс. Подготовил сайт к продвижению в локальной выдаче: мета-теги с привязкой к городу, разметка для соцсетей. Каталог хранится в JSON-файлах — ассортимент обновляется без базы данных и отдельного сервера.\n\n<strong>Результат.</strong> Готовый сайт за 3 недели, сдан заказчику.\n\n<strong>Стек:</strong> React · TypeScript · Vite · Tailwind CSS · shadcn/ui · React Router · TanStack Query",
          githubLink: "https://github.com/ignitione1/plumbing_store",
        },
      ],
    },
    services: {
      title: "Услуги",
      subtitle: "/ Мои компетенции",
      items: {
        web: {
          title: "Веб-разработка",
          description: "Сайты и веб-приложения любой сложности — от лендингов до корпоративных платформ",
        },
        mobile: {
          title: "Мобильные приложения",
          description: "Нативные и кроссплатформенные приложения для iOS и Android — от прототипа до App Store",
        },
        backend: {
          title: "Бэкенд и API",
          description: "Разработка серверной части, интеграции, базы данных и облачная инфраструктура",
        },
        design: {
          title: "UI/UX Дизайн",
          description: "Удобные интерфейсы: прототипы, дизайн-системы, адаптив",
        },
      },
    },
    about: {
      title: "Код, который решает задачи бизнеса",
      description1: "Превращаю идеи в работающие продукты. Без воды и лишних слов.",
      description2: "Беру проекты под ключ и остаюсь на связи после запуска — потому что хороший продукт развивается постоянно.",
      stats: {
        projects: {
          value: "10+",
          label: "Проектов",
          sublabel: "Работают прямо сейчас",
        },
        experience: {
          value: "8+",
          label: "Технологий",
          sublabel: "Web · Mobile · AI · Backend",
        },
        clients: {
          value: "2",
          label: "Года",
          sublabel: "В коммерческой разработке",
        },
      },
      ctaProject: "Начать проект",
      ctaWork: "Смотреть работы",
    },
    contact: {
      title: "Давайте поговорим",
      subtitle: "/ Свяжитесь со мной",
      email: "Email",
      location: "Локация",
      locationValue: "Прокопьевск, Россия",
      form: {
        name: "Имя",
        namePlaceholder: "Ваше имя",
        contact: "Контакты",
        contactPlaceholder: "telegram, vk, email...",
        message: "Сообщение",
        messagePlaceholder: "Расскажите о вашем проекте...\nСообщение придёт в мой Telegram — если не отправится, напишите через контакты.",
        submit: "Отправить",
        submitting: "Отправка...",
        success: "Отправлено!",
        error: "Ошибка отправки. Попробуйте позже.",
      },
    },
  },
  en: {
    seo: {
      title: "Revyakin.tech — Web Development & Mobile Apps",
      description: "I build websites, mobile apps, and services from scratch. React, Flutter, Next.js, Python. Prokopyevsk, Russia.",
      keywords: "web development, mobile apps, React, Flutter, Python, website creation, software development, Prokopyevsk",
      ogTitle: "Revyakin.tech — Web Development & Mobile Apps",
      ogDescription: "I build websites, mobile apps, and services from scratch. From idea to launch.",
    },
    nav: {
      home: "Home",
      work: "Work",
      services: "Services",
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "Web Development & App",
      title: "Apps & sites that work for your business",
      description: "I create websites, mobile apps, and services from scratch — from idea to launch. Fast, reliable, with attention to detail.",
      ctaProject: "Discuss project",
      ctaServices: "My services",
    },
    work: {
      title: "Projects",
      subtitle: "/ Selected work",
      githubLink: "🔗 View on GitHub",
      liveLink: "🔗 Visit site",
      projects: [
        {
          n: "00",
          t: "SkinCanvas — AI Tattoo Service",
          s: "Personal Project / React + Express + OpenAI",
          y: "2026",
          description: "<strong>SkinCanvas</strong> — an AI service for people planning a tattoo: it helps come up with a design, try it on a photo of your own body, and rework a tattoo you already have.\n\n<strong>The goal.</strong> Committing to a tattoo is hard: it's unclear how the design will look on the body, how to combine it with existing work, and what to show the artist. The service lets you see all of that in advance — without visiting studios or long back-and-forth chats.\n\n<strong>What I built.</strong> A personal project, built entirely solo: from the interface and AI scenarios to payments and the legal side.\n\n<strong>For users</strong> — nine AI-powered scenarios: a free AI consultant, design and sleeve generation, try-on on a body photo, reworking, connecting and covering up existing tattoos, and a sketch for the artist. Results are saved to a personal gallery.\n\n<strong>Payments.</strong> An in-app balance with the price shown on every button, Robokassa payments, protection against double charges, and automatic refunds when the model fails. Trial credits after email verification — users see a result before reaching for their card.\n\n<strong>Reliability.</strong> A job queue for long generations that survives server restarts; request checks before any paid model call; upload protection against spoofed files and image \"bombs\". Covered by automated tests — 90+ test files.\n\n<strong>Search and compliance.</strong> About 50 public pages — scenarios, styles, body placements, blog — are pre-rendered so Yandex and Google can index them. Data is stored on servers in Russia under local data protection law (152-FZ), with legal documents and consents in place.\n\n<strong>Result.</strong> Launched in 3 months — live in production and accepting payments.\n\n<strong>Stack:</strong> React · TypeScript · Vite · TanStack Query · Express · PostgreSQL · Prisma · OpenAI · MinIO (S3) · sharp · Robokassa · Docker · Caddy",
          liveLink: "https://skincanvas.ru",
        },
        {
          n: "00",
          t: "Moodboard — Online Publication Platform",
          s: "Media Platform / React + TanStack Start + PostgreSQL",
          y: "2026",
          description: "<strong>Moodboard</strong> — a media platform with a full editorial workflow: authors and experts submit pieces through their personal accounts, editors review and publish them, and readers save articles, comment, and sign up for events.\n\n<strong>The goal.</strong> The publication ran on scattered tools: texts arrived by email and in messengers, publishing was manual, authors had no space of their own, and editors had no single view of what stage each piece was at. It needed its own platform: a storefront for readers, accounts for authors, and a proper editorial system.\n\n<strong>What I built.</strong> Designed and developed the entire product solo, including the visual design.\n\n<strong>For readers</strong> — the publication's website with sections, news, an events feed, author subscriptions, saved articles, and a personalized feed based on interests. Pages are server-rendered, so content is immediately visible to search engines.\n\n<strong>For authors and experts</strong> — personal accounts: submit a piece, receive editor feedback, keep a conversation going, respond to requests.\n\n<strong>For editors</strong> — an admin panel: staged review of submissions, moderation of comments and applications, management of sections and ad campaigns, a newsletter with double opt-in, and handling of inquiries.\n\n<strong>Media.</strong> Photo uploads automatically prepared for every screen size, cover cropping, private document storage, and video upload with conversion.\n\n<strong>Design</strong> — from concept to implementation: a brand style system and an interactive navigator shaped like a rotating dome, which became the publication's visual signature.\n\n<strong>Result.</strong> The first version went live in 4 months — from idea to a working publication on its own server, with backups and one-click deploys. The project keeps evolving: the next feature set is in progress.\n\n<strong>Stack:</strong> React · TypeScript · TanStack Start · PostgreSQL · Drizzle ORM · Better Auth · MinIO (S3) · sharp · ffmpeg · Docker · Nginx",
        },
        {
          n: "01",
          t: "WorkHub — Services Marketplace",
          s: "Web platform / React 19 + Express + PostgreSQL",
          y: "2026",
          description: "<strong>WorkHub</strong> — a services marketplace: clients post tasks, freelancers respond. Map-based job search, real-time chat, and mutual reviews after each deal.\n\n<strong>The goal.</strong> Bring clients and freelancers into one place — instead of scattered listings, messenger threads, and deals with no guarantees.\n\n<strong>What I built.</strong> The entire project, solo: the user-facing app, an admin panel for moderation and analytics, and the server infrastructure. On top of that — protection against fake activity and fraud: email verification, daily action limits, user bans. Set up monitoring: a Telegram bot reports outages, disk space, backups, and certificate expiry on its own.\n\n<strong>Result.</strong> A fully working product built from scratch in 3 months, deployed on a VPS with backups and a secure connection.\n\n<strong>Stack:</strong> React 19 · TypeScript · TanStack Query · Express.js · PostgreSQL · Drizzle ORM · Yandex Maps · nginx · PM2",
        },
        {
          n: "02",
          t: "GreenG — On-Demand Garden Services",
          s: "Mobile App & Web / Flutter + NestJS",
          y: "2026",
          description: "<strong>GreenG</strong> — an on-demand garden services platform for the US market. A mobile app and website for finding local pros: jobs on a map, chat with the provider, and in-app payments.\n\n<strong>The goal.</strong> Find a nearby provider fast and handle everything — from choosing to paying — in one app, without phone calls or cash.\n\n<strong>What I built.</strong> The entire project, solo: iOS and Android mobile app, web version, and admin panel on a shared backend. Integrated maps and geosearch, a chat with instant message delivery and push notifications, and Stripe payments. Set up service monitoring with dashboards — problems show up before users report them.\n\n<strong>Result.</strong> Delivered to the client in 9 months: the customer journey from request to payment is fully covered inside the service.\n\n<strong>Stack:</strong> Flutter · React · NestJS · TypeScript · MongoDB · Redis · Socket.IO · Stripe · Google Maps · Firebase · Docker · Grafana",
        },
        {
          n: "03",
          t: "Inna Bot — AI Assistant for Telegram",
          s: "Personal Project / Python + OpenAI",
          y: "2025",
          description: "<strong>Inna Bot</strong> — a personal AI assistant that runs right inside a Telegram account. It remembers past conversations, understands voice messages and images, searches the web on its own, and sets reminders.\n\n<strong>The goal.</strong> Typical chatbots give canned answers and forget the conversation after a few messages. I wanted an assistant that remembers what was discussed a week ago and adapts to the person it talks to.\n\n<strong>What I built.</strong> A personal project, built entirely solo. Long-term memory with semantic search: the bot retrieves relevant pieces of chat history and grounds its answers in them (RAG). Preference analysis for personalized replies. Voice message transcription and speech synthesis, image understanding. Web search the bot triggers itself when fresh data is needed. Reminders and cost control for AI API calls.\n\n<strong>Result.</strong> A working assistant in 2 months. Modular architecture: each capability is a separate service, so new ones plug in without rewriting the rest.\n\n<strong>Stack:</strong> Python · asyncio · Telethon · OpenAI GPT-4o · ChromaDB · Sentence Transformers · scikit-learn · spaCy · Yandex SpeechKit · SerpAPI · SQLite",
        },
        {
          n: "04",
          t: "СантехникЪ — Plumbing Store Website",
          s: "Catalog Website / React + TypeScript",
          y: "2026",
          description: "<strong>СантехникЪ</strong> — a website for a plumbing supply store in Saratov, Russia: a product catalog with multi-level categories, search, and delivery and contact pages.\n\n<strong>The goal.</strong> Give a local store a convenient online storefront: customers should quickly find the right item in a large range — on mobile and desktop — and the site itself should show up in local search.\n\n<strong>What I built.</strong> The entire project, solo: a catalog with nested sections (category → group → product), product search, About, Delivery and Contacts pages, and a responsive interface. Prepared the site for local SEO: city-targeted meta tags and social sharing markup. The catalog lives in JSON files — the product range is updated without a database or a separate server.\n\n<strong>Result.</strong> A finished website in 3 weeks, delivered to the client.\n\n<strong>Stack:</strong> React · TypeScript · Vite · Tailwind CSS · shadcn/ui · React Router · TanStack Query",
          githubLink: "https://github.com/ignitione1/plumbing_store",
        },
      ],
    },
    services: {
      title: "Services",
      subtitle: "/ My expertise",
      items: {
        web: {
          title: "Web Development",
          description: "Websites and web applications of any complexity — from landing pages to corporate platforms",
        },
        mobile: {
          title: "Mobile Apps",
          description: "Native and cross-platform apps for iOS and Android — from prototype to App Store",
        },
        backend: {
          title: "Backend & API",
          description: "Server-side development, integrations, databases, and cloud infrastructure",
        },
        design: {
          title: "UI/UX Design",
          description: "User-friendly interfaces: prototypes, design systems, responsive",
        },
      },
    },
    about: {
      title: "Code that solves business problems",
      description1: "I turn ideas into working products. No fluff, no wasted words.",
      description2: "I take end-to-end projects and stay available after launch — because good products keep evolving.",
      stats: {
        projects: {
          value: "10+",
          label: "Projects",
          sublabel: "Running right now",
        },
        experience: {
          value: "8+",
          label: "Technologies",
          sublabel: "Web · Mobile · AI · Backend",
        },
        clients: {
          value: "2",
          label: "Years",
          sublabel: "In commercial development",
        },
      },
      ctaProject: "Start project",
      ctaWork: "View work",
    },
    contact: {
      title: "Let's talk",
      subtitle: "/ Get in touch",
      email: "Email",
      location: "Location",
      locationValue: "Prokopyevsk, Russia",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        contact: "Contact",
        contactPlaceholder: "telegram, vk, email...",
        message: "Message",
        messagePlaceholder: "Tell me about your project...\nThis goes to my Telegram — if it fails, reach me via the contacts.",
        submit: "Send",
        submitting: "Sending...",
        success: "Sent!",
        error: "Error sending. Try again later.",
      },
    },
  },
}

export type Lang = keyof typeof translations

// Проект в «Работах». Ссылки необязательны (явный тип — иначе, если ни у одного проекта
// нет liveLink, TS решит, что такого поля не бывает)
export type Project = {
  n: string
  t: string
  s: string
  y: string
  description: string
  githubLink?: string
  liveLink?: string
}
export type TranslationKey = keyof typeof translations.ru
