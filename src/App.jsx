import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

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

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <TopBar />
    <Header />
    <Navigation />
    <main className="flex-1 bg-gray-50">
      {children}
    </main>
    <Footer />
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
