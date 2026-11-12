import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Facebook, Linkedin, MapPin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [{
    name: 'Ana Sayfa',
    path: '/'
  }, {
    name: 'İlanlar',
    path: '/listings'
  }, {
    name: 'Hakkımda',
    path: '/about'
  }, {
    name: 'İzmir Yarımadası',
    path: '/izmir-peninsula'
  }, {
    name: 'İletişim',
    path: '/contact'
  }];

  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Section */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Barış Şengül
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm">
              İzmir Yarımadası'nda Butik Gayrimenkul Danışmanı. Urla, Güzelbahçe, Seferihisar ve Çeşme'de seçkin mülkler için güvenilir rehberiniz.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/kw.baris.sengul" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C4A47C] hover:text-[#1A1A1A] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com/kw.baris.sengul" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C4A47C] hover:text-[#1A1A1A] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/baris-sengul" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C4A47C] hover:text-[#1A1A1A] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-4 lg:pl-12">
            <h4 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Hızlı Bağlantılar
            </h4>
            <nav className="space-y-3">
              {quickLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="block text-sm text-white/70 hover:text-[#C4A47C] transition-colors duration-300 w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              İletişim
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Phone size={18} className="text-[#C4A47C] shrink-0 mt-0.5" />
                <a href="tel:+905332109731" className="hover:text-[#C4A47C] transition-colors duration-300">
                  +90 533 210 97 31
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Mail size={18} className="text-[#C4A47C] shrink-0 mt-0.5" />
                <a href="mailto:info@barissengul.com" className="hover:text-[#C4A47C] transition-colors duration-300">
                  info@barissengul.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={18} className="text-[#C4A47C] shrink-0 mt-0.5" />
                <span>
                  Ofis: Keller Williams Alesta Viya Orsa – İzmir
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Barış Şengül. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <Link to="#" className="hover:text-[#C4A47C] transition-colors duration-300">Gizlilik Politikası</Link>
            <Link to="#" className="hover:text-[#C4A47C] transition-colors duration-300">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;