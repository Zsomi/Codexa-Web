'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';
import Cookies from 'js-cookie';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('hu');

  // Get nested translation value
  const getTranslation = (key: string, lang: Language): string => {
    const keys = key.split('.');
    let value: unknown = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    Cookies.set('language', lang, { expires: 365 });
  };

  // Detect language on mount
  useEffect(() => {
    const detectLanguage = async () => {
      // First check if user has set a preference
      const savedLanguage = Cookies.get('language') as Language;
      if (savedLanguage && (savedLanguage === 'hu' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
        return;
      }

      try {
        // Get user's IP and country
        const response = await fetch('/api/detect-country');
        if (response.ok) {
          const data = await response.json();
          const detectedLanguage = data.country === 'HU' ? 'hu' : 'en';
          setLanguageState(detectedLanguage);
          Cookies.set('language', detectedLanguage, { expires: 365 });
        } else {
          // Fallback to browser language
          const browserLang = navigator.language.toLowerCase();
          const detectedLanguage = browserLang.startsWith('hu') ? 'hu' : 'en';
          setLanguageState(detectedLanguage);
        }
      } catch (error) {
        console.error('Language detection failed:', error);
        // Fallback to Hungarian
        setLanguageState('hu');
      }
    };

    detectLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
