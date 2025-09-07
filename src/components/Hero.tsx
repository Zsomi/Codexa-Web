'use client';

import Typewriter from './Typewriter';
import TerminalMockup from './TerminalMockup';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  
  // Smooth scroll to section with custom animation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const targetPosition = element.offsetTop - navbarHeight;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // 1.5 seconds for smooth scroll
      let start: number | null = null;

      function animation(currentTime: number) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      // Easing function for smooth animation (ease-in-out)
      function ease(t: number, b: number, c: number, d: number) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
  };
  
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-gray-800 border-opacity-30"></div>
          ))}
        </div>
      </div>
      
      {/* Code snippets background */}
      <div className="absolute top-10 left-10 text-gray-700 font-mono text-xs opacity-30">
        <div>{'function buildWebsite() {'}</div>
        <div>{'  return {modern: true};'}</div>
        <div>{'}'}</div>
      </div>
      
      <div className="absolute bottom-20 right-20 text-gray-700 font-mono text-xs opacity-30">
        <div>{'const tech = ['}</div>
        <div>{"  'React', 'Laravel'"}</div>
        <div>{'];'}</div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between z-10">
        {/* Left side - Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="text-gray-500">&gt;</span>{' '}
            <Typewriter 
              text={t('hero.title')}
              speed={50}
              delay={300}
            />
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-mono font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:shadow-xl hover:scale-105 animate-pulse"
            >
              {t('hero.cta')}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-mono font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              {t('hero.learn_more')}
            </button>
          </div>
        </div>

        {/* Right side - Mockup */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Animated Terminal Mockup */}
            <TerminalMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
