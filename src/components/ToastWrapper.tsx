'use client';

import { ToastContainer } from 'react-toastify';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

export default function ToastWrapper() {
  const { theme } = useTheme();
  const [toastTheme, setToastTheme] = useState<'light' | 'dark' | 'colored'>('dark');
  
  useEffect(() => {
    const getToastTheme = () => {
      if (theme === 'system') {
        // Rendszer téma esetén ellenőrizzük a media query-t
        if (typeof window !== 'undefined') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'dark';
      }
      return theme === 'dark' ? 'dark' : 'light';
    };
    
    setToastTheme(getToastTheme());
    
    // Figyeljük a rendszer téma változását
    if (theme === 'system' && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        setToastTheme(mediaQuery.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <ToastContainer 
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={toastTheme}
      toastClassName="!rounded-lg !shadow-lg"
      className="!top-20 !right-4"
    />
  );
}
