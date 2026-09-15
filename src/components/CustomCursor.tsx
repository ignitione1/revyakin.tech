import { useEffect, useRef, useState } from "react"

// Свой курсор — только при мыши с точным наведением. Проверка «есть ли тач» ошибалась:
// ноутбуки с тачскрином, эмуляция в DevTools, планшет с мышью. Медиазапрос отслеживаем
// вживую — курсор включается/выключается без перезагрузки.
// При пререндере (Node) window нет — курсор не рендерится.
const FINE_POINTER = "(hover: hover) and (pointer: fine)"
const hasFinePointer = () => typeof window !== "undefined" && window.matchMedia(FINE_POINTER).matches

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const isPointerRef = useRef(false)
  const [enabled, setEnabled] = useState(hasFinePointer)

  useEffect(() => {
    const mql = window.matchMedia(FINE_POINTER)
    const onChange = () => setEnabled(mql.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    // Системный курсор прячем только пока смонтирован свой (см. .custom-cursor в styles.css)
    document.documentElement.classList.add("custom-cursor")

    let animationFrameId: number | undefined
    let hasMoved = false

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const render = () => {
      if (!outerRef.current || !innerRef.current) return
      const { x, y } = positionRef.current
      const scale = isPointerRef.current ? 1.5 : 1       // внешний — увеличивается на кнопках
      const innerScale = isPointerRef.current ? 0.5 : 1  // внутренний — уменьшается
      outerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`
      innerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${innerScale})`
    }

    const updateCursor = () => {
      // инерционное следование через linear interpolation (factor 0.15)
      const pos = positionRef.current
      const target = targetPositionRef.current
      pos.x = lerp(pos.x, target.x, 0.15)
      pos.y = lerp(pos.y, target.y, 0.15)

      // Догнали мышь — останавливаем цикл до следующего движения
      if (Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1) {
        pos.x = target.x
        pos.y = target.y
        animationFrameId = undefined
      } else {
        animationFrameId = requestAnimationFrame(updateCursor)
      }
      render()
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY }
      // closest() без пересчёта стилей и находит кнопку, даже если мышь над <span> внутри неё
      isPointerRef.current = !!(e.target as Element).closest?.(
        "a, button, [role=button], input, textarea, select, label"
      )

      if (!hasMoved) {
        // Первое движение: ставим курсор сразу под мышь (без «прилёта» из угла) и показываем
        hasMoved = true
        positionRef.current = { x: e.clientX, y: e.clientY }
        outerRef.current?.style.removeProperty("opacity")
        innerRef.current?.style.removeProperty("opacity")
      }

      if (animationFrameId === undefined) animationFrameId = requestAnimationFrame(updateCursor)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId)
      document.documentElement.classList.remove("custom-cursor")
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* внешнее кольцо */}
      <div ref={outerRef} className="custom-cursor-el pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference will-change-transform"
        style={{ contain: "layout style paint", opacity: 0 }}>
        <div className="h-4 w-4 rounded-full border-2 border-white" />
      </div>
      {/* внутренняя точка */}
      <div ref={innerRef} className="custom-cursor-el pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference will-change-transform"
        style={{ contain: "layout style paint", opacity: 0 }}>
        <div className="h-2 w-2 rounded-full bg-white" />
      </div>
    </>
  )
}
