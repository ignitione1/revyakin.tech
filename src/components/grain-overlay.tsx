import grainUrl from "@/assets/grain.png"

// Плёночное зерно поверх страницы. Готовая PNG-плитка (чёрно-белые точки с разной
// прозрачностью) и обычное наложение: без SVG-фильтра и без mix-blend-mode, который
// заставлял браузер каждый кадр пересмешивать весь экран с анимированным WebGL-фоном.
export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.04]"
      style={{ backgroundImage: `url(${grainUrl})`, backgroundSize: "128px 128px" }}
    />
  )
}
