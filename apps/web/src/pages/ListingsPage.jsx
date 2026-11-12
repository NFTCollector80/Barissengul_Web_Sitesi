import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LuxuryCard from '@/components/LuxuryCard';
import { properties } from '@/data/properties';

const ListingsPage = () => {
  const navigate = useNavigate();
  const [locationFilter, setLocationFilter] = useState('Tümü');
  const [typeFilter, setTypeFilter] = useState('Tümü');

  const locations = ['Tümü', 'Urla', 'Güzelbahçe', 'Seferihisar', 'Çeşme'];
  const types = ['Tümü', 'Villa', 'Daire', 'Arsa'];

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchLocation = locationFilter === 'Tümü' || p.location === locationFilter;
      const matchType = typeFilter === 'Tümü' || p.type === typeFilter;
      return matchLocation && matchType;
    });
  }, [locationFilter, typeFilter]);

  const getPropertySpecs = (p) => {
    const specs = [];
    if (p.size) specs.push({ label: 'Alan', value: `${p.size} m²` });
    if (p.landSize && !p.size) specs.push({ label: 'Arsa', value: `${p.landSize} m²` });
    if (p.bedrooms) specs.push({ label: 'Oda', value: p.bedrooms });
    if (p.bathrooms) specs.push({ label: 'Banyo', value: p.bathrooms });
    return specs;
  };

  const clearFilters = () => {
    setLocationFilter('Tümü');
    setTypeFilter('Tümü');
  };

  return (
    <>
      <Helmet>
        <title>Portföyümüz - Barış Şengül Gayrimenkul</title>
        <meta name="description" content="İzmir Yarımadası'nda satılık ve kiralık lüks villalar, daireler ve arsalar. Urla, Güzelbahçe, Seferihisar ve Çeşme'de seçkin gayrimenkul portföyü." />
      </Helmet>

      {/* Hero Section */}
      <section className="luxury-spacing bg-muted/30 border-b border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}
          >
            Premium Gayrimenkul Portföyü
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-prose mx-auto"
          >
            İzmir Yarımadası'nın en seçkin lokasyonlarında, yüksek yaşam standartlarına sahip mülkleri keşfedin.
          </motion.p>
        </div>
      </section>

      {/* Filters & Listings */}
      <section className="luxury-spacing-lg bg-background min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-card p-6 rounded-lg border border-border/50 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
              {/* Location Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Filter size={14} /> Lokasyon
                </label>
                <div className="flex flex-wrap gap-2">
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setLocationFilter(loc)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        locationFilter === loc 
                          ? 'bg-primary text-primary-foreground shadow-md' 
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Filter size={14} /> Mülk Tipi
                </label>
                <div className="flex flex-wrap gap-2">
                  {types.map(type => (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        typeFilter === type 
                          ? 'bg-primary text-primary-foreground shadow-md' 
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count & Clear */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pt-4 md:pt-0 border-t md:border-t-0 border-border/50">
              <span className="text-sm font-medium text-foreground">
                <strong className="text-primary text-lg">{filteredProperties.length}</strong> mülk bulundu
              </span>
              {(locationFilter !== 'Tümü' || typeFilter !== 'Tümü') && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X size={16} className="mr-1" /> Temizle
                </Button>
              )}
            </div>
          </div>

          {/* Listings Grid */}
          {filteredProperties.length > 0 ? (
            <div className="luxury-grid">
              <AnimatePresence mode="popLayout">
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LuxuryCard 
                      image={property.image}
                      price={`${property.price} TL`}
                      propertyType={property.type}
                      location={`${property.location}, İzmir`}
                      specs={getPropertySpecs(property)}
                      onViewDetails={() => navigate(`/property/${property.id}`)} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-muted/20 rounded-lg border border-border/50"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Sonuç Bulunamadı
              </h3>
              <p className="text-muted-foreground mb-6">
                Seçtiğiniz kriterlere uygun mülk bulunmamaktadır. Lütfen filtreleri değiştirerek tekrar deneyin.
              </p>
              <Button onClick={clearFilters} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Filtreleri Temizle
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default ListingsPage;