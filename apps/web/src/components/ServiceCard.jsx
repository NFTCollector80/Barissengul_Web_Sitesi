import React from 'react';

const ServiceCard = ({ icon: Icon, stepNumber, title, tagline, intro, items, benefit, description }) => {
  return (
    <div className="relative h-full p-8 bg-card rounded-lg border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>
        {stepNumber}
      </div>
      
      <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon size={28} className="text-primary" />
      </div>
      
      <h3 className="text-lg font-bold text-foreground mb-3 leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
        {title}
      </h3>

      {tagline && <p className="text-primary font-semibold text-sm mb-3 leading-snug">{tagline}</p>}

      {description && <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>}

      {intro && <p className="text-muted-foreground text-sm leading-relaxed mb-4">{intro}</p>}

      {items && items.length > 0 && (
        <ul className="space-y-3 mb-5">
          {items.map((item, index) => (
            <li key={index} className="text-sm leading-relaxed">
              <span className="font-semibold text-foreground">{item.label}: </span>
              <span className="text-muted-foreground">{item.text}</span>
            </li>
          ))}
        </ul>
      )}

      {benefit && (
        <div className="mt-4 p-4 bg-primary/5 border-l-2 border-primary rounded-sm">
          <p className="text-sm leading-relaxed">
            <span className="font-semibold text-foreground">Müşteriye Faydası: </span>
            <span className="text-muted-foreground">{benefit}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;