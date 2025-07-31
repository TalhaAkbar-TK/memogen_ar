import React from 'react';
import { BarChart3, FileText, MessageSquare, List, Settings, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import MODLogo from './MODLogo';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: BarChart3 },
    { id: 'form', label: t('nav.createMemo'), icon: FileText },
    { id: 'prompt', label: t('nav.aiGenerator'), icon: MessageSquare },
    { id: 'list', label: t('nav.memoList'), icon: List },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
            <MODLogo className="w-10 h-10 text-green-400" />
            <div>
              <h1 className="text-white font-bold text-lg">
                {language === 'ar' ? 'مولد المذكرات' : 'MemoGen'}
              </h1>
              <p className="text-slate-400 text-xs">{t('nav.ministry')}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-1`}>
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
            <LanguageToggle />
            <div className="text-right">
              <p className="text-white text-sm font-medium">{t('nav.adminUser')}</p>
              <p className="text-slate-400 text-xs">
                {language === 'ar' ? 'مستخدم النظام' : 'System User'}
              </p>
            </div>
            <button className="text-slate-400 hover:text-white transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;