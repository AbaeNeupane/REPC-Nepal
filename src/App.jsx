import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { FaWhatsapp } from 'react-icons/fa';
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

const FloatingWhatsApp = () => (
  <a
    href={`https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent('Hello REPC-Nepal, I would like to inquire about your services.')}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
  >
    <FaWhatsapp size={28} />
  </a>
);

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
  </div>
);

const App = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/about"       element={<About />} />
            <Route path="/services"    element={<Services />} />
            <Route path="/notices"     element={<Notices />} />
            <Route path="/programs"    element={<Programs />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/gallery"     element={<Gallery />} />
            <Route path="/contact"     element={<Contact />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-24 text-center px-4">
                <h1 className="text-6xl font-bold text-navy mb-4">404</h1>
                <p className="text-gray-500 mb-6">Page not found</p>
                <a href="/" className="bg-navy text-white px-6 py-2 rounded-sm hover:bg-navy-light transition-colors">
                  Back to Home
                </a>
              </div>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
