import React from 'react';
import { ArrowRight } from 'lucide-react';

const RegionCard = ({ backgroundImage, hoverImage, regionName, onExplore }) => {
  return (
    <div 
      className="relative overflow-hidden rounded-lg aspect-[3/4] group cursor-pointer"
      onClick={onExplore}
    >
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
        <img
          src={backgroundImage}
          alt={`${regionName} bölgesi`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
        />
        {hoverImage && (
          <img
            src={hoverImage}
            alt={`${regionName} bölgesi`}
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
        <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          {regionName}
        </h3>
        <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <span className="text-sm font-medium uppercase tracking-wider">Detayları Gör</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default RegionCard;