import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'İlanlar', path: '/listings' },
    { name: 'Hakkımda', path: '/about' },
    { name: 'İzmir Yarımadası', path: '/izmir-peninsula' },
    { name: 'İletişim', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleValuationClick = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('valuation-cta');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('valuation-cta');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-2' : 'bg-background py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>
              Barış Şengül
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium relative py-2 transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <button 
              onClick={handleValuationClick}
              className="bg-primary text-primary-foreground hover:shadow-lg hover:-translate-y-0.5 px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-300"
            >
              Mülkünüzün Değerini Öğrenin
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border bg-background shadow-lg absolute w-full"
          >
            <nav className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <button 
                  onClick={handleValuationClick}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-md text-sm font-semibold transition-colors duration-300"
                >
                  Mülkünüzün Değerini Öğrenin
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;