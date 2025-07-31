import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import MemoForm from './components/MemoForm';
import PromptMemo from './components/PromptMemo';
import MemoList from './components/MemoList';
import { Memo } from './types/memo';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notification, setNotification] = useState<string | null>(null);

  const handleMemoSave = (memo: Memo) => {
    setNotification(`Memo #${memo.number} saved successfully! / تم حفظ المذكرة رقم ${memo.number} بنجاح`);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleMemoEdit = (memo: Memo) => {
    // In a real app, this would open an edit form
    console.log('Edit memo:', memo);
    setActiveTab('form');
  };

  const handleMemoView = (memo: Memo) => {
    // In a real app, this would open a view modal
    console.log('View memo:', memo);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'form':
        return <MemoForm onSave={handleMemoSave} />;
      case 'prompt':
        return <PromptMemo onSave={handleMemoSave} />;
      case 'list':
        return <MemoList onEdit={handleMemoEdit} onView={handleMemoView} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-900">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md">
            <p className="text-sm font-medium">{notification}</p>
          </div>
        )}
        
        <main>
          {renderContent()}
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;