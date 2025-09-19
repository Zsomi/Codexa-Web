'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { smoothScrollToSection } from '@/utils/scrollUtils';

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  const services = [
    {
      icon: (
        <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
        </svg>
      ),
      title: t('services.basic_website.title'),
      description: t('services.basic_website.description'),
      price: t('services.basic_website.price'),
      features: t('services.basic_website.features')
    },
    {
      icon: (
        <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: t('services.webshop.title'),
      description: t('services.webshop.description'),
      price: t('services.webshop.price'),
      features: t('services.webshop.features')
    },
    {
      icon: (
        <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      price: t('services.maintenance.price'),
      features: t('services.maintenance.features')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <span className="text-blue-400">{t('services.title')}</span>
          </h2>
          <p className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} style={{ animationDelay: '0.2s' }}>
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className={`grid md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          {services.map((service, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
              {/* Icon */}
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                {service.icon}
              </div>
              
              {/* Title & Price */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <div className="text-3xl font-bold text-blue-400 mb-4">
                  {service.price}
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              {/* Features */}
              <ul className="space-y-3 mb-8">
                {Array.isArray(service.features) ? service.features.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <span className="text-blue-400 text-lg">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                )) : null}
              </ul>
              
              {/* CTA Button */}
              <button 
                onClick={() => smoothScrollToSection('contact')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 transform"
              >
                {t('services.cta')}
              </button>
            </div>
          ))}
        </div>
        
        {/* Additional info */}
        <div className={`text-center mt-16 transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-400 mb-4 flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <strong className="text-blue-400">{t('services.custom_needs.question')}</strong> {t('services.custom_needs.answer')}
          </p>
          <button 
            onClick={() => smoothScrollToSection('contact')}
            className="text-blue-300 hover:text-blue-200 font-medium underline decoration-2 underline-offset-4 hover:no-underline transition-all duration-300"
          >
            {t('services.custom_needs.cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
