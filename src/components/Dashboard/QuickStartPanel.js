import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlay, 
  FiRotateCcw, 
  FiTarget, 
  FiBook, 
  FiTrendingUp,
  FiZap
} from 'react-icons/fi';

const QuickStartPanel = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Start New Test',
      description: 'Take a fresh MCQ test on any topic',
      icon: FiPlay,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      action: () => navigate('/dashboard/test')
    },
    {
      title: 'Practice DSA',
      description: 'Quick practice on Data Structures & Algorithms',
      icon: FiTarget,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      action: () => navigate('/dashboard/test', { state: { quickTopic: 'DSA' } })
    },
    {
      title: 'Practice OS',
      description: 'Operating Systems concepts and questions',
      icon: FiBook,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      action: () => navigate('/dashboard/test', { state: { quickTopic: 'OS' } })
    },
    {
      title: 'View Progress',
      description: 'Check your learning progress and stats',
      icon: FiTrendingUp,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      action: () => navigate('/dashboard/progress')
    },
    {
      title: 'Resume Test',
      description: 'Continue your previous test session',
      icon: FiRotateCcw,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-200',
      action: () => {
        // Check if there's a previous test to resume
        const currentSession = localStorage.getItem('currentTestSession');
        if (currentSession) {
          navigate('/dashboard/test/attempt');
        } else {
          navigate('/dashboard/test');
        }
      }
    },
    {
      title: 'Practice Mode',
      description: 'Quick 5-question practice round',
      icon: FiZap,
      color: 'pink',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      borderColor: 'border-pink-200',
      action: () => navigate('/dashboard/test', { state: { quickMode: true } })
    }
  ];

  // Check if there's a resumable test
  const hasResumableTest = localStorage.getItem('currentTestSession') !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
    >
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <FiZap className="text-blue-600" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Quick Start</h3>
        <span className="text-sm text-gray-500">Jump right into practice</span>
      </div>

      {/* Resume Alert */}
      {hasResumableTest && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <FiRotateCcw className="text-yellow-600" size={20} />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                You have an unfinished test session
              </p>
              <p className="text-xs text-yellow-600">
                Click "Resume Test" to continue where you left off
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.title}
            onClick={action.action}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-lg border-2 ${action.borderColor} ${action.bgColor} hover:shadow-md transition-all duration-200 text-left group`}
          >
            {/* Highlight for resumable test */}
            {action.icon === FiRotateCcw && hasResumableTest && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}

            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${action.bgColor} border ${action.borderColor}`}>
                <action.icon className={action.textColor} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium ${action.textColor} group-hover:text-opacity-80 transition-colors`}>
                  {action.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </div>

            {/* Hover effect arrow */}
            <div className={`absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${action.textColor}`}>
              <FiPlay size={12} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Additional Tips */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            💡 <strong>Pro Tip:</strong> Regular practice helps improve your performance
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <span>📚 Study consistently</span>
            <span>🎯 Focus on weak areas</span>
            <span>📈 Track your progress</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickStartPanel;
