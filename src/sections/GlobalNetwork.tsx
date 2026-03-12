import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { assetUrl } from '@/lib/assets';
import { Building2, Users, Factory } from 'lucide-react';

interface Location {
  id: string;
  x: number;
  y: number;
  role: 'headquarters' | 'customer' | 'supplier';
}

const locations: Location[] = [
  { id: 'japan', x: 86, y: 36, role: 'headquarters' },
  { id: 'china', x: 76, y: 40, role: 'supplier' },
  { id: 'usa', x: 22, y: 38, role: 'customer' },
  { id: 'europe', x: 50, y: 34, role: 'customer' },
  { id: 'india', x: 66, y: 50, role: 'customer' },
  { id: 'sea', x: 78, y: 56, role: 'supplier' },
];

const roleColors = {
  headquarters: 'bg-gold shadow-gold',
  customer: 'bg-blue-500 shadow-lg shadow-blue-500/30',
  supplier: 'bg-green-500 shadow-lg shadow-green-500/30',
} as const;

const rolePingColors: Record<string, string> = {
  headquarters: 'rgba(212, 168, 83, 0.3)',
  customer: 'rgba(59, 130, 246, 0.3)',
  supplier: 'rgba(34, 197, 94, 0.3)',
};

function LocationMarker({
  location,
  delay,
  isVisible,
}: {
  location: Location;
  delay: number;
  isVisible: boolean;
}) {
  const { t } = useLanguage();
  const roleIcons = {
    headquarters: Building2,
    customer: Users,
    supplier: Factory,
  };
  const Icon = roleIcons[location.role];
  const markerColor = roleColors[location.role];

  return (
    <div
      className={`absolute transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
      style={{
        left: `${location.x}%`,
        top: `${location.y}%`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="relative group">
        {/* Pulse Ring */}
        <div className="absolute inset-0 -m-4">
          <div
            className="w-8 h-8 rounded-full animate-ping"
            style={{ backgroundColor: rolePingColors[location.role] }}
          />
        </div>
        {/* Marker */}
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-transform duration-300 group-hover:scale-125 ${markerColor}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            <div className="text-sm font-medium text-dark">
              {t.network.locations[location.id as keyof typeof t.network.locations]}
            </div>
            <div className="text-xs text-gold">
              {t.network.roles[location.role]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GlobalNetwork() {
  const { t } = useLanguage();
  const [mapImgError, setMapImgError] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation({
    threshold: 0.3,
  });

  return (
    <section
      id="network"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-dark overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-gray to-dark" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`section-label transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            {t.network.label}
          </span>
          <h2
            className={`mt-4 text-3xl md:text-4xl font-serif font-bold text-white transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {t.network.title}
          </h2>
          <p
            className={`mt-4 max-w-2xl mx-auto text-white/60 transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {t.network.description}
          </p>
        </div>

        {/* Map Container */}
        <div
          ref={mapRef}
          className={`relative aspect-[16/9] max-w-4xl mx-auto transition-all duration-1000 ${
            mapVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* World Map */}
          <div className={`absolute inset-0 flex items-center justify-center ${mapImgError ? 'bg-dark-gray/50' : ''}`}>
            {!mapImgError && (
              <img
                src={assetUrl('world-map-new.jpg')}
                alt=""
                className="w-full h-full object-contain opacity-40"
                onError={() => setMapImgError(true)}
              />
            )}
          </div>

          {/* Location Markers */}
          {locations.map((location, index) => (
            <LocationMarker
              key={location.id}
              location={location}
              delay={500 + index * 100}
              isVisible={mapVisible}
            />
          ))}

          {/* Connection Lines (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Lines from headquarters to customers */}
            {locations
              .filter((l) => l.role === 'customer')
              .map((location, i) => (
                <line
                  key={`line-${i}`}
                  x1="86"
                  y1="36"
                  x2={location.x}
                  y2={location.y}
                  stroke="rgba(212, 168, 83, 0.3)"
                  strokeWidth="0.2"
                  strokeDasharray="2 2"
                  className={`transition-opacity duration-1000 ${
                    mapVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${800 + i * 100}ms` }}
                />
              ))}
            {/* Lines from suppliers to headquarters */}
            {locations
              .filter((l) => l.role === 'supplier')
              .map((location, i) => (
                <line
                  key={`supply-${i}`}
                  x1={location.x}
                  y1={location.y}
                  x2="86"
                  y2="36"
                  stroke="rgba(212, 168, 83, 0.3)"
                  strokeWidth="0.2"
                  strokeDasharray="2 2"
                  className={`transition-opacity duration-1000 ${
                    mapVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${1000 + i * 100}ms` }}
                />
              ))}
          </svg>
        </div>

        {/* Legend */}
        <div
          className={`flex flex-wrap justify-center gap-6 mt-12 transition-all duration-700 ${
            sectionVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {[
            { role: 'headquarters', icon: Building2, color: 'bg-gold' },
            { role: 'customer', icon: Users, color: 'bg-blue-500' },
            { role: 'supplier', icon: Factory, color: 'bg-green-500' },
          ].map(({ role, icon: Icon, color }) => (
            <div key={role} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full ${color}`}>
                <Icon className="w-3 h-3 text-white m-0.5" />
              </div>
              <span className="text-sm text-white/60">
                {t.network.roles[role as keyof typeof t.network.roles]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
