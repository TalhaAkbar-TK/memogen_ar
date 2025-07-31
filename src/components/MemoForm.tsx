import React, { useState, useEffect } from 'react';
import { Search, User, FileText, Calendar, Tag, Save, Send, X } from 'lucide-react';
import { Officer, MemoCategory, Memo } from '../types/memo';
import { findOfficerByName, memoCategories, getNextMemoNumber, saveMemo } from '../data/mockDatabase';

interface MemoFormProps {
  onSave?: (memo: Memo) => void;
  onCancel?: () => void;
}

const MemoForm: React.FC<MemoFormProps> = ({ onSave, onCancel }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MemoCategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [additionalFields, setAdditionalFields] = useState<Record<string, string>>({});
  const [memoContent, setMemoContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOfficerSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 2) {
      const officer = findOfficerByName(term);
      if (officer) {
        setSelectedOfficer(officer);
      }
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    const category = memoCategories.find(cat => cat.id === categoryId);
    setSelectedCategory(category || null);
    setSelectedSubcategory('');
    setAdditionalFields({});
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    setAdditionalFields({});
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setAdditionalFields(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const generateMemoContent = async () => {
    if (!selectedOfficer || !selectedCategory || !selectedSubcategory) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to generate content
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const subcategory = selectedCategory.subcategories.find(sub => sub.id === selectedSubcategory);
    const currentDate = new Date().toLocaleDateString('ar-SA');
    const hijriDate = new Date().toLocaleDateString('ar-SA-islamic');
    
    const content = `
بسم الله الرحمن الرحيم

وزارة الدفاع
إدارة الموارد البشرية

المذكرة رقم: ${getNextMemoNumber()}
التاريخ: ${hijriDate} هـ الموافق ${currentDate} م

الموضوع: ${selectedCategory.nameAr} - ${subcategory?.nameAr}

السيد/ ${selectedOfficer.rankAr} ${selectedOfficer.nameAr}
رقم الهوية العسكرية: ${selectedOfficer.employeeId}
الوحدة: ${selectedOfficer.unitAr}

المحترم،

تحية طيبة وبعد،

يسرني أن أبلغكم بأنه تم ${selectedCategory.nameAr} ${subcategory?.nameAr} وفقاً للتفاصيل التالية:

${Object.entries(additionalFields).map(([key, value]) => {
  const field = subcategory?.fields.find(f => f.name === key);
  return `- ${field?.nameAr || key}: ${value}`;
}).join('\n')}

نرجو منكم التكرم بالاطلاع على هذه المذكرة والعمل بموجبها.

وتفضلوا بقبول فائق الاحترام والتقدير.

${selectedOfficer.rankAr}/ ${selectedOfficer.nameAr}
مدير الموارد البشرية

__________________________
[ توقيع المدير ]

[ ختم رسمي ]
`;

    setMemoContent(content);
    setIsLoading(false);
  };

  const handleSave = async (status: 'draft' | 'sent') => {
    if (!selectedOfficer || !selectedCategory || !selectedSubcategory) {
      return;
    }

    const subcategory = selectedCategory.subcategories.find(sub => sub.id === selectedSubcategory);
    const memo = {
      number: getNextMemoNumber(),
      title: `${selectedCategory.name} - ${subcategory?.name}`,
      titleAr: `${selectedCategory.nameAr} - ${subcategory?.nameAr}`,
      content: memoContent,
      contentAr: memoContent,
      category: selectedCategory.id,
      categoryAr: selectedCategory.nameAr,
      subcategory: selectedSubcategory,
      subcategoryAr: subcategory?.nameAr || '',
      createdBy: 'Current User',
      createdByAr: 'المستخدم الحالي',
      createdFor: selectedOfficer.name,
      createdForAr: selectedOfficer.nameAr,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      status,
      priority: 'medium' as const,
      additionalFields
    };

    const savedMemo = saveMemo(memo);
    onSave?.(savedMemo);
  };

  const selectedSubcategoryData = selectedCategory?.subcategories.find(sub => sub.id === selectedSubcategory);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Create New Memo</h1>
              <p className="text-slate-400">إنشاء مذكرة جديدة</p>
            </div>
            {onCancel && (
              <button
                onClick={onCancel}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Officer Search */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Officer Information
              </h3>
              <p className="text-slate-400 text-sm mb-4">معلومات الضابط</p>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or employee ID..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => handleOfficerSearch(e.target.value)}
                />
              </div>

              {selectedOfficer && (
                <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{selectedOfficer.name}</p>
                      <p className="text-slate-400 text-sm">{selectedOfficer.nameAr}</p>
                      <p className="text-slate-500 text-xs">{selectedOfficer.rank} - {selectedOfficer.department}</p>
                      <p className="text-slate-500 text-xs">{selectedOfficer.employeeId}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Memo Category
              </h3>
              <p className="text-slate-400 text-sm mb-4">فئة المذكرة</p>
              
              <div className="grid grid-cols-1 gap-4">
                <select
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory?.id || ''}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">Select Category / اختر الفئة</option>
                  {memoCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} - {category.nameAr}
                    </option>
                  ))}
                </select>

                {selectedCategory && (
                  <select
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedSubcategory}
                    onChange={(e) => handleSubcategoryChange(e.target.value)}
                  >
                    <option value="">Select Subcategory / اختر الفئة الفرعية</option>
                    {selectedCategory.subcategories.map(sub => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name} - {sub.nameAr}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Additional Fields */}
            {selectedSubcategoryData && (
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Additional Information
                </h3>
                <p className="text-slate-400 text-sm mb-4">معلومات إضافية</p>
                
                <div className="space-y-4">
                  {selectedSubcategoryData.fields.map(field => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {field.name} - {field.nameAr}
                        {field.required && <span className="text-red-400 ml-1">*</span>}
                      </label>
                      
                      {field.type === 'select' ? (
                        <select
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={additionalFields[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          required={field.required}
                        >
                          <option value="">Select {field.name}</option>
                          {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={additionalFields[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={generateMemoContent}
                  disabled={!selectedOfficer || !selectedCategory || !selectedSubcategory || isLoading}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5 mr-2" />
                      Generate Memo
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Memo Preview</h3>
            <p className="text-slate-400 text-sm mb-4">معاينة المذكرة</p>
            
            <div className="bg-slate-700 rounded-lg p-4 min-h-[400px] border border-slate-600">
              {memoContent ? (
                <div className="text-right" dir="rtl">
                  <textarea
                    value={memoContent}
                    onChange={(e) => setMemoContent(e.target.value)}
                    className="w-full h-96 bg-transparent text-white text-sm resize-none focus:outline-none"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Generated memo will appear here</p>
                    <p className="text-sm">المذكرة المُنشأة ستظهر هنا</p>
                  </div>
                </div>
              )}
            </div>

            {memoContent && (
              <div className="flex space-x-4 rtl:space-x-reverse mt-6">
                <button
                  onClick={() => handleSave('draft')}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save as Draft
                </button>
                <button
                  onClick={() => handleSave('sent')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Memo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoForm;