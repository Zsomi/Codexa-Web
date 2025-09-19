'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

// Ikonok
const SunIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SystemIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { 
      value: 'light' as const, 
      label: t('theme.light'), 
      icon: <SunIcon /> 
    },
    { 
      value: 'dark' as const, 
      label: t('theme.dark'), 
      icon: <MoonIcon /> 
    },
    { 
      value: 'system' as const, 
      label: t('theme.system'), 
      icon: <SystemIcon /> 
    }
  ];

  const currentTheme = themes.find(t => t.value === theme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-300 hover:text-blue-400 bg-gray-800/80 hover:bg-blue-500/10 border border-blue-500/30 hover:border-blue-400 rounded-md transition-all duration-300 backdrop-blur-sm min-w-[120px]"
        aria-label="Theme selector"
      >
        <span className="text-blue-400 w-5 h-5">{currentTheme?.icon}</span>
        <span className="hidden sm:inline">{currentTheme?.label}</span>
        <svg className="w-4 h-4 ml-auto text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-52 bg-gray-800/95 border border-blue-500/30 rounded-md shadow-xl backdrop-blur-sm z-50">
            <div className="py-2">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-left transition-colors duration-200
                    ${theme === themeOption.value 
                      ? 'bg-blue-500/20 text-blue-300 border-l-2 border-blue-400' 
                      : 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400'
                    }
                  `}
                >
                  <span className="text-blue-400 w-5 h-5">{themeOption.icon}</span>
                  {themeOption.label}
                  {theme === themeOption.value && (
                    <svg className="w-5 h-5 ml-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
