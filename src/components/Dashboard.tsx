import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, Users, TrendingUp, Clock, Archive, Send, Edit3, Activity } from 'lucide-react';
import { getStats } from '../data/mockDatabase';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const stats = getStats();

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const StatCard = ({ icon: Icon, title, titleAr, value, change, color }: {
    icon: React.ElementType;
    title: string;
    titleAr: string;
    value: number;
    change?: string;
    color: string;
  }) => (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors">
      <div className="flex items-center justify-between">
        <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">{language === 'ar' ? titleAr : title}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{value}</p>
          {change && (
            <p className="text-green-400 text-sm">
              {change} {t('common.fromLastMonth')}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">{t('dashboard.title')}</h1>
          <p className="text-slate-500 text-sm">{t('dashboard.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FileText}
            title={t('dashboard.totalMemos')}
            titleAr="إجمالي المذكرات"
            value={stats.totalMemos}
            change="+12%"
            color="bg-blue-600"
          />
          <StatCard
            icon={TrendingUp}
            title={t('dashboard.thisMonth')}
            titleAr="هذا الشهر"
            value={stats.memosThisMonth}
            change="+8%"
            color="bg-green-600"
          />
          <StatCard
            icon={Clock}
            title={t('dashboard.draftMemos')}
            titleAr="المذكرات المسودة"
            value={stats.draftMemos}
            color="bg-yellow-600"
          />
          <StatCard
            icon={Send}
            title={t('dashboard.sentMemos')}
            titleAr="المذكرات المرسلة"
            value={stats.sentMemos}
            color="bg-purple-600"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trends */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">{t('dashboard.monthlyTrends')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">{t('dashboard.categoryDistribution')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.topCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, categoryAr, percent }) => `${language === 'ar' ? categoryAr : category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {stats.topCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Creators */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">{t('dashboard.topCreators')}</h3>
            <div className="space-y-4">
              {stats.topCreators.map((creator, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {language === 'ar' ? creator.nameAr : creator.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-400">{creator.count}</p>
                    <p className="text-slate-500 text-sm">{t('dashboard.memos')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">{t('dashboard.recentActivity')}</h3>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3 p-4 bg-slate-700 rounded-lg`}>
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-medium">
                        {language === 'ar' ? activity.userAr : activity.user}
                      </span>{' '}
                      {language === 'ar' ? activity.actionAr : activity.action.toLowerCase()}{' '}
                      <span className="text-blue-400">
                        {language === 'ar' ? activity.memoAr : activity.memo}
                      </span>
                    </p>
                    <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;