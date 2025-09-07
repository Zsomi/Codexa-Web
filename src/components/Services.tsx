'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  const services = [
    {
      endpoint: 'GET /websites/custom',
      title: t('services.custom_development'),
      description: t('services.custom_development_desc'),
      features: [t('services.features.responsive'), t('services.features.fast'), t('services.features.seo')]
    },
    {
      endpoint: 'GET /frameworks/modern',
      title: t('services.modern_frameworks'),
      description: t('services.modern_frameworks_desc'),
      features: [t('services.features.modern'), t('services.features.secure'), t('services.features.support')]
    },
    {
      endpoint: 'GET /maintenance/support',
      title: t('services.maintenance'),
      description: t('services.maintenance_desc'),
      features: [t('services.features.support'), t('services.features.fast'), t('services.features.secure')]
    }
  ];

  return (
    <section className="py-20 bg-gray-900" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className={`font-mono text-3xl md:text-4xl font-bold text-white mb-12 text-center transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          {t('services.title')}
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className={`bg-gray-800 rounded-lg border border-gray-700 p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-700 ${isVisible ? 'scroll-slide-left scroll-visible' : 'scroll-slide-left'}`}>
            <div className="font-mono">
              {services.map((service, index) => (
                <div key={index} className="mb-8 last:mb-0">
                  {/* API endpoint style header */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">
                      GET
                    </span>
                    <code className="text-blue-400 text-lg">
                      {service.endpoint}
                    </code>
                  </div>
                  
                  {/* Service details */}
                  <div className="ml-16 pl-4 border-l-2 border-gray-700">
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {service.description}
                    </p>
                    
                    {/* Features list */}
                    <ul className="text-gray-400 text-sm space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <span className="text-green-400">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Separator */}
                  {index < services.length - 1 && (
                    <div className="border-b border-gray-700 mt-6"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
