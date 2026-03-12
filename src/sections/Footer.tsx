import { useLanguage } from '@/context/LanguageContext';
import { Linkedin, Twitter, Facebook, ArrowUp, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { key: 'about', href: '#about' },
    { key: 'products', href: '#products' },
    { key: 'network', href: '#network' },
    { key: 'contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-dark text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, #d4a853 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold">UNIHOPE CO., LTD</h3>
                <p className="text-gold text-sm mt-1">Industry Expertise | Global Vision</p>
              </div>
              <p className="text-white/60 leading-relaxed">
                {t.footer.description}
              </p>
              {/* Contact Info Mini */}
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{t.contact.info.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gold" />
                  <span>{t.contact.info.email}</span>
                </div>
              </div>
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition-all duration-300 hover:scale-110 hover:rotate-6"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-serif font-bold">
                {t.footer.quickLinks}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.key}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/60 hover:text-gold transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {t.nav[link.key as keyof typeof t.nav]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-serif font-bold">
                {t.footer.contact}
              </h4>
              <ul className="space-y-3 text-white/60">
                <li className="leading-relaxed">{t.contact.info.address}</li>
                <li>{t.contact.info.email}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-white/40 text-sm">{t.footer.copyright}</p>
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-white/60 hover:text-gold transition-colors duration-300 group"
              >
                <span className="text-sm">{language === 'ja' ? 'トップへ' : 'Back to Top'}</span>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                  <ArrowUp className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
