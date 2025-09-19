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
    <section className="py-20 bg-gradient-to-b from-black to-gray-900" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {t('portfolio.title')}
          </span>
        </h2>
        
        <p className={`text-gray-300 text-lg text-center mb-12 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          {t('portfolio.subtitle')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-items-center">
          {portfolioProjects.map((project, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 group backdrop-blur-sm ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}
              style={{ 
                animationDelay: `${index * 0.2 + 0.3}s`,
                transitionDelay: `${index * 0.1 + 0.3}s`
              }}
            >
              {/* Project header */}
              <div className="p-4 border-b border-blue-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="font-bold text-white">
                    {project.name}
                  </span>
                </div>
              </div>
              
              {/* Project preview */}
              <div className={`h-40 ${project.hasImage ? 'bg-gray-900/50 p-4' : `bg-gradient-to-br ${project.bgColor}`} flex items-center justify-center`}>
                {project.hasImage ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={300}
                    height={160}
                    className="w-full h-full object-cover rounded-lg"
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
                      className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-medium border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action button */}
                <div className="w-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 font-medium text-sm py-2 px-4 rounded-lg transition-colors duration-300 block text-center cursor-default border border-blue-500/30">
                  {t('portfolio.view_demo')} →
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all projects button */}
        <div className="text-center mt-12">
          <button className="border border-blue-500/50 hover:border-blue-400 text-gray-300 hover:text-blue-400 font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:bg-blue-500/10">
            {t('portfolio.view_all')}
          </button>
        </div>
      </div>
    </section>
  );
}
