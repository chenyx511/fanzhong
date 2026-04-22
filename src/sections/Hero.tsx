import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { images } from '@/assets/images';
import { ArrowRight, ChevronDown } from 'lucide-react';

const PARTICLES = Array.from({ length: 20 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  animationDelay: `${(index * 0.3) % 6}s`,
  animationDuration: `${6 + (index % 4)}s`,
}));

export default function Hero() {
  const { t, language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsLoaded(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 transition-transform duration-[2500ms] ease-out ${
            isLoaded ? 'scale-100' : 'scale-110'
          }`}
        >
          <img
            src={images.heroBg}
            alt=""
            className={`w-full h-full object-cover ${imgError ? 'opacity-0' : ''}`}
            loading="eager"
            fetchPriority="high"
            onError={() => setImgError(true)}
          />
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/50 to-dark/70" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/40 rounded-full animate-float"
            style={particle}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Company Name */}
          <div
            className={`transition-all duration-1000 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <span className="inline-block px-6 py-3 bg-gold/20 backdrop-blur-sm rounded-full text-gold text-lg md:text-xl font-bold tracking-wider">
              {language === 'ja' ? '凡仲合同会社' : 'UNIHOPE CO., LTD'}
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1
              className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight transition-all duration-1000 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              {t.hero.title1}
            </h1>
            <h1
              className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight transition-all duration-1000 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <span className="text-gradient">{t.hero.title2}</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className={`max-w-2xl mx-auto text-lg sm:text-xl text-white/80 transition-all duration-1000 ${
              isLoaded
                ? 'opacity-100 translate-y-0 blur-0'
                : 'opacity-0 translate-y-5 blur-sm'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '1200ms' }}
          >
            <button
              onClick={scrollToAbout}
              className="group btn-primary min-w-[200px]"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={scrollToContact}
              className="btn-secondary min-w-[200px] border-white/50 text-white hover:bg-white hover:text-dark"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1500ms' }}
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
        >
          <span className="text-xs mb-2 tracking-widest uppercase">
            {language === 'ja' ? 'スクロール' : 'Scroll'}
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
