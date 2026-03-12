import { useLanguage } from '@/context/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MessageSquare, Search, ShieldCheck, Truck, Headphones } from 'lucide-react';

const steps = [
  { id: 'consultation', icon: MessageSquare },
  { id: 'sourcing', icon: Search },
  { id: 'quality', icon: ShieldCheck },
  { id: 'logistics', icon: Truck },
  { id: 'support', icon: Headphones },
];

function ProcessStep({
  step,
  index,
  isVisible,
}: {
  step: (typeof steps)[0];
  index: number;
  isVisible: boolean;
}) {
  const { t } = useLanguage();
  const Icon = step.icon;
  const stepData = t.process.steps[step.id as keyof typeof t.process.steps];
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`relative flex items-center transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      style={{ transitionDelay: `${500 + index * 200}ms` }}
    >
      {/* Content Card */}
      <div
        className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'} transition-all duration-700 ${
          isVisible
            ? 'opacity-100 translate-x-0'
            : `opacity-0 ${isLeft ? '-translate-x-10' : 'translate-x-10'}`
        }`}
        style={{ transitionDelay: `${600 + index * 200}ms` }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
          <h3 className="text-xl font-serif font-bold text-dark mb-2 group-hover:text-gold transition-colors">
            {stepData.title}
          </h3>
          <p className="text-gray text-sm leading-relaxed">
            {stepData.description}
          </p>
        </div>
      </div>

      {/* Center Marker */}
      <div className="w-2/12 flex justify-center">
        <div
          className={`relative transition-all duration-500 ${
            isVisible ? 'scale-100' : 'scale-0'
          }`}
          style={{ transitionDelay: `${500 + index * 200}ms` }}
        >
          {/* Pulse Ring */}
          <div className="absolute inset-0 -m-2">
            <div className="w-12 h-12 rounded-full bg-gold/20 animate-ping" />
          </div>
          {/* Marker */}
          <div className="relative w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-gold animate-pulse-glow">
            <Icon className="w-5 h-5 text-white" />
          </div>
          {/* Number */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-dark text-white text-xs rounded-full flex items-center justify-center font-bold">
            {index + 1}
          </div>
        </div>
      </div>

      {/* Empty Space */}
      <div className="w-5/12" />
    </div>
  );
}

export default function Process() {
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #d4a853 0, #d4a853 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`section-label transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            {t.process.label}
          </span>
          <h2
            className={`mt-4 text-3xl md:text-4xl font-serif font-bold text-dark transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {t.process.title}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div
              className={`h-full bg-gradient-to-b from-gold via-gold to-gold/30 transition-all duration-1000 ${
                sectionVisible ? 'scale-y-100' : 'scale-y-0'
              }`}
              style={{ transformOrigin: 'top', transitionDelay: '300ms' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                isVisible={sectionVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
