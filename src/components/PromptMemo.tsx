import React, { useState } from 'react';
import { MessageSquare, Sparkles, Send, FileText, Save, Copy } from 'lucide-react';
import { Memo } from '../types/memo';
import { getNextMemoNumber, saveMemo } from '../data/mockDatabase';

interface PromptMemoProps {
  onSave?: (memo: Memo) => void;
}

const PromptMemo: React.FC<PromptMemoProps> = ({ onSave }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const currentDate = new Date().toLocaleDateString('ar-SA');
    const hijriDate = new Date().toLocaleDateString('ar-SA-islamic');
    
    const content = `
بسم الله الرحمن الرحيم

وزارة الدفاع
إدارة الموارد البشرية

المذكرة رقم: ${getNextMemoNumber()}
التاريخ: ${hijriDate} هـ الموافق ${currentDate} م

الموضوع: ${prompt}

${generateMemoBasedOnPrompt(prompt)}

وتفضلوا بقبول فائق الاحترام والتقدير.

مدير الموارد البشرية

__________________________
[ توقيع المدير ]

[ ختم رسمي ]
`;

    setGeneratedContent(content);
    setIsGenerating(false);
  };

  const generateMemoBasedOnPrompt = (userPrompt: string): string => {
    // Simple AI-like response generation based on prompt
    const lowerPrompt = userPrompt.toLowerCase();
    
    if (lowerPrompt.includes('إجازة') || lowerPrompt.includes('leave')) {
      return `المحترم،

تحية طيبة وبعد،

بناءً على طلبكم المتعلق بالإجازة، يسرني إفادتكم بأنه تم الموافقة على منح الإجازة المطلوبة وفقاً للقوانين واللوائح المعمول بها.

نرجو منكم التكرم بالاطلاع على هذه المذكرة والعمل بموجبها.`;
    }
    
    if (lowerPrompt.includes('نقل') || lowerPrompt.includes('transfer')) {
      return `المحترم،

تحية طيبة وبعد،

بناءً على المتطلبات الإدارية والتنظيمية، يسرني إفادتكم بأنه تم اتخاذ قرار النقل المطلوب وفقاً للقوانين واللوائح المعمول بها.

نرجو منكم التكرم بالاطلاع على هذه المذكرة والعمل بموجبها.`;
    }
    
    if (lowerPrompt.includes('ترقية') || lowerPrompt.includes('promotion')) {
      return `المحترم،

تحية طيبة وبعد،

يسرني أن أبلغكم بأنه تم الموافقة على ترقيتكم تقديراً لجهودكم المتميزة وأدائكم المثالي في الخدمة.

نرجو منكم التكرم بالاطلاع على هذه المذكرة والعمل بموجبها.`;
    }
    
    // Default response for other prompts
    return `المحترم،

تحية طيبة وبعد،

بناءً على طلبكم المتعلق بـ "${userPrompt}"، يسرني إفادتكم بأنه تم دراسة الموضوع واتخاذ الإجراءات اللازمة وفقاً للقوانين واللوائح المعمول بها.

نرجو منكم التكرم بالاطلاع على هذه المذكرة والعمل بموجبها.`;
  };

  const handleSave = async (status: 'draft' | 'sent') => {
    if (!generatedContent.trim()) return;

    const memo = {
      number: getNextMemoNumber(),
      title: `AI Generated Memo: ${prompt.substring(0, 50)}...`,
      titleAr: `مذكرة مُنشأة بالذكاء الاصطناعي: ${prompt.substring(0, 50)}...`,
      content: generatedContent,
      contentAr: generatedContent,
      category: 'ai-generated',
      categoryAr: 'مُنشأة بالذكاء الاصطناعي',
      subcategory: 'prompt-based',
      subcategoryAr: 'مبنية على الاستعلام',
      createdBy: 'Current User',
      createdByAr: 'المستخدم الحالي',
      createdFor: 'Various',
      createdForAr: 'متنوع',
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      status,
      priority: 'medium' as const,
      additionalFields: { prompt }
    };

    const savedMemo = saveMemo(memo);
    onSave?.(savedMemo);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <div className="flex items-center">
            <MessageSquare className="w-8 h-8 text-blue-400 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">AI Memo Generator</h1>
              <p className="text-slate-400">مولد المذكرات بالذكاء الاصطناعي</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prompt Input Section */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Describe Your Memo
            </h3>
            <p className="text-slate-400 text-sm mb-4">صف المذكرة التي تريد إنشاءها</p>
            
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="مثال: أريد إنشاء مذكرة منح إجازة سنوية للرائد أحمد محمد من تاريخ 15 يناير إلى 30 يناير..."
                className="w-full h-40 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                dir="rtl"
              />
              
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <h4 className="text-sm font-medium text-white mb-2">💡 Example Prompts:</h4>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>• "إنشاء مذكرة منح إجازة سنوية للعقيد أحمد الراشد مدة 15 يوم"</p>
                  <p>• "Create a transfer memo for Captain Mohammed to Training Division"</p>
                  <p>• "مذكرة ترقية النقيب خالد العتيبي إلى رتبة رائد"</p>
                  <p>• "Performance evaluation memo for Lieutenant Abdullah"</p>
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating AI Memo...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Memo with AI
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Content Section */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Generated Memo
              </h3>
              {generatedContent && (
                <button
                  onClick={copyToClipboard}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
              )}
            </div>
            <p className="text-slate-400 text-sm mb-4">المذكرة المُنشأة</p>
            
            <div className="bg-slate-700 rounded-lg p-4 min-h-[400px] border border-slate-600">
              {generatedContent ? (
                <div className="text-right" dir="rtl">
                  <textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="w-full h-96 bg-transparent text-white text-sm resize-none focus:outline-none"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>AI generated memo will appear here</p>
                    <p className="text-sm">المذكرة المُنشأة بالذكاء الاصطناعي ستظهر هنا</p>
                  </div>
                </div>
              )}
            </div>

            {generatedContent && (
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

export default PromptMemo;