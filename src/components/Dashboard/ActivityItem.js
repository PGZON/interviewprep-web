import React from 'react';
import { motion } from 'framer-motion';

const ActivityItem = ({ action, time, score, icon: Icon, delay = 0 }) => {
  const getScoreColor = (score) => {
    const numScore = parseInt(score);
    if (numScore >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (numScore >= 75) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (numScore >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50/80 transition-all duration-200 border border-transparent hover:border-gray-200/50">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            {Icon ? (
              <Icon className="text-blue-600" size={18} />
            ) : (
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 group-hover:text-gray-800 transition-colors">
            {action}
          </p>
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
            {time}
          </p>
        </div>
        
        {/* Score badge */}
        <div className="flex-shrink-0">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getScoreColor(score)}`}>
            {score}
          </span>
        </div>
        
        {/* Arrow indicator */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityItem;
