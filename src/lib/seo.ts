import { type Lang } from "@/lib/translations";

// Мета-теги страниц — единый источник для браузера (applyPageMeta при смене маршрута)
// и для пререндера (injectPageHead пишет их прямо в dist/*.html при сборке).
// Главная — только RU (как и статичный index.html), /services — по языку.

export interface PageMeta {
  title: string;
  description: string;
  url: string;
  ogTitle: string;
  ogDescription: string;
  twitterDescription: string;
}

const SITE = "https://revyakin.tech";

export const HOME_META: PageMeta = {
  title:
    "Revyakin.tech — Веб-разработка и мобильные приложения | Разработка сайтов и приложений под ключ",
  description:
    "Разрабатываю сайты, мобильные приложения и сервисы под ключ. React, Flutter, Next.js, Python. Создание лендингов, интернет-магазинов, веб-приложений. Прокопьевск, Кемерово, Кузбасс, Россия.",
  url: `${SITE}/`,
  ogTitle: "Revyakin.tech — Веб-разработка и мобильные приложения",
  ogDescription: "Разрабатываю сайты, мобильные приложения и сервисы под ключ. От идеи до запуска.",
  twitterDescription:
    "Разрабатываю сайты, мобильные приложения и сервисы под ключ. React, Flutter, Next.js, Python.",
};

export function servicesMeta(lang: Lang): PageMeta {
  const title =
    lang === "ru"
      ? "Разработка сайтов и приложений — Прокопьевск, Кузбасс, Россия | Revyakin.tech"
      : "Web & Mobile App Development — Kuzbass, Russia | Revyakin.tech";
  const description =
    lang === "ru"
      ? "Разработка сайтов, лендингов, веб- и мобильных приложений под ключ. Прокопьевск, Киселёвск, Новокузнецк, Кемерово, вся Кемеровская область и Россия — удалённо. React, Next.js, Python, Flutter."
      : "Website, landing page, web and mobile app development. Based in Kuzbass, Russia — working remotely nationwide. React, Next.js, Python, Flutter.";
  return {
    title,
    description,
    url: `${SITE}/services`,
    ogTitle: title,
    ogDescription: description,
    twitterDescription: description,
  };
}

// Частые вопросы: один источник и для видимого блока на /services, и для FAQPage-разметки
// (разметка обязана совпадать с текстом на странице).
export const FAQ: Record<Lang, { q: string; a: string }[]> = {
  ru: [
    {
      q: "Вы работаете только по Кузбассу?",
      a: "Нет. Я в Прокопьевске, но веду проекты удалённо по всей России. Клиенту из Новосибирска или Москвы работать со мной так же удобно, как из соседнего города Кузбасса.",
    },
    {
      q: "Сколько времени занимает разработка?",
      a: "Зависит от сложности: лендинг — 2–3 дня, корпоративный сайт — 1–2 недели, интернет-магазин или веб-приложение — 2–4 недели. MVP для стартапа можно запустить за 5–15 дней.",
    },
    {
      q: "Сколько это стоит?",
      a: "Лендинг от 5 000 ₽, корпоративный сайт от 50 000 ₽, интернет-магазин от 70 000 ₽, веб-приложение от 80 000 ₽, MVP от 10 000 ₽. Точную стоимость назову после обсуждения задачи.",
    },
    {
      q: "Что с поддержкой после запуска?",
      a: "Остаюсь на связи после запуска: правки, обновления, исправление багов, консультации. Формат — почасово или по договорённости.",
    },
  ],
  en: [
    {
      q: "Do you only work in the Kemerovo region?",
      a: "No. I'm based in Prokopyevsk but run projects remotely across Russia. Working with me from Novosibirsk or Moscow is just as convenient as from a neighboring city in Kuzbass.",
    },
    {
      q: "How long does development take?",
      a: "It depends on complexity: landing page — 2–3 days, corporate site — 1–2 weeks, online store or web app — 2–4 weeks. A startup MVP can launch in 5–15 days.",
    },
    {
      q: "How much does it cost?",
      a: "Landing from 5,000 ₽, corporate site from 50,000 ₽, online store from 70,000 ₽, web app from 80,000 ₽, MVP from 10,000 ₽. I'll give an exact number after discussing the task.",
    },
    {
      q: "What about support after launch?",
      a: "I stay in touch after launch: fixes, updates, bug fixing, consultations. Hourly or by agreement.",
    },
  ],
};

export function faqJsonLd(lang: Lang): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ[lang].map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  });
}

// Браузер: проставить мета-теги текущей страницы в <head>
export function applyPageMeta(meta: PageMeta) {
  document.title = meta.title;
  const set = (selector: string, attr: string, value: string) =>
    document.querySelector(selector)?.setAttribute(attr, value);
  set('meta[name="description"]', "content", meta.description);
  set('link[rel="canonical"]', "href", meta.url);
  set('meta[property="og:url"]', "content", meta.url);
  set('meta[property="og:title"]', "content", meta.ogTitle);
  set('meta[property="og:description"]', "content", meta.ogDescription);
  set('meta[name="twitter:title"]', "content", meta.ogTitle);
  set('meta[name="twitter:description"]', "content", meta.twitterDescription);
}

// Пререндер: те же теги, но заменой в HTML-строке (в Node нет document)
export function injectPageHead(html: string, meta: PageMeta): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const replaceAttr = (src: string, tagRe: RegExp, attr: string, value: string) =>
    src.replace(tagRe, (tag) => tag.replace(new RegExp(`${attr}="[^"]*"`), `${attr}="${esc(value)}"`));
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  out = replaceAttr(out, /<meta name="description"[^>]*>/, "content", meta.description);
  out = replaceAttr(out, /<link rel="canonical"[^>]*>/, "href", meta.url);
  out = replaceAttr(out, /<meta property="og:url"[^>]*>/, "content", meta.url);
  out = replaceAttr(out, /<meta property="og:title"[^>]*>/, "content", meta.ogTitle);
  out = replaceAttr(out, /<meta property="og:description"[^>]*>/, "content", meta.ogDescription);
  out = replaceAttr(out, /<meta name="twitter:title"[^>]*>/, "content", meta.ogTitle);
  out = replaceAttr(out, /<meta name="twitter:description"[^>]*>/, "content", meta.twitterDescription);
  return out;
}
