import { CustomCursor } from "./CustomCursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState, lazy, Suspense, startTransition } from "react"
import { translations, type Lang } from "@/lib/translations"
import { HOME_META, applyPageMeta } from "@/lib/seo"

// Тяжёлый WebGL-фон грузится отдельным чанком, чтобы не задерживать первый экран
const ShaderBackground = lazy(() => import("@/components/shader-background"))

interface StudioLandingProps {
  lang: Lang
  onLangChange: (lang: Lang) => void
}

export function StudioLanding({ lang, onLangChange }: StudioLandingProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // При пререндере (Node) шейдер не рендерим вовсе — в HTML попадает только градиент
  const [reduceMotion] = useState(
    () => typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  // Мета-теги главной (при переходе с /services они были бы от «Услуг»)
  useEffect(() => {
    applyPageMeta(HOME_META)
  }, [])
  const t = translations[lang]
  const totalSections = 5

  // Scroll to top on page load
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'auto',
      })
      setCurrentSection(0)
    }
  }, [])

  // Своя анимация перехода между секциями (колесо, меню, кнопки): у нативного
  // scrollTo({behavior:"smooth"}) в каждом браузере своя длительность и кривая, без мягкого
  // разгона/торможения. На время анимации scroll-snap выключаем — иначе браузер
  // «примагничивал» бы каждый промежуточный кадр. Свайп пальцем остаётся нативным (со snap).
  const scrollAnimRef = useRef<number | undefined>(undefined)
  const targetSectionRef = useRef(0)

  const stopScrollAnimation = () => {
    const el = scrollContainerRef.current
    if (scrollAnimRef.current !== undefined) cancelAnimationFrame(scrollAnimRef.current)
    scrollAnimRef.current = undefined
    if (el) el.style.scrollSnapType = ""
  }

  // Возвращает длительность анимации (мс) — по ней колесо держит блокировку
  const scrollToSection = (index: number): number => {
    const el = scrollContainerRef.current
    if (!el) return 0
    const clamped = Math.max(0, Math.min(totalSections - 1, index))
    targetSectionRef.current = clamped
    const from = el.scrollLeft
    const to = el.offsetWidth * clamped
    const distance = to - from
    stopScrollAnimation()
    if (Math.abs(distance) < 1) return 0
    if (reduceMotion) {
      el.scrollLeft = to
      return 0
    }

    // 700 мс на соседнюю секцию, чуть дольше на дальние (но не больше 1100)
    const sections = Math.abs(distance) / el.offsetWidth
    const duration = Math.min(1100, 550 + 150 * sections)
    const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
    const start = performance.now()
    el.style.scrollSnapType = "none"

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      el.scrollLeft = from + distance * easeInOutCubic(progress)
      if (progress < 1) {
        scrollAnimRef.current = requestAnimationFrame(step)
      } else {
        scrollAnimRef.current = undefined
        el.style.scrollSnapType = ""
      }
    }
    scrollAnimRef.current = requestAnimationFrame(step)
    return duration
  }

  // Активная секция = фактическое положение скролла (клик, колесо, свайп, тачпад, ресайз).
  // setState только при смене секции и с низким приоритетом: перерисовка всей главной
  // не должна отнимать кадры у анимации прокрутки.
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    let last = 0
    const onScroll = () => {
      const index = Math.round(el.scrollLeft / el.offsetWidth)
      if (index === last) return
      last = index
      startTransition(() => setCurrentSection(index))
    }
    // Палец во время анимации — отдаём управление пользователю
    const onTouchStart = () => stopScrollAnimation()
    el.addEventListener("scroll", onScroll, { passive: true })
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    return () => {
      el.removeEventListener("scroll", onScroll)
      el.removeEventListener("touchstart", onTouchStart)
      stopScrollAnimation()
    }
  }, [])

  // Вертикальное колесо: один жест = одна секция.
  // Блокировка снимается, когда прошла анимация И колесо затихло — иначе инерция
  // тачпада пролистывала бы несколько секций подряд.
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    let locked = false
    let lockedUntil = 0
    let quietTimer: number | undefined

    const onWheel = (e: WheelEvent) => {
      if (isModalOpen || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()

      if (!locked) {
        locked = true
        // Считаем от цели текущей анимации, а не от промежуточной позиции
        const current = scrollAnimRef.current !== undefined
          ? targetSectionRef.current
          : Math.round(el.scrollLeft / el.offsetWidth)
        lockedUntil = performance.now() + scrollToSection(current + Math.sign(e.deltaY))
      }

      // Каждое событие колеса откладывает разблокировку: ≥150мс тишины и не раньше конца анимации
      window.clearTimeout(quietTimer)
      quietTimer = window.setTimeout(
        () => (locked = false),
        Math.max(150, lockedUntil - performance.now())
      )
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      el.removeEventListener("wheel", onWheel)
      window.clearTimeout(quietTimer)
    }
    // scrollToSection работает только через ref'ы и неизменные значения — пересоздавать слушатель не нужно
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen])

  return (
    <main className="relative h-viewport w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* Статичный градиент в цветах шейдера — виден сразу, пока WebGL-фон догружается */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_20%_15%,rgba(18,117,216,0.45),transparent_60%),radial-gradient(ellipse_at_85%_90%,rgba(225,145,54,0.35),transparent_60%)]" />

      {/* WebGL фон (при «Уменьшить движение» не грузим вовсе — остаётся градиент) */}
      {!reduceMotion && (
        <Suspense fallback={null}>
          <ShaderBackground />
        </Suspense>
      )}

      {/* Nav */}
      <nav className={`fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-4 py-4 md:px-12 md:py-6 transition-all duration-300 ${isModalOpen ? 'pointer-events-none opacity-50' : ''}`}>
        <button onClick={() => scrollToSection(0)} className="flex items-center gap-2">
          <img src="/images/logo-96.png" width={40} height={40} alt="Revyakin.tech" className="h-8 w-8 object-contain md:h-10 md:w-10" />
          <span className="font-sans text-base font-semibold tracking-tight text-foreground md:text-xl">Revyakin.tech</span>
        </button>
        <div className="hidden items-center gap-8 md:flex">
          {[t.nav.home, t.nav.work, t.nav.services, t.nav.about, t.nav.contact].map((item, index) => (
            <button key={item} onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"}`}>
              {item}
              <span className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${currentSection === index ? "w-full" : "w-0 group-hover:w-full"}`} />
            </button>
          ))}
        </div>
        <button
          onClick={() => onLangChange(lang === 'ru' ? 'en' : 'ru')}
          className="flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 px-2.5 py-1 backdrop-blur-md transition-all hover:border-foreground/40 hover:bg-foreground/15 md:px-3 md:py-1.5"
        >
          <span className={`font-mono text-[10px] font-medium transition-colors md:text-xs ${lang === 'ru' ? 'text-foreground' : 'text-foreground/50'}`}>RU</span>
          <span className="h-px w-2 bg-foreground/30 md:w-3" />
          <span className={`font-mono text-[10px] font-medium transition-colors md:text-xs ${lang === 'en' ? 'text-foreground' : 'text-foreground/50'}`}>EN</span>
        </button>
      </nav>

      {/* Горизонтальный скролл */}
      <div ref={scrollContainerRef} data-scroll-container className="relative z-10 flex h-viewport snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-container *:snap-start *:snap-always" style={{ scrollbarWidth: "none" }}>

        {/* Hero */}
        <section className="flex min-h-viewport w-screen shrink-0 flex-col justify-center px-4 pb-8 pt-12 md:justify-end md:px-12 md:pb-24 md:pt-24">
          <div className="max-w-3xl">
            <div className="mb-3 inline-block rounded-full border border-foreground/20 bg-foreground/20 px-3 py-1 md:mb-4 md:px-4 md:py-1.5">
              <p className="font-mono text-[10px] text-foreground/90 md:text-xs">{t.hero.badge}</p>
            </div>
            <h1 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-5xl lg:text-7xl">
              {lang === 'ru' ? (
                <>
                  Сайты и приложения,<br />которые работают<br />на ваш бизнес
                </>
              ) : (
                <>
                  Apps &amp; sites<br />that work<br />for your business
                </>
              )}
            </h1>
            <p className="mb-4 max-w-xl text-sm leading-relaxed text-foreground/90 md:mb-6 md:text-base md:text-lg">
              {t.hero.description}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <MagneticButton size="md" variant="primary" onClick={() => scrollToSection(4)}>{t.hero.ctaProject}</MagneticButton>
              <MagneticButton size="md" variant="secondary" onClick={() => scrollToSection(2)}>{t.hero.ctaServices}</MagneticButton>
            </div>
          </div>

          {/* Swipe indicator for mobile/tablet */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 animate-fade-in lg:hidden" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <span className="font-mono text-sm text-foreground/60 md:text-sm md:text-foreground/50">
              {lang === 'ru' ? 'Свайп' : 'Swipe'}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-foreground/60 md:h-6 md:w-6 md:text-foreground/50 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </section>

        <WorkSection onModalChange={setIsModalOpen} scrollContainerRef={scrollContainerRef} lang={lang} />
        <ServicesSection lang={lang} />
        <AboutSection scrollToSection={scrollToSection} lang={lang} />
        <ContactSection lang={lang} />
      </div>
    </main>
  )
}
