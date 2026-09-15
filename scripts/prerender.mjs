// Пререндер: после `vite build` (клиент) и `vite build --ssr` (dist-ssr) вставляет
// готовый HTML страниц в dist/, чтобы поисковики и превью ссылок видели текст и мету
// без выполнения JS. В браузере React берёт страницу под управление как обычно.
//
//   /          → dist/index.html
//   /services  → dist/services.html  (Nginx: try_files $uri $uri.html ...)
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve, dirname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");

const { render, HOME_META, servicesMeta, faqJsonLd, injectPageHead } = await import(
  pathToFileURL(resolve(ssrDir, "entry-server.js")).href
);

const template = readFileSync(resolve(dist, "index.html"), "utf8");
const ROOT_TAG = '<div id="root"></div>';
if (!template.includes(ROOT_TAG)) throw new Error(`В dist/index.html не найден ${ROOT_TAG}`);

const pages = [
  { url: "/", file: "index.html", meta: HOME_META, extraHead: "" },
  {
    url: "/services",
    file: "services.html",
    meta: servicesMeta("ru"),
    extraHead: `<script type="application/ld+json" data-faq="services">${faqJsonLd("ru")}</script>\n  `,
  },
];

for (const page of pages) {
  let html = injectPageHead(template, page.meta);
  html = html.replace("</head>", `${page.extraHead}</head>`);
  html = html.replace(ROOT_TAG, `<div id="root">${render(page.url)}</div>`);
  writeFileSync(resolve(dist, page.file), html);
  console.log(`prerender: ${page.url} → dist/${page.file}`);
}

rmSync(ssrDir, { recursive: true, force: true });
