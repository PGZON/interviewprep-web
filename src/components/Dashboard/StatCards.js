import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiTarget, 
  FiStar, 
  FiAlertTriangle,
  FiCheckCircle,
  FiClock
} from 'react-icons/fi';

const StatCards = ({ stats }) => {
  // Debug logging
  console.log('🔍 StatCards - Received stats:', stats);
  
  // TEMPORARY: Test with hardcoded data to verify UI works
  const testStats = {
    totalTests: 5,
    averageScore: 85.2,
    strongestTopic: 'React',
    weakestTopic: 'Node.js',
    totalTimeSpent: 3600, // 60 minutes
    completionRate: 80.0
  };
  
  const defaultStats = {
    totalTests: 0,
    averageScore: 0,
    strongestTopic: 'N/A',
    weakestTopic: 'N/A',
    totalTimeSpent: 0,
    completionRate: 0
  };

  // Use test stats for now, then real stats when available
  const useTestData = process.env.NODE_ENV === 'development';
  const currentStats = useTestData ? testStats : { ...defaultStats, ...stats };
  
  console.log('🔍 StatCards - Current stats after merge:', currentStats);
  console.log('🔍 StatCards - Using test data:', useTestData);

  const statItems = [
    {
      title: 'Total Tests',
      value: currentStats.totalTests || 'No tests yet',
      icon: FiTarget,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Average Score',
      value: currentStats.totalTests > 0 ? `${currentStats.averageScore.toFixed(1)}%` : 'Start testing!',
      icon: FiTrendingUp,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      iconColor: 'text-green-500'
    },
    {
      title: 'Strongest Topic',
      value: currentStats.strongestTopic !== 'N/A' ? currentStats.strongestTopic : 'Take tests to discover',
      icon: FiStar,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      iconColor: 'text-yellow-500'
    },
    {
      title: 'Weakest Topic',
      value: currentStats.weakestTopic !== 'N/A' ? currentStats.weakestTopic : 'No weak areas yet',
      icon: FiAlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      iconColor: 'text-red-500'
    },
    {
      title: 'Completion Rate',
      value: currentStats.totalTests > 0 ? `${currentStats.completionRate.toFixed(1)}%` : '0%',
      icon: FiCheckCircle,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      iconColor: 'text-purple-500'
    },
    {
      title: 'Time Spent',
      value: currentStats.totalTimeSpent > 0 ? `${Math.round(currentStats.totalTimeSpent / 60)}m` : '0m',
      icon: FiClock,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      iconColor: 'text-indigo-500'
    }
  ];

  // Show a helpful message when no real data is available
  const hasNoData = !stats || (stats.totalTests === 0 && stats.averageScore === 0);
  
  return (
    <div className="space-y-4">
      {hasNoData && !useTestData && (
        <div className="bg-blue-50/80 backdrop-blur-md rounded-xl p-6 border border-blue-200 text-center">
          <div className="flex items-center justify-center mb-3">
            <FiTarget className="text-blue-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold text-blue-800">No Stats Available Yet</h3>
          </div>
          <p className="text-blue-600">
            Start taking tests to track your progress and see detailed statistics!
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={stat.iconColor} size={24} />
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-full text-xs font-medium ${stat.bgColor} ${stat.textColor}`}
            >
              {stat.color}
            </motion.div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className={`text-2xl font-bold ${stat.textColor}`}>
              {stat.value}
            </p>
          </div>

          {/* Optional trend indicator */}
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <FiTrendingUp className="mr-1" size={12} />
            <span>vs last month</span>
          </div>
        </motion.div>
      ))}
      </div>
    </div>
  );
};

export default StatCards;
