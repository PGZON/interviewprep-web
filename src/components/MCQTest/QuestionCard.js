import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiAward, FiClock } from 'react-icons/fi';
import { useTestSession } from '../../context/TestSessionContext';

const QuestionCard = () => {
  const { getCurrentQuestion, difficulty, topic } = useTestSession();
  
  const question = getCurrentQuestion();

  if (!question) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20">
        <div className="text-center text-gray-500">
          <div className="animate-pulse">Loading question...</div>
        </div>
      </div>
    );
  }

  // Get difficulty color and icon
  const getDifficultyStyle = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return {
          color: 'text-green-600',
          bg: 'bg-green-100',
          icon: '🟢'
        };
      case 'medium':
        return {
          color: 'text-yellow-600',
          bg: 'bg-yellow-100',
          icon: '🟡'
        };
      case 'hard':
        return {
          color: 'text-red-600',
          bg: 'bg-red-100',
          icon: '🔴'
        };
      default:
        return {
          color: 'text-gray-600',
          bg: 'bg-gray-100',
          icon: '⚪'
        };
    }
  };

  const difficultyStyle = getDifficultyStyle(difficulty);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiTarget className="text-blue-600" size={18} />
              <span className="font-medium text-gray-900">{topic}</span>
            </div>
            
            <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${difficultyStyle.bg} ${difficultyStyle.color}`}>
              <span>{difficultyStyle.icon}</span>
              <span className="capitalize">{difficulty}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <FiAward size={16} />
              <span>MCQ</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiClock size={16} />
              <span>~2 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
            {question.questionText || question.text || 'Question text not available'}
          </h2>
        </div>

        {/* Question Type Indicator */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <span>Multiple Choice Question</span>
          <span>Select one option</span>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
