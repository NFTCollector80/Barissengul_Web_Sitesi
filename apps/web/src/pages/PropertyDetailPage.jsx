import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Home, Maximize2, BedDouble, Bath, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { properties } from '@/data/properties';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a slight loading delay for smooth transitions
    setLoading(true);
    const foundProperty = properties.find(p => p.id === parseInt(id));
    if (foundProperty) {
      setProperty(foundProperty);
      setCurrentImage(0);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Yükleniyor...</div>;
  }

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background px-4 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Mülk Bulunamadı
        </h1>
        <p className="text-muted-foreground mb-8">Aradığınız mülk yayından kaldırılmış veya mevcut değil.</p>
        <Button onClick={() => navigate('/listings')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Tüm Portföye Dön
        </Button>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % property.gallery.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + property.gallery.length) % property.gallery.length);
  };

  return (
    <>
      <Helmet>
        <title>{`${property.title} - Barış Şengül Gayrimenkul`}</title>
        <meta name="description" content={`${property.title} - ${property.location}. ${property.price} TL. ${property.description.substring(0, 150)}...`} />
      </Helmet>

      {/* Top Navigation Bar */}
      <div className="bg-background border-b border-border/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            Geri Dön
          </button>
        </div>
      </div>

      {/* Property Header */}
      <section className="py-10 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none text-sm px-3 py-1">
                    {property.status}
                  </Badge>
                  <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-none text-sm px-3 py-1">
                    {property.type}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}>
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-base text-muted-foreground">
                  <MapPin size={18} className="text-primary" />
                  <span>{property.location}, İzmir</span>
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">Satış Fiyatı</div>
                <div className="text-4xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {property.price} TL
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl p-2 border border-border/50 shadow-sm">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-lg aspect-[16/9] md:aspect-[21/9] bg-muted">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImage} 
                  src={property.gallery[currentImage]} 
                  alt={`${property.title} - Görsel ${currentImage + 1}`} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.3 }} 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {property.gallery.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-primary backdrop-blur-sm rounded-full text-white transition-all duration-200 active:scale-95" 
                    aria-label="Önceki görsel"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-primary backdrop-blur-sm rounded-full text-white transition-all duration-200 active:scale-95" 
                    aria-label="Sonraki görsel"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {property.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-4 px-2 snap-x scrollbar-hide">
                {property.gallery.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setCurrentImage(index)} 
                    className={`relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden snap-start transition-all duration-200 ${index === currentImage ? 'ring-2 ring-primary ring-offset-2 ring-offset-card' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Küçük görsel ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="luxury-spacing-lg bg-muted/30 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Key Specs */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Özellikler
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {property.size && (
                    <div className="bg-card p-4 rounded-lg border border-border/50 flex flex-col items-center justify-center text-center gap-2">
                      <Maximize2 className="text-primary" size={24} />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Kapalı Alan</p>
                        <p className="font-semibold text-foreground">{property.size} m²</p>
                      </div>
                    </div>
                  )}
                  {property.landSize && (
                    <div className="bg-card p-4 rounded-lg border border-border/50 flex flex-col items-center justify-center text-center gap-2">
                      <Maximize2 className="text-primary" size={24} />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Arsa Payı</p>
                        <p className="font-semibold text-foreground">{property.landSize} m²</p>
                      </div>
                    </div>
                  )}
                  {property.bedrooms && (
                    <div className="bg-card p-4 rounded-lg border border-border/50 flex flex-col items-center justify-center text-center gap-2">
                      <BedDouble className="text-primary" size={24} />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Oda Sayısı</p>
                        <p className="font-semibold text-foreground">{property.bedrooms}</p>
                      </div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="bg-card p-4 rounded-lg border border-border/50 flex flex-col items-center justify-center text-center gap-2">
                      <Bath className="text-primary" size={24} />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Banyo</p>
                        <p className="font-semibold text-foreground">{property.bathrooms}</p>
                      </div>
                    </div>
                  )}
                  <div className="bg-card p-4 rounded-lg border border-border/50 flex flex-col items-center justify-center text-center gap-2">
                    <Home className="text-primary" size={24} />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Mülk Tipi</p>
                      <p className="font-semibold text-foreground">{property.type}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Açıklama
                </h2>
                <div className="bg-card p-6 md:p-8 rounded-lg border border-border/50">
                  <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar / Contact */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border/50 shadow-lg p-6 md:p-8 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                    <img src="https://horizons-cdn.hostinger.com/1a0a8da9-6e8d-41ed-a5c6-036232ace7af/56edbe494650fc06d555fa0d1f7f7aa0.png" alt="Barış Şengül" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Barış Şengül
                  </h3>
                  <p className="text-sm text-primary font-medium mb-4">Gayrimenkul Danışmanı</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Bu mülk hakkında detaylı bilgi almak ve yerinde görmek için benimle iletişime geçin.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base" onClick={() => navigate('/contact')}>
                    Mesaj Gönder
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground h-12 text-base" 
                    onClick={() => window.open('https://wa.me/905332109731', '_blank')}
                  >
                    WhatsApp'tan Ulaş
                  </Button>
                  <a 
                    href="tel:+905332109731" 
                    className="flex items-center justify-center w-full h-12 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium"
                  >
                    +90 533 210 97 31
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyDetailPage;