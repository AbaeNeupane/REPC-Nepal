import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('repc-lang') || 'en'; } catch { return 'en'; }
  });

  const toggleLang = (l) => {
    setLang(l);
    try { localStorage.setItem('repc-lang', l); } catch { /* ignore */ }
  };

  // Helper: pick text based on current language
  const t = (en, np) => lang === 'en' ? en : np;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
