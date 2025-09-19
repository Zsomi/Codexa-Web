'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { smoothScrollToSection } from '@/utils/scrollUtils';
import { useState, useEffect } from 'react';

export default function Hero() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16" ref={ref}>
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"></div>
      
        {/* Particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {isClient && Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Main Message */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <span className="text-blue-400">{t('hero.title').split(' ').slice(0, 2).join(' ')}</span>
            <br className="hidden sm:block" />
            <span className="text-white"> {t('hero.title').split(' ').slice(2).join(' ')}</span>
          </h1>
          
          <p className={`text-xl sm:text-2xl md:text-3xl text-blue-200 font-medium mb-8 transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>
          
          <p className={`text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} style={{ animationDelay: '0.4s' }}>
            {t('hero.description')}
          </p>
        </div>
        
        {/* Call to Action */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} style={{ animationDelay: '0.6s' }}>
                      <button 
            onClick={() => smoothScrollToSection('contact')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transform mb-4"
          >
            <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {t('hero.cta')}
          </button>
          
          <div className="mt-4">
            <button 
              onClick={() => smoothScrollToSection('services')}
              className="text-blue-300 hover:text-blue-200 font-medium text-lg underline decoration-2 underline-offset-4 hover:no-underline transition-all duration-300"
            >
              {t('hero.learn_more')}
            </button>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} style={{ animationDelay: '0.8s' }}>
          <div className={`p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 group ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} style={{ animationDelay: '0.9s' }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors duration-300">
                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-blue-400 font-bold text-xl mb-3 text-center">{t('hero.trust.fast.title')}</h3>
            <p className="text-gray-300 text-center leading-relaxed">{t('hero.trust.fast.description')}</p>
          </div>
          
          <div className={`p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 group ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} style={{ animationDelay: '1.0s' }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 5a5 5 0 0 0 4.027 4.905 6.5 6.5 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05q-.001-.07.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.5 3.5 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98q-.004.07-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5m16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0m-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-blue-400 font-bold text-xl mb-3 text-center">{t('hero.trust.pricing.title')}</h3>
            <p className="text-gray-300 text-center leading-relaxed">{t('hero.trust.pricing.description')}</p>
          </div>
          
          <div className={`p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 group ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`} style={{ animationDelay: '1.1s' }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors duration-300">
                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h3 className="text-blue-400 font-bold text-xl mb-3 text-center">{t('hero.trust.support.title')}</h3>
            <p className="text-gray-300 text-center leading-relaxed">{t('hero.trust.support.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
