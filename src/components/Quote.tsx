'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Quote() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const [projectDescription, setProjectDescription] = useState('');
  const [email, setEmail] = useState('');

  // Calculate lines and characters
  const lines = projectDescription.split('\n').length;
  const characters = projectDescription.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validáció
      if (!email.trim() || !projectDescription.trim()) {
        toast.error('Kérjük töltsd ki mindkét mezőt!');
        return;
      }

      // API hívás a saját backend endpoint-ra
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          projectDescription: projectDescription.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Email sikeresen elküldve:', data);
        toast.success(t('quote.success'));
        
        // Form reset
        setEmail('');
        setProjectDescription('');
      } else {
        throw new Error(data.error || 'Ismeretlen hiba történt');
      }
      
    } catch (error) {
      console.error('Email küldési hiba:', error);
      toast.error(t('quote.error'));
    }
  };

  // Handle keyboard shortcuts for sending
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter vagy Shift+Enter = küldés
    if ((e.ctrlKey || e.shiftKey) && e.key === 'Enter') {
      e.preventDefault();
      
      // Ellenőrizzük hogy van-e email és projekt leírás
      if (email.trim() && projectDescription.trim()) {
        const form = e.currentTarget.form;
        if (form) {
          // Create a synthetic submit event
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
          Object.defineProperty(submitEvent, 'target', {
            writable: false,
            value: form,
          });
          handleSubmit(submitEvent as unknown as React.FormEvent);
        }
      } else {
        toast.error('Kérjük töltsd ki az email címet és a projekt leírást!');
      }
    }
  };

  const copyPhoneNumber = () => {
    const phoneNumber = '+36206621348';
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(phoneNumber).then(() => {
        toast.success(t('quote.phone_copied'));
      }).catch((err) => {
        console.error('Másolás sikertelen:', err);
        fallbackCopyToClipboard(phoneNumber);
      });
    } else {
      fallbackCopyToClipboard(phoneNumber);
    }
  };

  const copyEmail = () => {
    const email = 'info@codexa.hu';
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        toast.success(t('quote.email_copied'));
      }).catch((err) => {
        console.error('Email másolás sikertelen:', err);
        fallbackCopyToClipboard(email);
      });
    } else {
      fallbackCopyToClipboard(email);
    }
  };

  // Fallback copy method for older browsers or non-secure contexts
  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success(text.includes('@') ? t('quote.email_copied') : t('quote.phone_copied'));
    } catch (err) {
      console.error('Fallback másolás sikertelen:', err);
      toast.error(text.includes('@') ? t('quote.email_copy_error') : t('quote.phone_copy_error'));
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <section className="py-20 bg-[#0d1117] relative overflow-hidden" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            {t('quote.title')}
          </h2>
          
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            {t('quote.subtitle')}
          </p>
          
          {/* Terminal-style form */}
          <div className={`bg-gray-800 rounded-lg border border-gray-700 p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto mb-6 sm:mb-8 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-700 ${isVisible ? 'scroll-slide-right scroll-visible' : 'scroll-slide-right'}`} style={{ transitionDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 ml-2 sm:ml-4 text-xs sm:text-sm font-mono truncate">project-request.txt</span>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="text-left">
                <div className="font-mono text-gray-400 text-xs sm:text-sm mb-2 break-words">
                  $ describe-your-project --format=text
                </div>
                
                {/* Email input */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900 text-gray-300 font-mono text-sm p-3 sm:p-4 rounded border border-gray-600 focus:border-blue-500 focus:outline-none mb-4"
                  placeholder={t('quote.email_placeholder')}
                  required
                />
                
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-gray-900 text-gray-300 font-mono text-sm p-3 sm:p-4 rounded border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                  rows={6}
                  placeholder={t('quote.project_placeholder')}
                  required
                ></textarea>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3">
                  <div className="text-gray-500 font-mono text-xs order-2 sm:order-1">
                    <div>{t('quote.lines')}: {lines} | {t('quote.characters')}: {characters}</div>
                    <div className="mt-1 text-gray-600 hidden sm:block">{t('quote.keyboard_shortcut')}</div>
                  </div>
                  <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-mono font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded transition-all duration-300 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto order-1 sm:order-2"
                  >
                    {t('quote.send')}
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Alternative contact methods */}
          <div className="text-center px-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                onClick={copyEmail}
                className="text-blue-400 hover:text-blue-300 font-mono transition-colors duration-300 cursor-pointer hover:underline text-sm sm:text-base break-all"
                title={t('quote.click_to_copy_email')}
              >
                info@codexa.hu
              </button>
              <span className="text-gray-600 hidden sm:block">|</span>
              <button
                onClick={copyPhoneNumber}
                className="text-blue-400 hover:text-blue-300 font-mono transition-colors duration-300 cursor-pointer hover:underline text-sm sm:text-base"
                title={t('quote.click_to_copy_phone')}
              >
                +36 20 662 1348
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
