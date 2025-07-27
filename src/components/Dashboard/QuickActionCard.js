import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuickActionCard = ({ title, description, icon: Icon, color, link, delay = 0 }) => {
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        gradient: 'from-blue-500 to-blue-600',
        hover: 'hover:from-blue-600 hover:to-blue-700'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        gradient: 'from-green-500 to-green-600',
        hover: 'hover:from-green-600 hover:to-green-700'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        gradient: 'from-purple-500 to-purple-600',
        hover: 'hover:from-purple-600 hover:to-purple-700'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        gradient: 'from-orange-500 to-orange-600',
        hover: 'hover:from-orange-600 hover:to-orange-700'
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
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="h-full"
    >
      <Link to={link} className="block h-full">
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
          {/* Animated background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
          
          {/* Icon container */}
          <div className={`w-14 h-14 rounded-xl ${colorClasses.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`text-2xl ${colorClasses.text}`} />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
              {description}
            </p>
          </div>
          
          {/* Arrow indicator */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default QuickActionCard;
