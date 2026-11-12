import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AboutPage from './pages/AboutPage';
import IzmirPeninsulaPage from './pages/IzmirPeninsulaPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/izmir-peninsula" element={<IzmirPeninsulaPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  404
                </h1>
                <h2 className="text-2xl font-medium text-foreground mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Sayfa Bulunamadı
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Aradığınız sayfa taşınmış, silinmiş veya geçici olarak ulaşılamıyor olabilir.
                </p>
                <a href="/" className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                  Ana Sayfaya Dön
                </a>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;