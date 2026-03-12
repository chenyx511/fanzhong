import { useLanguage } from '@/context/LanguageContext';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { Leaf, Globe, Handshake, TrendingUp } from 'lucide-react';

function StatCard({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');
  const { count, countRef } = useCountUp(numericValue, 2000);

  return (
    <div
      ref={ref}
      className={`relative p-6 bg-white rounded-lg shadow-lg transition-all duration-700 hover:-translate-y-2 hover:shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        ref={countRef}
        className="text-4xl md:text-5xl font-serif font-bold text-gold mb-2 animate-pulse-glow"
      >
        {count}
        {suffix}
      </div>
      <div className="text-sm text-gray">{label}</div>
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/30 rounded-bl-lg" />
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  content,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  content: string;
  delay: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-gold" />
      </div>
      <h3 className="text-lg font-serif font-bold text-dark mb-3">{title}</h3>
      <p className="text-gray text-sm leading-relaxed">{content}</p>
    </div>
  );
}

function PartnerItem({
  name,
  description,
  delay,
}: {
  name: string;
  description: string;
  delay: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`flex items-start space-x-4 p-4 bg-white/50 rounded-lg border border-gold/20 hover:border-gold/50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
      <div>
        <h4 className="font-medium text-dark mb-1">{name}</h4>
        <p className="text-sm text-gray">{description}</p>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  const features = [
    {
      icon: Handshake,
      title: t.about.bridge.title,
      content: t.about.bridge.content,
    },
    {
      icon: Leaf,
      title: t.about.green.title,
      content: t.about.green.content,
    },
    {
      icon: TrendingUp,
      title: t.about.future.title,
      content: t.about.future.content,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-br from-gray-light via-white to-gray-light overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #d4a853 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span
            className={`section-label transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            {t.about.label}
          </span>
          <h2
            className={`mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-dark transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {t.about.title}
          </h2>
          <p
            className={`mt-2 text-xl text-gold font-medium transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            {t.about.subtitle}
          </p>
        </div>

        {/* Main Description */}
        <div
          className={`max-w-4xl mx-auto mb-16 transition-all duration-700 ${
            sectionVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <p className="text-lg text-gray leading-relaxed text-center">
            {t.about.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-20">
          <StatCard
            value={t.about.stats.years.value}
            label={t.about.stats.years.label}
            delay={300}
          />
          <StatCard
            value={t.about.stats.partners.value}
            label={t.about.stats.partners.label}
            delay={450}
          />
          <StatCard
            value={t.about.stats.transactions.value}
            label={t.about.stats.transactions.label}
            delay={600}
          />
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              content={feature.content}
              delay={700 + index * 100}
            />
          ))}
        </div>

        {/* Core Partners Section */}
        <div
          className={`transition-all duration-700 ${
            sectionVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="bg-gradient-to-br from-dark to-dark-gray rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-3 mb-8">
              <Globe className="w-6 h-6 text-gold" />
              <h3 className="text-2xl font-serif font-bold text-white">
                {t.about.corePartners.title}
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {t.about.corePartners.partners.map((partner, index) => (
                <PartnerItem
                  key={index}
                  name={partner.name}
                  description={partner.description}
                  delay={1100 + index * 100}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
