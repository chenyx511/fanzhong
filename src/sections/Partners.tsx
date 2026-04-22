import { useLanguage } from '@/context/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ExternalLink } from 'lucide-react';

const partners = [
  {
    name: 'Zhejiang NHU Co., Ltd.',
    website: 'https://www.cnhu.com',
    logo: 'https://logo.clearbit.com/cnhu.com',
  },
  {
    name: 'Wanxiang Technology Group',
    website: 'https://www.wanxiang-tech.com',
    logo: '/supplier-logos/wanxiang.png',
  },
  {
    name: 'Zhonghua Chemical',
    website: 'https://www.zhhhg.com',
    logo: '/supplier-logos/zhonghua.png',
  },
  {
    name: 'Chengdu Sunshine Flavors',
    website: 'http://www.cdsunshineflavors.com',
    logo: 'https://logo.clearbit.com/cdsunshineflavors.com',
  },
  {
    name: 'Karnataka Aromas',
    website: 'https://www.karnatakaaromas.com',
    logo: 'https://logo.clearbit.com/karnatakaaromas.com',
  },
];

function PartnerLogo({
  partner,
  index,
  linkLabel,
}: {
  partner: (typeof partners)[0];
  index: number;
  linkLabel: string;
}) {
  const fallbackLogo = `https://www.google.com/s2/favicons?sz=128&domain_url=${partner.website}`;

  return (
    <a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-gold/20 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-gray-200 bg-white p-2">
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="h-full w-full object-contain"
            onError={(event) => {
              const target = event.currentTarget;
              if (target.src !== fallbackLogo) {
                target.src = fallbackLogo;
              }
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm md:text-base font-semibold text-dark">{partner.name}</div>
          <div className="mt-1 flex items-center text-xs text-gold">
            <ExternalLink className="mr-1 h-3.5 w-3.5" />
            <span className="truncate">{linkLabel}</span>
          </div>
        </div>
      </div>
    </a>
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

        {/* Supplier Logos and Website Links */}
        <div
          className={`relative transition-all duration-1000 ${
            sectionVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-20'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <h3 className="mb-6 text-xl font-serif font-bold text-dark">{t.partners.supplierTitle}</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, index) => (
              <PartnerLogo key={partner.name} partner={partner} index={index} linkLabel={t.partners.linkLabel} />
            ))}
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

    </section>
  );
}
