import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiHelpCircle, 
  FiTrendingUp,
  FiClock,
  FiActivity,
  FiTarget,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';

const AdminStatsCards = ({ stats = {}, loading = false }) => {
  // Default stats structure
  const defaultStats = {
    totalUsers: 0,
    totalQuestions: 0,
    totalTests: 0,
    avgScore: 0,
    activeUsers: 0,
    questionsToday: 0,
    systemHealth: 100,
    pendingReviews: 0,
    ...stats
  };

  const statsCards = [
    {
      id: 'users',
      title: 'Total Users',
      value: defaultStats.totalUsers,
      icon: FiUsers,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12%',
      changeType: 'positive'
    },
    {
      id: 'questions',
      title: 'Total Questions',
      value: defaultStats.totalQuestions,
      icon: FiHelpCircle,
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+8%',
      changeType: 'positive'
    },
    {
      id: 'tests',
      title: 'Tests Completed',
      value: defaultStats.totalTests,
      icon: FiCheckCircle,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+15%',
      changeType: 'positive'
    },
    {
      id: 'avgScore',
      title: 'Avg Score',
      value: `${defaultStats.avgScore}%`,
      icon: FiTarget,
      gradient: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      change: '+3%',
      changeType: 'positive'
    },
    {
      id: 'activeUsers',
      title: 'Active Users',
      value: defaultStats.activeUsers,
      icon: FiActivity,
      gradient: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      change: '+7%',
      changeType: 'positive'
    },
    {
      id: 'questionsToday',
      title: 'Questions Today',
      value: defaultStats.questionsToday,
      icon: FiClock,
      gradient: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      change: '+25%',
      changeType: 'positive'
    },
    {
      id: 'systemHealth',
      title: 'System Health',
      value: `${defaultStats.systemHealth}%`,
      icon: FiTrendingUp,
      gradient: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      change: '100%',
      changeType: 'positive'
    },
    {
      id: 'pendingReviews',
      title: 'Pending Reviews',
      value: defaultStats.pendingReviews,
      icon: FiAlertCircle,
      gradient: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      change: '-5%',
      changeType: 'negative'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon size={24} className={card.textColor} />
            </div>
            <div className={`text-xs px-2 py-1 rounded-full font-medium ${
              card.changeType === 'positive' 
                ? 'text-green-600 bg-green-50' 
                : 'text-red-600 bg-red-50'
            }`}>
              {card.change}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
          </div>

          {/* Mini progress bar for visual appeal */}
          <div className="mt-4 relative">
            <div className="w-full bg-gray-100 rounded-full h-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                className={`h-1 rounded-full bg-gradient-to-r ${card.gradient}`}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminStatsCards;
