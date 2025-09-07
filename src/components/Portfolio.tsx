'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

export default function Portfolio() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  const portfolioProjects = [
    {
      name: t('portfolio.hexory_store.name'),
      description: t('portfolio.hexory_store.description'),
      tech: ['Laravel', 'Next.js'],
      image: '/images/hexorystore.png',
      bgColor: 'from-blue-600 to-purple-600',
      hasImage: true
    },
    {
      name: t('portfolio.party_zona.name'),
      description: t('portfolio.party_zona.description'),
      tech: ['Angular', 'Laravel'],
      image: '/images/pandt.png',
      bgColor: 'from-green-600 to-blue-600',
      hasImage: true
    }
    // {
    //   name: t('portfolio.bull_rugs.name'),
    //   description: t('portfolio.bull_rugs.description'),
    //   tech: ['Angular', 'Laravel'],
    //   image: '🏠',
    //   bgColor: 'from-purple-600 to-pink-600',
    //   hasImage: false
    // }
  ];

  return (
    <section className="py-20 bg-[#0d1117]" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className={`font-mono text-3xl md:text-4xl font-bold text-white mb-12 text-center transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          {t('portfolio.title')}
        </h2>
        
        <p className={`text-gray-300 text-lg text-center mb-12 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          {t('portfolio.subtitle')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-items-center">
          {portfolioProjects.map((project, index) => (
            <div
              key={index}
              className={`bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 group ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}
              style={{ 
                animationDelay: `${index * 0.2 + 0.3}s`,
                transitionDelay: `${index * 0.1 + 0.3}s`
              }}
            >
              {/* Project header like GitHub repo */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="font-mono text-white font-semibold">
                    {project.name}
                  </span>
                </div>
              </div>
              
              {/* Project preview */}
              <div className={`h-40 ${project.hasImage ? 'bg-gray-900 p-4' : `bg-gradient-to-br ${project.bgColor}`} flex items-center justify-center`}>
                {project.hasImage ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={300}
                    height={160}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-6xl">{project.image}</span>
                )}
              </div>
              
              {/* Project details */}
              <div className="p-4">
                <p className="text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                
                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action button */}
                <div className="w-full bg-gray-700 text-white font-mono text-sm py-2 px-4 rounded transition-colors duration-300 block text-center cursor-default">
                  {t('portfolio.view_demo')} →
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all projects button */}
        <div className="text-center mt-12">
          <button className="border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white font-mono font-semibold px-8 py-3 rounded-lg transition-all duration-300">
            {t('portfolio.view_all')}
          </button>
        </div>
      </div>
    </section>
  );
}
