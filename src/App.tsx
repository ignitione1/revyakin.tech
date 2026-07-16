import { Routes, Route, useLocation } from "react-router-dom";
import { StudioLanding } from "./components/StudioLanding";
import { ServicesPage } from "./components/ServicesPage";
import { useEffect, useRef, useState } from "react";
import { type Lang } from "./lib/translations";

function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    return (saved === 'ru' || saved === 'en') ? saved : 'ru';
  });

  // Учёт переходов между маршрутами для Яндекс.Метрики.
  // Первую загрузку уже засчитал init в index.html — пропускаем её.
  const location = useLocation();
  const firstHit = useRef(true);
  useEffect(() => {
    if (firstHit.current) {
      firstHit.current = false;
      return;
    }
    window.ym?.(110783840, "hit", window.location.href);
  }, [location.pathname]);

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <Routes>
      <Route path="/" element={<StudioLanding lang={lang} onLangChange={handleLangChange} />} />
      <Route path="/services" element={<ServicesPage lang={lang} />} />
    </Routes>
  );
}

export default App;
