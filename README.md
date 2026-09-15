# Revyakin.tech — Портфолио Full-Stack Разработчика

Портфолио-сайт с горизонтальной прокруткой секций, WebGL-фоном, интерактивными эффектами
и поддержкой русского и английского языков.

**Сайт:** [revyakin.tech](https://revyakin.tech)

## 🚀 Технологии

### Frontend
- **React 19** + **TypeScript**
- **Vite 7** — сборщик и dev-сервер
- **React Router 7** — клиентская маршрутизация
- **Tailwind CSS v4** — стили
- **Lucide React** — иконки
- **Shaders** — WebGL-шейдеры для фона (загружаются отдельным чанком)

### Инструменты
- **ESLint** + **TypeScript ESLint** — линтинг
- **Prettier** — форматирование

### Деплой и интеграции
- **GitHub Actions** — сборка и деплой на VPS по кнопке (`workflow_dispatch`)
- **Nginx** + **Let's Encrypt** — раздача статики на VPS (без Docker)
- **Vercel** — serverless-релей контактной формы в Telegram (токен бота не попадает в браузер)

## 🌐 Особенности

- **Горизонтальная прокрутка** секций с доводкой (CSS scroll-snap) и плавной анимацией переходов
- **Мультиязычность** — русский и английский, выбор сохраняется в браузере
- **Пререндер страниц** — `/` и `/services` при сборке превращаются в готовый HTML с текстом и мета-тегами,
  поэтому поисковики (в том числе Яндекс) видят содержимое без выполнения JavaScript
- **SEO** — мета-теги, Open Graph, Schema.org (`Person`, `Organization`, `ProfessionalService`, `FAQPage`),
  sitemap, локальное SEO для Кемеровской области
- **Производительность** — тяжёлый WebGL-фон грузится лениво, уважается системная настройка
  «Уменьшить движение», оптимизированные изображения
- **Интерактив** — кастомный курсор (только при мыши), магнитные кнопки, анимации появления
- **Адаптивный дизайн** — секции подстраиваются под видимую высоту экрана на мобильных (`dvh`)
- **Контактная форма** — заявки приходят в Telegram через serverless-функцию

## 📁 Структура проекта

```
├── src/
│   ├── components/
│   │   ├── StudioLanding.tsx       # Главная: скролл-контейнер, навигация, Hero
│   │   ├── ServicesPage.tsx        # Страница /services (SEO-текст, FAQ)
│   │   ├── sections/               # Секции главной: работы, услуги, обо мне, контакты
│   │   ├── shader-background.tsx   # WebGL-фон (ленивая загрузка)
│   │   ├── reveal.tsx              # Анимация появления элементов
│   │   ├── CustomCursor.tsx        # Кастомный курсор
│   │   ├── magnetic-button.tsx     # Магнитная кнопка
│   │   └── grain-overlay.tsx       # Эффект плёночного зерна
│   ├── lib/
│   │   ├── translations.ts         # Тексты RU/EN, в том числе проекты портфолио
│   │   └── seo.ts                  # Мета-теги страниц и FAQ (для браузера и пререндера)
│   ├── assets/                     # Ассеты, проходящие через сборку
│   ├── entry-server.tsx            # Рендер маршрута в HTML для пререндера
│   ├── App.tsx                     # Роутинг, язык, учёт переходов в Метрике
│   ├── main.tsx                    # Точка входа
│   └── styles.css                  # Глобальные стили и тема Tailwind
├── scripts/
│   └── prerender.mjs               # Пререндер / и /services в dist/
├── public/                         # robots.txt, sitemap.xml, изображения, верификации поисковиков
├── index.html                      # HTML-шаблон с мета-тегами и Schema.org
├── vps-nginx.conf                  # Конфиг Nginx для VPS
└── .github/workflows/deploy.yml    # Сборка + деплой на VPS по кнопке
```

## 🛠️ Установка и запуск

### Требования
- Node.js 20.19+ (требование Vite 7)
- npm

### Локальная разработка

```bash
git clone https://github.com/ignitione1/revyakin.tech.git
cd revyakin.tech
npm install
npm run dev          # http://localhost:5173
```

### Команды

| Команда | Что делает |
|---------|------------|
| `npm run dev` | dev-сервер |
| `npm run build` | прод-сборка в `dist/` + пререндер страниц |
| `npm run preview` | предпросмотр собранного `dist/` |
| `npx tsc --noEmit` | проверка типов |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

### Как устроена сборка

```
vite build                                  → клиентская сборка в dist/
vite build --ssr src/entry-server.tsx       → серверная сборка для рендера в dist-ssr/
node scripts/prerender.mjs                  → dist/index.html и dist/services.html с готовым HTML,
                                              dist-ssr/ удаляется
```

Код, который выполняется во время рендера компонента (не в `useEffect`), не должен обращаться к
`window` и `localStorage` без проверки `typeof window !== "undefined"` — иначе пререндер упадёт.

## 🚢 Деплой

Деплой на VPS через **GitHub Actions** — вручную, кнопкой.

```
git push → Actions → Deploy to VPS → «Run workflow»
         → сборка dist/ на раннере GitHub (включая пререндер)
         → rsync dist/ на VPS (--delete, чистая перезаливка)
         → Nginx раздаёт статику
```

### Секреты GitHub (Settings → Secrets and variables → Actions)

| Секрет | Значение |
|--------|----------|
| `VPS_HOST` | IP сервера |
| `VPS_USER` | SSH-пользователь |
| `VPS_SSH_KEY` | приватный SSH-ключ для деплоя |
| `VPS_PATH` | путь раздачи, напр. `/var/www/revyakin` |

### Первоначальная настройка VPS (один раз)

```bash
sudo apt update && sudo apt install -y nginx rsync
sudo mkdir -p /var/www/revyakin
# SSL:
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d revyakin.tech -d www.revyakin.tech
# Конфиг Nginx:
sudo cp vps-nginx.conf /etc/nginx/sites-available/revyakin.tech
sudo ln -s /etc/nginx/sites-available/revyakin.tech /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Конфиг содержит отдельный server-блок для редиректа `www` → без `www`. Если `nginx -t` сообщает
`could not build server_names_hash`, раскомментируйте в `/etc/nginx/nginx.conf`:

```nginx
server_names_hash_bucket_size 64;
```

### Что делает конфиг Nginx

- редиректит `http://` и `www` на `https://revyakin.tech` (301);
- отдаёт пререндеренные страницы: `/services` → `services.html`, остальные маршруты → `index.html`;
- HTML — без кеша, `/assets/` (файлы с хешем) — кеш на год, изображения из `public/` — на 7 дней;
- добавляет заголовки безопасности (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, HSTS).

> ⚠️ Деплой через Actions обновляет только содержимое сайта. Изменения в `vps-nginx.conf`
> нужно применять на сервере вручную (команды — в шапке файла).

## 📝 Переменные окружения

Фронтенд знает только **адрес эндпоинта** контактной формы — это не секрет.
Для локальной разработки создайте `.env` на основе `.env.example`:

```env
VITE_CONTACT_API_URL=https://revyakin-contact-api.vercel.app/api/contact
```

Для прод-сборки URL уже задан в `.env.production`.

### Контактная форма (Telegram через Vercel)

Токен бота в браузер не попадает — форма работает через serverless-релей:

```
браузер → POST на VITE_CONTACT_API_URL → Vercel-функция (токен в env) → Telegram
```

Код функции — в отдельном репозитории `revyakin-contact-api` (CORS по списку доменов, валидация,
honeypot-поле против ботов). Настройка:

1. **Создайте бота** через [@BotFather](https://t.me/BotFather), получите токен.
2. **Узнайте chat_id** через [@userinfobot](https://t.me/userinfobot).
3. Задеплойте `revyakin-contact-api` на Vercel, в **Environment Variables** добавьте
   `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `ALLOWED_ORIGIN`.
4. URL Vercel-проекта пропишите в `VITE_CONTACT_API_URL` (и в `.env.production`).

## 📄 Лицензия

Этот проект распространяется под лицензией MIT — см. [LICENSE](LICENSE).

## 👨‍💻 Автор

**Виталий Ревякин** — Full-Stack Developer

- Сайт: [revyakin.tech](https://revyakin.tech)
- GitHub: [@ignitione1](https://github.com/ignitione1)
- Локация: Прокопьевск, Кемеровская область, Россия
