import React from 'react';
import { motion } from 'framer-motion';
import { useTestSession } from '../../context/TestSessionContext';

const ProgressBar = () => {
  const { 
    currentQuestionIndex, 
    questions, 
    totalAnswered, 
    getProgress 
  } = useTestSession();

  const progress = getProgress();
  const currentNumber = currentQuestionIndex + 1;
  const totalQuestions = questions.length;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Question {currentNumber} of {totalQuestions}
          </h3>
          <p className="text-sm text-gray-600">
            {totalAnswered} answered • {totalQuestions - totalAnswered} remaining
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(progress)}%
          </div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        {/* Question Markers */}
        <div className="flex justify-between mt-2">
          {questions.slice(0, Math.min(10, totalQuestions)).map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full border-2 ${
                index < currentNumber
                  ? 'bg-blue-500 border-blue-500'
                  : index === currentQuestionIndex
                  ? 'bg-white border-blue-500 shadow-lg'
                  : 'bg-gray-200 border-gray-300'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
            />
          ))}
          
          {totalQuestions > 10 && (
            <div className="text-xs text-gray-500 flex items-center">
              +{totalQuestions - 10} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
