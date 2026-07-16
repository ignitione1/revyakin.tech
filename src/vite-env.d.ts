/// <reference types="vite/client" />

interface ImportMetaEnv {
  // URL serverless-функции, которая прячет токен и шлёт заявку в Telegram.
  // НЕ секрет — это просто адрес эндпоинта.
  readonly VITE_CONTACT_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Yandex.Metrika (подключается сниппетом в index.html).
interface Window {
  ym?: (counterId: number, event: string, ...args: unknown[]) => void
}
