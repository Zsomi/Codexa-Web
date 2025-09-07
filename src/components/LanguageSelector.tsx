'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

// SVG Flag Components
const HungarianFlag = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="5" fill="#CE2939"/>
    <rect y="5" width="20" height="5" fill="#FFFFFF"/>
    <rect y="10" width="20" height="5" fill="#436F4D"/>
  </svg>
);

const AmericanFlag = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
    {/* Red and white stripes */}
    <rect width="20" height="15" fill="#B22234"/>
    <rect y="1.15" width="20" height="1.15" fill="#FFFFFF"/>
    <rect y="3.46" width="20" height="1.15" fill="#FFFFFF"/>
    <rect y="5.77" width="20" height="1.15" fill="#FFFFFF"/>
    <rect y="8.08" width="20" height="1.15" fill="#FFFFFF"/>
    <rect y="10.38" width="20" height="1.15" fill="#FFFFFF"/>
    <rect y="12.69" width="20" height="1.15" fill="#FFFFFF"/>
    
    {/* Blue canton */}
    <rect width="8" height="7.5" fill="#3C3B6E"/>
    
    {/* Stars (simplified - showing key stars) */}
    <circle cx="1.5" cy="1" r="0.3" fill="#FFFFFF"/>
    <circle cx="3" cy="1" r="0.3" fill="#FFFFFF"/>
    <circle cx="4.5" cy="1" r="0.3" fill="#FFFFFF"/>
    <circle cx="6" cy="1" r="0.3" fill="#FFFFFF"/>
    <circle cx="7.5" cy="1" r="0.3" fill="#FFFFFF"/>
    
    <circle cx="2.25" cy="2" r="0.3" fill="#FFFFFF"/>
    <circle cx="3.75" cy="2" r="0.3" fill="#FFFFFF"/>
    <circle cx="5.25" cy="2" r="0.3" fill="#FFFFFF"/>
    <circle cx="6.75" cy="2" r="0.3" fill="#FFFFFF"/>
    
    <circle cx="1.5" cy="3" r="0.3" fill="#FFFFFF"/>
    <circle cx="3" cy="3" r="0.3" fill="#FFFFFF"/>
    <circle cx="4.5" cy="3" r="0.3" fill="#FFFFFF"/>
    <circle cx="6" cy="3" r="0.3" fill="#FFFFFF"/>
    <circle cx="7.5" cy="3" r="0.3" fill="#FFFFFF"/>
    
    <circle cx="2.25" cy="4" r="0.3" fill="#FFFFFF"/>
    <circle cx="3.75" cy="4" r="0.3" fill="#FFFFFF"/>
    <circle cx="5.25" cy="4" r="0.3" fill="#FFFFFF"/>
    <circle cx="6.75" cy="4" r="0.3" fill="#FFFFFF"/>
    
    <circle cx="1.5" cy="5" r="0.3" fill="#FFFFFF"/>
    <circle cx="3" cy="5" r="0.3" fill="#FFFFFF"/>
    <circle cx="4.5" cy="5" r="0.3" fill="#FFFFFF"/>
    <circle cx="6" cy="5" r="0.3" fill="#FFFFFF"/>
    <circle cx="7.5" cy="5" r="0.3" fill="#FFFFFF"/>
    
    <circle cx="2.25" cy="6" r="0.3" fill="#FFFFFF"/>
    <circle cx="3.75" cy="6" r="0.3" fill="#FFFFFF"/>
    <circle cx="5.25" cy="6" r="0.3" fill="#FFFFFF"/>
    <circle cx="6.75" cy="6" r="0.3" fill="#FFFFFF"/>
  </svg>
);

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'hu' as Language, label: 'Magyar', flag: <HungarianFlag /> },
    { code: 'en' as Language, label: 'English', flag: <AmericanFlag /> }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white font-mono text-sm transition-all duration-300 border border-gray-600 hover:border-gray-500"
      >
        <span className="flex-shrink-0">{currentLanguage?.flag}</span>
        <span className="hidden sm:block">{currentLanguage?.label}</span>
        <span className="sm:hidden">{currentLanguage?.code.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[120px] bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                w-full flex items-center gap-2 px-3 py-2 text-left font-mono text-sm transition-all duration-200
                ${language === lang.code 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
                ${lang.code === languages[0].code ? 'rounded-t-md' : ''}
                ${lang.code === languages[languages.length - 1].code ? 'rounded-b-md' : ''}
              `}
            >
              <span className="flex-shrink-0">{lang.flag}</span>
              <span className="hidden sm:block">{lang.label}</span>
              <span className="sm:hidden">{lang.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
