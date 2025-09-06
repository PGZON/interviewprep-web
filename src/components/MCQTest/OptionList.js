import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { useTestSession } from '../../context/TestSessionContext';

const OptionList = () => {
  const { getCurrentQuestion, getCurrentAnswer, setAnswer } = useTestSession();
  
  const question = getCurrentQuestion();
  const selectedAnswer = getCurrentAnswer();

  if (!question) return null;



  // Extract options from question object
  let options = [];
  
  if (question.options && Array.isArray(question.options)) {
    // Backend returns options as an array
    options = question.options.map((optionText, index) => ({
      id: String.fromCharCode(65 + index), // A, B, C, D
      text: optionText
    }));

  } else {
    // Fallback for individual option properties
    options = [
      { id: 'A', text: question.optionA || question.option1 },
      { id: 'B', text: question.optionB || question.option2 },
      { id: 'C', text: question.optionC || question.option3 },
      { id: 'D', text: question.optionD || question.option4 }
    ].filter(option => option.text); // Filter out empty options

  }

  const handleOptionSelect = (optionId) => {
    setAnswer(question.id, optionId);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Choose your answer:
      </h3>
      
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option.id;
          
          return (
            <motion.button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                {/* Option Letter */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {isSelected ? <FiCheck size={16} /> : option.id}
                </div>
                
                {/* Option Text */}
                <div className="flex-1">
                  <span className={`text-base ${
                    isSelected ? 'text-blue-900 font-medium' : 'text-gray-800'
                  }`}>
                    {option.text}
                  </span>
                </div>
                
                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <FiCheck className="text-white" size={14} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
      
      {/* Selection Status */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className={`${
            selectedAnswer ? 'text-green-600' : 'text-gray-500'
          }`}>
            {selectedAnswer 
              ? `✓ Option ${selectedAnswer} selected`
              : 'Please select an answer to continue'
            }
          </span>
          
          <span className="text-gray-400">
            {options.length} options
          </span>
        </div>
      </div>
    </div>
  );
};

export default OptionList;
