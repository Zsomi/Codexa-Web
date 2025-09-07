'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'react-toastify';

export default function Footer() {
  const { t } = useLanguage();
  
  const copyEmail = () => {
    const email = 'info@codexa.hu';
    navigator.clipboard.writeText(email).then(() => {
      toast.success(t('quote.email_copied'));
    }).catch((err) => {
      console.error('Email másolás sikertelen:', err);
      toast.error(t('quote.email_copy_error'));
    });
  };
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6 lg:px-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Company info */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="font-mono text-2xl font-bold text-white">
                Codexa
              </h3>
            </div>
            <p className="text-gray-400 font-mono text-sm">
              {t('footer.copyright')} | 
              <button
                onClick={copyEmail}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 ml-1"
                title={t('quote.click_to_copy_email')}
              >
                info@codexa.hu
              </button>
            </p>
          </div>
          
          {/* Right side - Social links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.facebook.com/zsombor.gubis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Bottom separator and additional info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center text-gray-500 text-sm font-mono">
            <span>
              {t('footer.created_by')}{' '}
              <a
                href="https://www.facebook.com/zsombor.gubis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors duration-300 underline decoration-dotted hover:decoration-solid"
              >
                Gubis Zsombor Dániel
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
