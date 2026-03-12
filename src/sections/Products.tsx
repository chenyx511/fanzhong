import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { images } from '@/assets/images';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  image: string;
}

const products: Product[] = [
  { id: 'fragrance', image: images.productFragrance },
  { id: 'industrial', image: images.productIndustrial },
  { id: 'electronic', image: images.productElectronics },
  { id: 'daily', image: images.productDaily },
];

function ProductCard({
  product,
  index,
  isVisible,
  isExpanded,
  onHover,
}: {
  product: Product;
  index: number;
  isVisible: boolean;
  isExpanded: boolean;
  onHover: () => void;
}) {
  const { t } = useLanguage();
  const category = t.products.categories[product.id as keyof typeof t.products.categories];

  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isExpanded ? 'flex-[2.5]' : 'flex-1'}`}
      style={{
        transitionDelay: `${300 + index * 100}ms`,
        minHeight: '400px',
      }}
      onMouseEnter={onHover}
    >
      {/* Image */}
      <div className={`absolute inset-0 ${imgError ? 'bg-dark' : ''}`}>
        <img
          src={product.image}
          alt={category.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isExpanded ? 'scale-110' : 'scale-100'
          } ${imgError ? 'opacity-0' : ''}`}
          onError={() => setImgError(true)}
        />
        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isExpanded
              ? 'bg-gradient-to-t from-dark/90 via-dark/50 to-transparent'
              : 'bg-gradient-to-t from-dark/80 via-dark/40 to-transparent'
          }`}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div
          className={`transition-all duration-500 ${
            isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-70'
          }`}
        >
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
            {category.name}
          </h3>
          <p
            className={`text-white/80 text-sm leading-relaxed transition-all duration-500 ${
              isExpanded
                ? 'opacity-100 max-h-20'
                : 'opacity-0 max-h-0 overflow-hidden'
            }`}
          >
            {category.description}
          </p>
          <button
            className={`mt-4 flex items-center text-gold text-sm font-medium transition-all duration-500 ${
              isExpanded
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4'
            }`}
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Border */}
      <div
        className={`absolute inset-0 border-2 rounded-lg transition-colors duration-300 pointer-events-none ${
          isExpanded ? 'border-gold' : 'border-transparent'
        }`}
      />
    </div>
  );
}

export default function Products() {
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(45deg, #d4a853 25%, transparent 25%), linear-gradient(-45deg, #d4a853 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d4a853 75%), linear-gradient(-45deg, transparent 75%, #d4a853 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
        />
      </div>

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
            {t.products.label}
          </span>
          <h2
            className={`mt-4 text-3xl md:text-4xl font-serif font-bold text-dark transition-all duration-700 ${
              sectionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {t.products.title}
          </h2>
        </div>

        {/* Products Grid - Accordion Style */}
        <div className="flex flex-col lg:flex-row gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isVisible={sectionVisible}
              isExpanded={expandedIndex === index}
              onHover={() => setExpandedIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
