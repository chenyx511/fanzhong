import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

export default function Header() {
  const { t, language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'network', href: '#network' },
    { key: 'products', href: '#products' },
    { key: 'partners', href: '#partners' },
    { key: 'contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className={`font-serif text-lg md:text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-dark' : 'text-white'
            }`}
          >
            <span className="hidden sm:inline">
              {language === 'ja' ? '凡仲合同会社' : 'UNIHOPE CO., LTD'}
            </span>
            <span className="sm:hidden">
              {language === 'ja' ? '凡仲合同' : 'UNIHOPE'}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className={`relative text-sm font-medium transition-colors duration-300 group ${
                  isScrolled ? 'text-gray hover:text-gold' : 'text-white/90 hover:text-white'
                }`}
              >
                {t.nav[item.key as keyof typeof t.nav]}
                <span
                  className={`absolute -bottom-1 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full group-hover:left-0 ${
                    isScrolled ? 'bg-gold' : 'bg-white'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Language Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray hover:text-gold' : 'text-white/90 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ja' ? '日本語' : 'English'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-dark' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className={`text-left text-base font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-gray hover:text-gold' : 'text-white/90 hover:text-white'
                }`}
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </button>
            ))}
            <button
              onClick={toggleLanguage}
              className={`flex items-center space-x-2 text-base font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray hover:text-gold' : 'text-white/90 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ja' ? '日本語' : 'English'}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
