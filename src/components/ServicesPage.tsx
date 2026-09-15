import { useEffect } from "react";
import { type Lang } from "@/lib/translations";
import { FAQ, applyPageMeta, faqJsonLd, servicesMeta } from "@/lib/seo";

interface ServicesPageProps {
  lang: Lang;
}

export function ServicesPage({ lang }: ServicesPageProps) {
  // Свои title/description/canonical/og для /services (SPA — иначе остались бы от главной).
  // Главная при заходе проставляет свои сама (StudioLanding), восстанавливать не нужно.
  useEffect(() => {
    applyPageMeta(servicesMeta(lang));
  }, [lang]);

  // FAQPage-разметка только на /services (на главной нет видимого FAQ — по правилам Google
  // разметка без видимого текста запрещена). Пререндеренный services.html уже содержит
  // такой скрипт — убираем его, чтобы не было дубля, и ставим актуальный для языка.
  useEffect(() => {
    document.querySelectorAll("script[data-faq]").forEach((el) => el.remove());
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-faq", "services");
    script.textContent = faqJsonLd(lang);
    document.head.appendChild(script);
    return () => script.remove();
  }, [lang]);

  return (
    <div className="bg-background text-foreground px-4 py-12 md:px-8 lg:px-16 h-viewport overflow-y-auto">
      <div className="max-w-4xl mx-auto pb-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          {lang === "ru"
            ? "Разработка сайтов и мобильных приложений в Прокопьевске, Кузбассе и по всей России"
            : "Website and Mobile App Development in Kuzbass and across Russia"}
        </h1>

        <div className="space-y-3 text-foreground/80 text-xs md:text-sm">
          <p className="leading-relaxed">
            {lang === "ru"
              ? "Меня зовут Виталий Ревякин, я full-stack разработчик из Прокопьевска. Делаю сайты, лендинги, веб- и мобильные приложения под ключ — от первого созвона до запуска и поддержки. Беру и небольшие лендинги, и MVP для стартапов, и системы посложнее. Работаю удалённо, поэтому географии почти нет: клиенты из Прокопьевска, Киселёвска, Новокузнецка, Кемерово, Новосибирска и других городов России общаются со мной так же, как местные — созвон, чат, демо."
              : "I'm Vitaly Revyakin, a full-stack developer based in Prokopyevsk, Russia. I build websites, landing pages, web and mobile apps end-to-end — from the first call to launch and support. I take on small landing pages, startup MVPs, and more complex systems alike. I work remotely, so location doesn't matter: clients across Kuzbass, Novosibirsk and the rest of Russia work with me just like a local — calls, chat, demos."}
          </p>

          <h2 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-2">
            {lang === "ru" ? "Что я делаю" : "What I do"}
          </h2>
          <p className="leading-relaxed">
            {lang === "ru"
              ? "Не распыляюсь на «всё подряд» — фокус на том, что реально приносит результат бизнесу:"
              : "I don't spread thin across everything — I focus on what actually drives business results:"}
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              {lang === "ru"
                ? "Сайты и лендинги — корпоративные сайты, продающие лендинги, интернет-магазины. Быстрые, адаптивные, с прицелом на конверсию и SEO."
                : "Websites and landing pages — corporate sites, high-converting landings, online stores. Fast, responsive, built for conversion and SEO."}
            </li>
            <li>
              {lang === "ru"
                ? "Веб-приложения — CRM, дашборды, SaaS, личные кабинеты. С авторизацией, базами данных, интеграциями и real-time."
                : "Web applications — CRMs, dashboards, SaaS, user portals. With auth, databases, integrations and real-time."}
            </li>
            <li>
              {lang === "ru"
                ? "Мобильные приложения — iOS и Android на Flutter из одного кода: push, геолокация, камера, оффлайн-режим."
                : "Mobile apps — iOS and Android from one Flutter codebase: push, geolocation, camera, offline mode."}
            </li>
            <li>
              {lang === "ru"
                ? "MVP для стартапов — запуск рабочей версии продукта за 1–2 недели, чтобы проверить гипотезу без больших вложений."
                : "MVP for startups — a working product in 1–2 weeks to test the hypothesis without heavy investment."}
            </li>
            <li>
              {lang === "ru"
                ? "Telegram-боты и автоматизация — уведомления, приём заявок, интеграция с сайтом и CRM."
                : "Telegram bots and automation — notifications, lead intake, integration with your site and CRM."}
            </li>
          </ul>

          <h2 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-2">
            {lang === "ru" ? "Примеры моих проектов" : "Examples of my work"}
          </h2>
          <p className="leading-relaxed">
            {lang === "ru"
              ? "Коротко о том, что уже сделано — не абстрактные обещания, а реальные проекты:"
              : "A quick look at what's already built — not abstract promises, but real projects:"}
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              {lang === "ru" ? (
                <>
                  <strong>WorkHub</strong> — маркетплейс услуг: каталог
                  исполнителей, заявки, личные кабинеты. Полноценная платформа, а не
                  просто сайт.
                </>
              ) : (
                <>
                  <strong>WorkHub</strong> — a services marketplace:
                  provider catalog, orders, user accounts. A full platform, not just a
                  site.
                </>
              )}
            </li>
            <li>
              {lang === "ru" ? (
                <>
                  <strong>GreenG</strong> — сервис заказа садовых услуг для рынка США:
                  мобильное приложение, сайт и админ-панель, заказы на карте, чат и оплата
                  внутри сервиса. Сделан в одиночку и сдан заказчику.
                </>
              ) : (
                <>
                  <strong>GreenG</strong> — an on-demand garden services platform for the US
                  market: mobile app, website and admin panel, jobs on a map, chat and
                  in-app payments. Built solo and delivered to the client.
                </>
              )}
            </li>
          </ul>
          <p className="leading-relaxed">
            {lang === "ru"
              ? "Больше работ с описанием и ссылками — в разделе «Работы» на главной странице."
              : "More projects with descriptions and links are in the “Work” section on the home page."}
          </p>

          <h2 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-2">
            {lang === "ru"
              ? "Разработка сайтов в Прокопьевске и Кемеровской области"
              : "Web development in Kuzbass and remotely across Russia"}
          </h2>
          <p className="leading-relaxed">
            {lang === "ru"
              ? "Я живу и работаю в Прокопьевске, поэтому клиентам из Кузбасса удобно: один часовой пояс, при желании можно встретиться очно, обсудить проект без формальностей. Помогаю бизнесу и частным заказчикам из Прокопьевска, Киселёвска, Новокузнецка, Кемерово и других городов Кемеровской области сделать сайт или приложение под задачу."
              : "I live and work in Prokopyevsk, so clients across the Kemerovo region get the same time zone and the option to meet in person and discuss the project informally. I help businesses and individuals in Prokopyevsk, Kiselyovsk, Novokuznetsk, Kemerovo and other cities of the region build a site or app that fits the task."}
          </p>
          <p className="leading-relaxed">
            {lang === "ru"
              ? "При этом всё, что нужно для работы, делается удалённо, поэтому я так же спокойно веду проекты для клиентов из Новосибирска, Москвы, Санкт-Петербурга и любого другого региона России. Формат общения выбираем удобный вам: Telegram, почта, звонки, видеовстречи."
              : "Everything needed for the work happens remotely, so I run projects for clients in Novosibirsk, Moscow, St. Petersburg and any other Russian region just as smoothly. We pick whatever communication format suits you: Telegram, email, calls, video meetings."}
          </p>

          <h2 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-2">
            {lang === "ru" ? "Технологии" : "Technologies"}
          </h2>
          <p className="leading-relaxed">
            {lang === "ru"
              ? "Frontend: React, Next.js, TypeScript, Tailwind CSS. Backend: Python (Django, FastAPI), Node.js. Мобильные: Flutter. Базы данных: PostgreSQL, Redis, SQLite. Под каждый проект подбираю стек, который решает задачу, а не тот, что «модный». Если проще и надёжнее сделать без тяжёлых фреймворков — сделаю так."
              : "Frontend: React, Next.js, TypeScript, Tailwind CSS. Backend: Python (Django, FastAPI), Node.js. Mobile: Flutter. Databases: PostgreSQL, Redis, SQLite. For each project I pick the stack that solves the task, not the trendy one. If it's simpler and more reliable without heavy frameworks — that's what I'll do."}
          </p>

          <h2 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-2">
            {lang === "ru" ? "Как я работаю" : "How I work"}
          </h2>
          <p className="leading-relaxed">
            {lang === "ru"
              ? "Сначала разбираемся, какую задачу решаем и зачем, — иногда на этом этапе становится ясно, что нужно совсем не то, что казалось вначале. Дальше: прототип, разработка небольшими итерациями с регулярными демо, тестирование, запуск. Вы видите прогресс по ходу, а не «пропадаю на месяц и приношу готовое». После запуска остаюсь на связи — правки, доработки, поддержка."
              : "First we figure out what problem we're solving and why — sometimes that alone reveals the real need is different from the initial idea. Then: a prototype, development in small iterations with regular demos, testing, launch. You see progress along the way instead of me disappearing for a month. After launch I stay in touch — fixes, improvements, support."}
          </p>

          <h2 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-2">
            {lang === "ru" ? "Стоимость и сроки" : "Pricing and timelines"}
          </h2>
          <p className="leading-relaxed">
            {lang === "ru"
              ? "Ориентиры по срокам: лендинг — 2–3 дня, корпоративный сайт — 1–2 недели, интернет-магазин или веб-приложение — 2–4 недели, MVP — 5–15 дней. По деньгам: лендинг от 5 000 ₽, корпоративный сайт от 50 000 ₽, интернет-магазин от 70 000 ₽, веб-приложение от 80 000 ₽, MVP от 10 000 ₽. Точную цену назову после короткого обсуждения — она зависит от объёма, а не от «прайса с потолка»."
              : "Timeline guide: landing page — 2–3 days, corporate site — 1–2 weeks, online store or web app — 2–4 weeks, MVP — 5–15 days. Pricing: landing from 5,000 ₽, corporate site from 50,000 ₽, online store from 70,000 ₽, web app from 80,000 ₽, MVP from 10,000 ₽. I'll give an exact number after a short discussion — it depends on scope, not a made-up price list."}
          </p>

          <h2 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
            {lang === "ru" ? "Частые вопросы" : "Frequently Asked Questions"}
          </h2>

          {FAQ[lang].map((item) => (
            <div key={item.q}>
              <h3 className="text-base md:text-lg font-semibold text-foreground mt-4 mb-2">{item.q}</h3>
              <p className="leading-relaxed">{item.a}</p>
            </div>
          ))}

          <h2 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-2">
            {lang === "ru" ? "Связаться со мной" : "Get in touch"}
          </h2>
          <p className="leading-relaxed">
            {lang === "ru"
              ? "Расскажите о задаче — отвечу в течение суток. Форма связи на главной странице, почта ignitione1@mail.ru или Telegram @vitaly_revyakin. Обсудим идею, сроки и стоимость без обязательств."
              : "Tell me about your task — I'll reply within a day. Contact form on the home page, email ignitione1@mail.ru or Telegram @vitaly_revyakin. We'll discuss the idea, timeline and cost with no commitment."}
          </p>
        </div>
      </div>
    </div>
  );
}
