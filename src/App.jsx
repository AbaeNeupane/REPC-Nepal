import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import { siteInfo } from './data/siteContent';

import TopBar     from './components/TopBar';
import Header     from './components/Header';
import Navigation from './components/Navigation';
import Footer     from './components/Footer';

import Home         from './pages/Home';
import About        from './pages/About';
import Services     from './pages/Services';
import Notices      from './pages/Notices';
import Programs     from './pages/Programs';
import Publications from './pages/Publications';
import Gallery      from './pages/Gallery';
import Contact      from './pages/Contact';

/* ─────────────────────────────────────────────────────────────
   Hash Scroller
   - Same-page hash  (#team while on /about)  → short delay, just scroll
   - Cross-page hash (#team from /contact)    → longer delay to let
     the enter animation finish first, then scroll
───────────────────────────────────────────────────────────── */
const HashScroller = () => {
  const location  = useLocation();
  const prevPath  = useRef(location.pathname);

  useEffect(() => {
    if (!location.hash) {
      prevPath.current = location.pathname;
      return;
    }

    const id          = location.hash.slice(1);           // strip '#'
    const crossPage   = location.pathname !== prevPath.current;
    prevPath.current  = location.pathname;

    // Cross-page: wait for exit (180ms) + enter animation (380ms) + small buffer
    // Same-page:  short delay so the browser registers the hash change first
    const delay = crossPage ? 620 : 80;

    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const navbarHeight = 112;                            // topbar + header + nav
      const top = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }, delay);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return null;
};

/* ─────────────────────────────────────────────────────────────
   Page Transition
   - Detects pathname change (NOT hash-only changes)
   - Plays exit animation on old page (180ms)
   - When exit ends → swaps to new page → plays enter animation (380ms)
   - Hash-only navigation skips the transition entirely
───────────────────────────────────────────────────────────── */
const PageTransition = () => {
  const location                          = useLocation();
  const [displayLoc, setDisplayLoc]       = useState(location);
  const [stage, setStage]                 = useState('enter'); // 'enter' | 'exit'
  const prevPathname                      = useRef(location.pathname);

  useEffect(() => {
    const pathChanged = location.pathname !== prevPathname.current;

    if (pathChanged) {
      // Pathname changed — run exit → enter
      prevPathname.current = location.pathname;
      setStage('exit');
    } else {
      // Hash-only change on the same page — no transition, just keep in sync
      setDisplayLoc(location);
    }
  }, [location.key]); // location.key changes on every navigation

  const handleAnimationEnd = () => {
    if (stage === 'exit') {
      // Snap to top before new page appears (feels clean)
      window.scrollTo({ top: 0, behavior: 'instant' });
      setDisplayLoc(location);
      setStage('enter');
    }
  };

  return (
    <div
      className={stage === 'enter' ? 'page-enter' : 'page-exit'}
      onAnimationEnd={handleAnimationEnd}
    >
      <Routes location={displayLoc}>
        <Route path="/"             element={<Home />}         />
        <Route path="/about"        element={<About />}        />
        <Route path="/services"     element={<Services />}     />
        <Route path="/notices"      element={<Notices />}      />
        <Route path="/programs"     element={<Programs />}     />
        <Route path="/publications" element={<Publications />} />
        <Route path="/gallery"      element={<Gallery />}      />
        <Route path="/contact"      element={<Contact />}      />
        <Route path="*"             element={<NotFound />}     />
      </Routes>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Floating WhatsApp
───────────────────────────────────────────────────────────── */
const FloatingWhatsApp = () => (
  <a
    href={`https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(
      'Hello REPC-Nepal, I would like to inquire about your services.'
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    title="Chat with us on WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600
               text-white rounded-full shadow-lg hover:shadow-xl
               flex items-center justify-center
               transition-all duration-300 hover:scale-110 no-print"
  >
    <FaWhatsapp size={27} />
  </a>
);

/* ─────────────────────────────────────────────────────────────
   Scroll-to-top button
───────────────────────────────────────────────────────────── */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 380);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      title="Back to top"
      className="scroll-top-btn no-print animate-scaleIn"
    >
      <FaArrowUp size={15} />
    </button>
  );
};

/* ─────────────────────────────────────────────────────────────
   404 page
───────────────────────────────────────────────────────────── */
const NotFound = () => (
  <div className="flex flex-col items-center justify-center py-28 text-center px-4">
    <div className="w-20 h-1 bg-redc mx-auto mb-8 rounded" />
    <h1 className="text-7xl font-bold text-navy mb-2">404</h1>
    <p className="text-gray-400 text-lg mb-8">Page not found</p>
    <a href="/" className="btn-primary">← Back to Home</a>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Layout
───────────────────────────────────────────────────────────── */
const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <TopBar />
    <Header />
    <Navigation />
    <main className="flex-1 bg-gray-50">
      {children}
    </main>
    <Footer />
    <FloatingWhatsApp />
    <ScrollToTop />
  </div>
);

/* ─────────────────────────────────────────────────────────────
   AppInner  (must be inside BrowserRouter to use useLocation)
───────────────────────────────────────────────────────────── */
const AppInner = () => (
  <Layout>
    <HashScroller />
    <PageTransition />
  </Layout>
);

/* ─────────────────────────────────────────────────────────────
   App root
───────────────────────────────────────────────────────────── */
const App = () => (
  <LanguageProvider>
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  </LanguageProvider>
);

export default App;
