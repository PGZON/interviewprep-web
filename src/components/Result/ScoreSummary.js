import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiTarget, FiClock } from 'react-icons/fi';

const ScoreSummary = ({ 
  totalQuestions, 
  totalAnswered, 
  correctAnswers, 
  incorrectAnswers, 
  unanswered,
  timeTaken,
  topic,
  difficulty 
}) => {
  const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const answeredPercentage = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;

  // Get performance level and color
  const getPerformanceLevel = (percentage) => {
    if (percentage >= 80) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 65) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 50) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const performance = getPerformanceLevel(scorePercentage);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white text-2xl font-bold mb-4"
        >
          {scorePercentage}%
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h2>
        
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${performance.bg} ${performance.color}`}>
          {scorePercentage >= 65 ? <FiTrendingUp size={16} /> : <FiTrendingDown size={16} />}
          <span>{performance.level}</span>
        </div>
      </div>

      {/* Test Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{topic}</div>
          <div className="text-sm text-gray-600">Subject</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 capitalize">{difficulty}</div>
          <div className="text-sm text-gray-600">Difficulty</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
          <div className="text-sm text-gray-600">Questions</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{timeTaken || '~15m'}</div>
          <div className="text-sm text-gray-600">Time Taken</div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Correct Answers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 rounded-xl p-6 border border-green-200"
        >
          <div className="flex items-center justify-between mb-3">
            <FiTarget className="text-green-600" size={24} />
            <span className="text-2xl font-bold text-green-600">{correctAnswers}</span>
          </div>
          <div className="text-green-800 font-medium">Correct Answers</div>
          <div className="text-green-600 text-sm">
            {totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0}% accuracy
          </div>
        </motion.div>

        {/* Incorrect Answers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 rounded-xl p-6 border border-red-200"
        >
          <div className="flex items-center justify-between mb-3">
            <FiTarget className="text-red-600" size={24} />
            <span className="text-2xl font-bold text-red-600">{incorrectAnswers}</span>
          </div>
          <div className="text-red-800 font-medium">Incorrect Answers</div>
          <div className="text-red-600 text-sm">
            {totalQuestions > 0 ? Math.round((incorrectAnswers / totalQuestions) * 100) : 0}% of total
          </div>
        </motion.div>

        {/* Unanswered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-3">
            <FiClock className="text-gray-600" size={24} />
            <span className="text-2xl font-bold text-gray-600">{unanswered}</span>
          </div>
          <div className="text-gray-800 font-medium">Unanswered</div>
          <div className="text-gray-600 text-sm">
            {totalQuestions > 0 ? Math.round((unanswered / totalQuestions) * 100) : 0}% skipped
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-600">{answeredPercentage}% completed</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${scorePercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreSummary;
