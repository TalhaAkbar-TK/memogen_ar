import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.createMemo': 'إنشاء مذكرة',
    'nav.aiGenerator': 'الذكاء الاصطناعي',
    'nav.memoList': 'قائمة المذكرات',
    'nav.settings': 'الإعدادات',
    'nav.adminUser': 'مستخدم النظام',
    'nav.ministry': 'وزارة الدفاع',
    
    // Dashboard
    'dashboard.title': 'لوحة التحليلات والإحصائيات',
    'dashboard.subtitle': 'نظام إدارة المذكرات - وزارة الدفاع',
    'dashboard.totalMemos': 'إجمالي المذكرات',
    'dashboard.thisMonth': 'هذا الشهر',
    'dashboard.draftMemos': 'المذكرات المسودة',
    'dashboard.sentMemos': 'المذكرات المرسلة',
    'dashboard.monthlyTrends': 'الاتجاهات الشهرية',
    'dashboard.categoryDistribution': 'توزيع الفئات',
    'dashboard.topCreators': 'أكثر المنشئين نشاطاً',
    'dashboard.recentActivity': 'النشاط الأخير',
    'dashboard.memos': 'مذكرات',
    
    // Memo Form
    'memoForm.title': 'إنشاء مذكرة جديدة',
    'memoForm.officerInfo': 'معلومات الضابط',
    'memoForm.searchPlaceholder': 'البحث بالاسم أو رقم الهوية العسكرية...',
    'memoForm.memoCategory': 'فئة المذكرة',
    'memoForm.selectCategory': 'اختر الفئة',
    'memoForm.selectSubcategory': 'اختر الفئة الفرعية',
    'memoForm.additionalInfo': 'معلومات إضافية',
    'memoForm.generateMemo': 'إنشاء المذكرة',
    'memoForm.memoPreview': 'معاينة المذكرة',
    'memoForm.generating': 'جاري الإنشاء...',
    'memoForm.saveAsDraft': 'حفظ كمسودة',
    'memoForm.sendMemo': 'إرسال المذكرة',
    'memoForm.previewText': 'المذكرة المُنشأة ستظهر هنا',
    
    // AI Generator
    'ai.title': 'مولد المذكرات بالذكاء الاصطناعي',
    'ai.describe': 'صف المذكرة التي تريد إنشاءها',
    'ai.placeholder': 'مثال: أريد إنشاء مذكرة منح إجازة سنوية للرائد أحمد محمد من تاريخ 15 يناير إلى 30 يناير...',
    'ai.examplePrompts': '💡 أمثلة على الاستعلامات:',
    'ai.generateWithAI': 'إنشاء المذكرة بالذكاء الاصطناعي',
    'ai.generatedMemo': 'المذكرة المُنشأة',
    'ai.generatingAI': 'جاري إنشاء المذكرة بالذكاء الاصطناعي...',
    'ai.previewText': 'المذكرة المُنشأة بالذكاء الاصطناعي ستظهر هنا',
    
    // Memo List
    'memoList.title': 'إدارة المذكرات',
    'memoList.totalMemos': 'إجمالي المذكرات',
    'memoList.searchPlaceholder': 'البحث في المذكرات...',
    'memoList.allStatus': 'جميع الحالات',
    'memoList.draft': 'مسودة',
    'memoList.sent': 'مرسلة',
    'memoList.archived': 'مؤرشفة',
    'memoList.allCategories': 'جميع الفئات',
    'memoList.results': 'النتائج',
    'memoList.view': 'عرض',
    'memoList.edit': 'تعديل',
    'memoList.noMemos': 'لم يتم العثور على مذكرات',
    
    // Common
    'common.select': 'اختر',
    'common.required': 'مطلوب',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.close': 'إغلاق',
    'common.copy': 'نسخ',
    'common.delete': 'حذف',
    'common.loading': 'جاري التحميل...',
    'common.success': 'تم بنجاح',
    'common.error': 'خطأ',
    'common.fromLastMonth': 'من الشهر الماضي',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.createMemo': 'Create Memo',
    'nav.aiGenerator': 'AI Generator',
    'nav.memoList': 'Memo List',
    'nav.settings': 'Settings',
    'nav.adminUser': 'Admin User',
    'nav.ministry': 'Ministry of Defense',
    
    // Dashboard
    'dashboard.title': 'Analytics Dashboard',
    'dashboard.subtitle': 'Ministry of Defense Memo Management System',
    'dashboard.totalMemos': 'Total Memos',
    'dashboard.thisMonth': 'This Month',
    'dashboard.draftMemos': 'Draft Memos',
    'dashboard.sentMemos': 'Sent Memos',
    'dashboard.monthlyTrends': 'Monthly Trends',
    'dashboard.categoryDistribution': 'Category Distribution',
    'dashboard.topCreators': 'Top Creators',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.memos': 'memos',
    
    // Memo Form
    'memoForm.title': 'Create New Memo',
    'memoForm.officerInfo': 'Officer Information',
    'memoForm.searchPlaceholder': 'Search by name or employee ID...',
    'memoForm.memoCategory': 'Memo Category',
    'memoForm.selectCategory': 'Select Category',
    'memoForm.selectSubcategory': 'Select Subcategory',
    'memoForm.additionalInfo': 'Additional Information',
    'memoForm.generateMemo': 'Generate Memo',
    'memoForm.memoPreview': 'Memo Preview',
    'memoForm.generating': 'Generating...',
    'memoForm.saveAsDraft': 'Save as Draft',
    'memoForm.sendMemo': 'Send Memo',
    'memoForm.previewText': 'Generated memo will appear here',
    
    // AI Generator
    'ai.title': 'AI Memo Generator',
    'ai.describe': 'Describe Your Memo',
    'ai.placeholder': 'Example: Create an annual leave memo for Major Ahmed Mohammed from January 15 to January 30...',
    'ai.examplePrompts': '💡 Example Prompts:',
    'ai.generateWithAI': 'Generate Memo with AI',
    'ai.generatedMemo': 'Generated Memo',
    'ai.generatingAI': 'Generating AI Memo...',
    'ai.previewText': 'AI generated memo will appear here',
    
    // Memo List
    'memoList.title': 'Memo Management',
    'memoList.totalMemos': 'Total Memos',
    'memoList.searchPlaceholder': 'Search memos...',
    'memoList.allStatus': 'All Status',
    'memoList.draft': 'Draft',
    'memoList.sent': 'Sent',
    'memoList.archived': 'Archived',
    'memoList.allCategories': 'All Categories',
    'memoList.results': 'Results',
    'memoList.view': 'View',
    'memoList.edit': 'Edit',
    'memoList.noMemos': 'No memos found',
    
    // Common
    'common.select': 'Select',
    'common.required': 'Required',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.copy': 'Copy',
    'common.delete': 'Delete',
    'common.loading': 'Loading...',
    'common.success': 'Success',
    'common.error': 'Error',
    'common.fromLastMonth': 'from last month',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};