import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
      title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === 'ar' ? 'EN' : 'عربي'}
      </span>
    </button>
  );
};

export default LanguageToggle;