import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiMinus } from 'react-icons/fi';

const QuestionReviewCard = ({ 
  question, 
  questionIndex, 
  userAnswer, 
  correctAnswer, 
  isCorrect, 
  wasAnswered 
}) => {
  // Extract options from question with better fallback handling
  console.log('Question data:', question); // Debug log
  
  const options = [
    { id: 'A', text: question.optionA || question.option1 || question.choices?.[0] || question.options?.[0] },
    { id: 'B', text: question.optionB || question.option2 || question.choices?.[1] || question.options?.[1] },
    { id: 'C', text: question.optionC || question.option3 || question.choices?.[2] || question.options?.[2] },
    { id: 'D', text: question.optionD || question.option4 || question.choices?.[3] || question.options?.[3] }
  ].filter(option => option.text && option.text.trim() !== '');

  console.log('Extracted options:', options); // Debug log

  // Get option style based on correctness and selection
  const getOptionStyle = (optionId) => {
    const isSelected = userAnswer === optionId;
    const isCorrectOption = correctAnswer === optionId;
    
    if (isCorrectOption && isSelected) {
      // Correct answer selected
      return 'border-green-500 bg-green-50 text-green-800';
    } else if (isCorrectOption) {
      // Correct answer not selected
      return 'border-green-500 bg-green-100 text-green-700';
    } else if (isSelected) {
      // Wrong answer selected
      return 'border-red-500 bg-red-50 text-red-800';
    } else {
      // Not selected
      return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  // Get option icon
  const getOptionIcon = (optionId) => {
    const isSelected = userAnswer === optionId;
    const isCorrectOption = correctAnswer === optionId;
    
    if (isCorrectOption) {
      return <FiCheck className="text-green-600" size={16} />;
    } else if (isSelected && !isCorrectOption) {
      return <FiX className="text-red-600" size={16} />;
    } else {
      return <span className="text-gray-500 font-medium">{optionId}</span>;
    }
  };

  // Get result status
  const getResultStatus = () => {
    if (!wasAnswered) {
      return {
        icon: <FiMinus className="text-gray-500" size={20} />,
        text: 'Not Answered',
        color: 'text-gray-600',
        bg: 'bg-gray-100',
        emoji: '⏭️'
      };
    } else if (isCorrect) {
      return {
        icon: <FiCheck className="text-green-600" size={20} />,
        text: 'Correct',
        color: 'text-green-600',
        bg: 'bg-green-100',
        emoji: '✅'
      };
    } else {
      return {
        icon: <FiX className="text-red-600" size={20} />,
        text: 'Incorrect',
        color: 'text-red-600',
        bg: 'bg-red-100',
        emoji: '❌'
      };
    }
  };

  const resultStatus = getResultStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: questionIndex * 0.05 }}
      className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              {questionIndex + 1}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Question {questionIndex + 1}
            </h3>
          </div>
          
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${resultStatus.bg} ${resultStatus.color}`}>
            <span className="text-base">{resultStatus.emoji}</span>
            {resultStatus.icon}
            <span>{resultStatus.text}</span>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6">
        {/* Question Text */}
        <div className="mb-6">
          <p className="text-lg text-gray-900 leading-relaxed">
            {question.questionText || question.text || 'Question text not available'}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {options.map((option) => (
            <div
              key={option.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${getOptionStyle(option.id)}`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border">
                  {getOptionIcon(option.id)}
                </div>
                <div className="flex-1">
                  <span className="text-base">
                    <span className="font-semibold">{option.id}:</span> {option.text}
                  </span>
                </div>
                
                {/* Labels */}
                <div className="flex items-center space-x-2">
                  {userAnswer === option.id && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      isCorrect && userAnswer === option.id 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {isCorrect && userAnswer === option.id ? '✅ Your Answer' : '❌ Your Answer'}
                    </span>
                  )}
                  {correctAnswer === option.id && userAnswer !== option.id && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                      ✅ Correct
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Answer Summary */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-medium text-gray-700 flex-shrink-0">Your Answer:</span>
              {wasAnswered ? (
                <span className={`inline-flex items-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? '✅' : '❌'} 
                  <span className="ml-1 break-words">
                    <span className="font-semibold">{userAnswer}:</span> {options.find(opt => opt.id === userAnswer)?.text || `Option ${userAnswer} (text not loaded)`}
                  </span>
                </span>
              ) : (
                <span className="text-gray-500">❌ Not answered</span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-medium text-gray-700 flex-shrink-0">Correct Answer:</span>
              <span className="text-green-600 inline-flex items-start">
                ✅ 
                <span className="ml-1 break-words">
                  <span className="font-semibold">{correctAnswer}:</span> {options.find(opt => opt.id === correctAnswer)?.text || `Option ${correctAnswer} (text not loaded)`}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionReviewCard;
