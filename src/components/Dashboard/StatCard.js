import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, change, changeType, icon: Icon, color, delay = 0 }) => {
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        gradient: 'from-blue-500 to-blue-600'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        gradient: 'from-green-500 to-green-600'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        gradient: 'from-purple-500 to-purple-600'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        gradient: 'from-yellow-500 to-yellow-600'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-600',
        gradient: 'from-red-500 to-red-600'
      }
    };
    return colors[color] || colors.blue;
  };

  const colorClasses = getColorClasses(color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="relative overflow-hidden"
    >
      {/* Glassmorphic card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Background gradient overlay */}
        <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${colorClasses.gradient} opacity-10 rounded-bl-full`}></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${colorClasses.bg} flex items-center justify-center`}>
              <Icon className={`text-xl ${colorClasses.text}`} />
            </div>
          </div>
          
          <div className="flex items-center">
            <span className={`text-sm font-medium ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {changeType === 'positive' ? '↗' : '↘'} {change}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
