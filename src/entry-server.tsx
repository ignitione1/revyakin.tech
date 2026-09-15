// Точка входа для пререндера (scripts/prerender.mjs): рендерит маршрут в HTML-строку.
// Собирается отдельно: vite build --ssr src/entry-server.tsx --outDir dist-ssr
// Не компонент и не участвует в HMR — правило fast refresh здесь неприменимо.
/* eslint-disable react-refresh/only-export-components */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";

export { HOME_META, servicesMeta, faqJsonLd, injectPageHead } from "./lib/seo";

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
