import { useLanguage } from '@/context/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Building2, Factory, Globe2, Landmark, Briefcase, Store } from 'lucide-react';

const partners = [
  { name: 'Partner 1', icon: Building2 },
  { name: 'Partner 2', icon: Factory },
  { name: 'Partner 3', icon: Globe2 },
  { name: 'Partner 4', icon: Landmark },
  { name: 'Partner 5', icon: Briefcase },
  { name: 'Partner 6', icon: Store },
];

function PartnerLogo({
  partner,
  index,
}: {
  partner: (typeof partners)[0];
  index: number;
}) {
  const Icon = partner.icon;

  return (
    <div
      className="flex-shrink-0 px-8 md:px-12 group"
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      <div className="flex flex-col items-center space-y-3 transition-all duration-300 group-hover:scale-110">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-light flex items-center justify-center transition-all duration-300 group-hover:bg-gold/10">
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray transition-colors duration-300 group-hover:text-gold" />
        </div>
        <span className="text-sm text-gray transition-colors duration-300 group-hover:text-gold">
          {partner.name}
        </span>
      </div>
    </div>
  );
}

export default function Partners() {
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gray-light overflow-hidden"
    >
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
            {t.partners.label}
          </span>
          <h2
            className={`mt-4 text-3xl md:text-4xl font-serif font-bold text-dark transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {t.partners.title}
          </h2>
          <p
            className={`mt-4 max-w-2xl mx-auto text-gray transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {t.partners.description}
          </p>
        </div>

        {/* Infinite Scroll Carousel */}
        <div
          className={`relative transition-all duration-1000 ${
            sectionVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-20'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-light to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-light to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-infinite">
              {[...partners, ...partners].map((partner, index) => (
                <PartnerLogo key={`${partner.name}-${index}`} partner={partner} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 transition-all duration-700 ${
            sectionVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {[
            { value: '50+', label: 'Global Partners' },
            { value: '30+', label: 'Countries' },
            { value: '100%', label: 'Satisfaction' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gold mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
        }
        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
