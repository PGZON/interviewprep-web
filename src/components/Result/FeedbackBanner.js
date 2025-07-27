import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiTrendingUp, FiTarget, FiBook } from 'react-icons/fi';

const FeedbackBanner = ({ 
  correctAnswers, 
  totalQuestions, 
  topic, 
  difficulty,
  incorrectAnswers,
  strongAreas = [],
  weakAreas = [] 
}) => {
  const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // Generate feedback based on performance
  const generateFeedback = () => {
    if (scorePercentage >= 90) {
      return {
        type: 'excellent',
        icon: <FiAward className="text-yellow-500" size={24} />,
        title: 'Outstanding Performance! 🏆',
        message: `Excellent work! You scored ${scorePercentage}% on ${topic}. You've mastered this topic at the ${difficulty} level.`,
        color: 'from-yellow-400 to-orange-500',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-800'
      };
    } else if (scorePercentage >= 75) {
      return {
        type: 'good',
        icon: <FiTrendingUp className="text-green-500" size={24} />,
        title: 'Great Job! 🎉',
        message: `Well done! You scored ${scorePercentage}% on ${topic}. You have a solid understanding of this subject.`,
        color: 'from-green-400 to-emerald-500',
        bgColor: 'bg-green-50',
        textColor: 'text-green-800'
      };
    } else if (scorePercentage >= 60) {
      return {
        type: 'fair',
        icon: <FiTarget className="text-blue-500" size={24} />,
        title: 'Good Effort! 👍',
        message: `You scored ${scorePercentage}% on ${topic}. You're on the right track! A bit more practice will help you excel.`,
        color: 'from-blue-400 to-cyan-500',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-800'
      };
    } else {
      return {
        type: 'improvement',
        icon: <FiBook className="text-purple-500" size={24} />,
        title: 'Keep Learning! 📚',
        message: `You scored ${scorePercentage}% on ${topic}. Don't worry - practice makes perfect! Focus on understanding the concepts better.`,
        color: 'from-purple-400 to-pink-500',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-800'
      };
    }
  };

  const feedback = generateFeedback();

  // Generate improvement suggestions
  const getImprovementSuggestions = () => {
    const suggestions = [];
    
    if (scorePercentage < 75) {
      suggestions.push(`Review ${topic} fundamentals and key concepts`);
    }
    
    if (incorrectAnswers > totalQuestions * 0.3) {
      suggestions.push(`Practice more ${difficulty.toLowerCase()} level questions`);
    }
    
    if (scorePercentage >= 75) {
      suggestions.push(`Try advancing to harder difficulty levels`);
      suggestions.push(`Explore related topics to broaden your knowledge`);
    }
    
    return suggestions;
  };

  const suggestions = getImprovementSuggestions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden"
    >
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${feedback.color} p-6 text-white`}>
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-full">
            {feedback.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{feedback.title}</h3>
            <p className="text-white/90 text-lg">{feedback.message}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${feedback.bgColor} rounded-lg p-4`}>
            <div className="flex items-center space-x-2 mb-2">
              <FiTarget className={feedback.textColor.replace('text-', 'text-')} size={18} />
              <span className={`font-semibold ${feedback.textColor}`}>Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{scorePercentage}%</div>
            <div className="text-sm text-gray-600">{correctAnswers} out of {totalQuestions} correct</div>
          </div>

          <div className={`${feedback.bgColor} rounded-lg p-4`}>
            <div className="flex items-center space-x-2 mb-2">
              <FiBook className={feedback.textColor.replace('text-', 'text-')} size={18} />
              <span className={`font-semibold ${feedback.textColor}`}>Subject</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">{topic}</div>
            <div className="text-sm text-gray-600 capitalize">{difficulty} difficulty</div>
          </div>

          <div className={`${feedback.bgColor} rounded-lg p-4`}>
            <div className="flex items-center space-x-2 mb-2">
              <FiTrendingUp className={feedback.textColor.replace('text-', 'text-')} size={18} />
              <span className={`font-semibold ${feedback.textColor}`}>Progress</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {scorePercentage >= 75 ? 'Proficient' : scorePercentage >= 60 ? 'Developing' : 'Beginner'}
            </div>
            <div className="text-sm text-gray-600">Skill level</div>
          </div>
        </div>

        {/* Improvement Suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              💡 Recommendations for Improvement
            </h4>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-3 text-gray-700"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{suggestion}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Strong Areas (if provided) */}
        {strongAreas.length > 0 && (
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-3">
              ✅ Your Strong Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {strongAreas.map((area, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Weak Areas (if provided) */}
        {weakAreas.length > 0 && (
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
            <h4 className="text-lg font-semibold text-orange-800 mb-3">
              🎯 Areas to Focus On
            </h4>
            <div className="flex flex-wrap gap-2">
              {weakAreas.map((area, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FeedbackBanner;
