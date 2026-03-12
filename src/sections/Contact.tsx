import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Mail, Send, CheckCircle, Building2 } from 'lucide-react';

export default function Contact() {
  const { t, language } = useLanguage();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Building2, label: language === 'ja' ? '凡仲合同会社' : 'UNIHOPE CO., LTD' },
    { icon: MapPin, label: t.contact.info.address },
    { icon: Mail, label: t.contact.info.email },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-br from-gray-light via-white to-gray-light overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

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
            {t.contact.label}
          </span>
          <h2
            className={`mt-4 text-3xl md:text-4xl font-serif font-bold text-dark transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {t.contact.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Company Name Card */}
            <div className="bg-gradient-to-br from-dark to-dark-gray p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                {language === 'ja' ? '凡仲合同会社' : 'UNIHOPE CO., LTD'}
              </h3>
              <p className="text-gold text-sm">
                Industry Expertise | Global Vision
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                      <Icon className="w-5 h-5 text-gold group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="pt-2">
                      <p className="text-gray leading-relaxed">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Business Hours */}
            <div className="bg-gold/5 p-6 rounded-lg border border-gold/20">
              <h4 className="font-serif font-bold text-dark mb-3">
                {language === 'ja' ? '営業時間' : 'Business Hours'}
              </h4>
              <p className="text-gray text-sm">
                {language === 'ja'
                  ? '月曜日〜金曜日: 9:00 - 18:00'
                  : 'Monday - Friday: 9:00 AM - 6:00 PM'}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark">
                    {t.contact.form.name}
                    <span className="text-gold ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                    placeholder={t.contact.form.name}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark">
                    {t.contact.form.email}
                    <span className="text-gold ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                    placeholder={t.contact.form.email}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark">
                    {t.contact.form.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                    placeholder={t.contact.form.phone}
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark">
                    {t.contact.form.company}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                    placeholder={t.contact.form.company}
                  />
                </div>

                {/* Message */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-dark">
                    {t.contact.form.message}
                    <span className="text-gold ml-1">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 resize-none"
                    placeholder={t.contact.form.message}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitted}
                className={`mt-6 w-full btn-primary ${
                  isSubmitted ? 'bg-green-500 hover:bg-green-500' : ''
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {language === 'ja' ? '送信完了' : 'Sent!'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t.contact.form.submit}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
