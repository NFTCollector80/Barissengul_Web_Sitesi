import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LuxuryCard = ({ image, price, propertyType, location, specs, onViewDetails }) => {
  return (
    <div className="luxury-card overflow-hidden group flex flex-col h-full">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={`${propertyType} in ${location}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-medium text-foreground uppercase tracking-wider">
          {propertyType}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-2xl font-bold text-primary mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          {price}
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <MapPin size={16} className="text-primary" />
          <span>{location}</span>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-foreground/80 border-t border-border/50 pt-4 mt-auto">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center gap-1">
              <span className="font-medium">{spec.value}</span>
              <span className="text-muted-foreground">{spec.label}</span>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={onViewDetails}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 group-hover:shadow-md"
        >
          Detayları Gör
        </Button>
      </div>
    </div>
  );
};

export default LuxuryCard;