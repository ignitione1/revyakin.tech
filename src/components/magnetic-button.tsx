import { useRef } from "react"

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
  size?: "md" | "lg"
  type?: "button" | "submit"
  className?: string
}

// Цвет и hover-масштаб (в Tailwind v4 это свойство scale, не transform) анимируются всегда
const BASE_TRANSITION = "background-color 300ms ease-out, border-color 300ms ease-out, color 300ms ease-out, scale 300ms ease-out"

export function MagneticButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  className = ""
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Сдвиг пишем прямо в style, без setState — иначе React перерисовывал кнопку на каждое движение мыши
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = buttonRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    el.style.transition = `transform 100ms ease-out, ${BASE_TRANSITION}` // быстро следует за мышью
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const handleMouseLeave = () => {
    const el = buttonRef.current
    if (!el) return
    el.style.transition = `transform 300ms ease-out, ${BASE_TRANSITION}` // плавно возвращается на место
    el.style.transform = "translate(0px, 0px)"
  }

  const baseStyles = "relative overflow-hidden rounded-full font-medium"

  const variantStyles = {
    primary: "bg-foreground/95 text-background hover:bg-foreground hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-foreground/10 text-foreground hover:bg-foreground/15 border border-foreground/10 hover:border-foreground/20 hover:scale-[1.02] active:scale-[0.98]"
  }

  const sizeStyles = {
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base"
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={{ transition: BASE_TRANSITION }}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}
