import React, { useState } from 'react';
import { FileText, Edit3, Eye, Trash2, Filter, Search, Calendar, Tag, User } from 'lucide-react';
import { Memo } from '../types/memo';
import { getAllMemos } from '../data/mockDatabase';

interface MemoListProps {
  onEdit?: (memo: Memo) => void;
  onView?: (memo: Memo) => void;
}

const MemoList: React.FC<MemoListProps> = ({ onEdit, onView }) => {
  const [memos] = useState<Memo[]>(getAllMemos());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredMemos = memos.filter(memo => {
    const matchesSearch = memo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memo.titleAr.includes(searchTerm) ||
                         memo.createdFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memo.createdForAr.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || memo.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || memo.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-600';
      case 'sent': return 'bg-green-600';
      case 'archived': return 'bg-gray-600';
      default: return 'bg-blue-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  const categories = Array.from(new Set(memos.map(memo => memo.category)));

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Memo Management</h1>
              <p className="text-slate-400">إدارة المذكرات</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-400">{memos.length}</p>
              <p className="text-slate-400 text-sm">Total Memos</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search memos..."
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <select
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="archived">Archived</option>
            </select>

            {/* Category Filter */}
            <select
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-slate-700 rounded-lg px-4 py-3">
              <Filter className="w-5 h-5 text-slate-400 mr-2" />
              <span className="text-white">{filteredMemos.length} Results</span>
            </div>
          </div>
        </div>

        {/* Memos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMemos.map(memo => (
            <div key={memo.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm leading-tight">#{memo.number}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(memo.status)}`}>
                      {memo.status}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => onView?.(memo)}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit?.(memo)}
                    className="text-slate-400 hover:text-yellow-400 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="text-slate-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-white font-medium line-clamp-2">{memo.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-1">{memo.titleAr}</p>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                  <Tag className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{memo.categoryAr}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{memo.subcategoryAr}</span>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{memo.createdForAr}</span>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">{memo.createdDate}</span>
                  <span className="text-slate-500">•</span>
                  <span className={`font-medium ${getPriorityColor(memo.priority)}`}>
                    {memo.priority}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 rtl:space-x-reverse mt-4 pt-4 border-t border-slate-700">
                <button
                  onClick={() => onView?.(memo)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
                <button
                  onClick={() => onEdit?.(memo)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMemos.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No memos found</p>
            <p className="text-slate-500">لم يتم العثور على مذكرات</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoList;