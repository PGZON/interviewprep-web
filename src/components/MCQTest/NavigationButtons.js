import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiFlag, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTestSession } from '../../context/TestSessionContext';

const NavigationButtons = () => {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    questions,
    isCurrentQuestionAnswered,
    isFirstQuestion,
    isLastQuestion,
    isPrefetching,
    previousQuestion,
    nextQuestion,
    totalAnswered
  } = useTestSession();

  const handlePrevious = () => {
    previousQuestion();
  };

  const handleNext = () => {
    nextQuestion();
  };

  const handleFinishTest = () => {
    // Navigate to results page (Phase 6)
    navigate('/dashboard/test/results', {
      state: {
        totalQuestions: questions.length,
        totalAnswered: totalAnswered,
        fromAttempt: true
      }
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <motion.button
          onClick={handlePrevious}
          disabled={isFirstQuestion()}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isFirstQuestion()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
          }`}
          whileHover={!isFirstQuestion() ? { scale: 1.02 } : {}}
          whileTap={!isFirstQuestion() ? { scale: 0.98 } : {}}
        >
          <FiChevronLeft size={18} />
          <span>Previous</span>
        </motion.button>

        {/* Middle Section - Status */}
        <div className="flex items-center space-x-4">
          {/* Prefetching Indicator */}
          {isPrefetching && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm"
            >
              <FiLoader className="animate-spin" size={14} />
              <span>Loading more questions...</span>
            </motion.div>
          )}

          {/* Question Counter */}
          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
            {currentQuestionIndex + 1} of {questions.length}
          </div>

          {/* Answered Status */}
          <div className={`text-sm px-3 py-1 rounded-full ${
            isCurrentQuestionAnswered()
              ? 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-700'
          }`}>
            {isCurrentQuestionAnswered() ? '✓ Answered' : 'Not answered'}
          </div>
        </div>

        {/* Next/Finish Button */}
        {isLastQuestion() ? (
          <motion.button
            onClick={handleFinishTest}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiFlag size={18} />
            <span>Finish Test</span>
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered()}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              !isCurrentQuestionAnswered()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl'
            }`}
            whileHover={isCurrentQuestionAnswered() ? { scale: 1.02 } : {}}
            whileTap={isCurrentQuestionAnswered() ? { scale: 0.98 } : {}}
          >
            <span>Next</span>
            <FiChevronRight size={18} />
          </motion.button>
        )}
      </div>

      {/* Progress Summary */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Progress: {totalAnswered}/{questions.length} questions answered
          </span>
          
          <div className="flex items-center space-x-4">
            {questions.length > 10 && (
              <span className="text-blue-600">
                {questions.length - 10} more questions loaded
              </span>
            )}
            
            <button
              onClick={handleFinishTest}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              End Test Early
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationButtons;
