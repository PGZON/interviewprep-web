import React from 'react';
import { motion } from 'framer-motion';

const DifficultySelector = ({ selectedDifficulty, onDifficultySelect }) => {
  const difficulties = [
    {
      label: "Easy",
      value: "EASY",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 hover:bg-green-100 border-green-200",
      selectedBg: "bg-green-100 border-green-500 ring-green-500/20",
      textColor: "text-green-700",
      selectedText: "text-green-800",
      emoji: "🟢",
      description: "Perfect for beginners"
    },
    {
      label: "Medium",
      value: "MEDIUM",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
      selectedBg: "bg-yellow-100 border-yellow-500 ring-yellow-500/20",
      textColor: "text-yellow-700",
      selectedText: "text-yellow-800",
      emoji: "🟡",
      description: "Intermediate challenges"
    },
    {
      label: "Hard",
      value: "HARD",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 hover:bg-red-100 border-red-200",
      selectedBg: "bg-red-100 border-red-500 ring-red-500/20",
      textColor: "text-red-700",
      selectedText: "text-red-800",
      emoji: "🔴",
      description: "Expert level questions"
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Difficulty Level</h3>
        <p className="text-sm text-gray-600 mb-4">Choose the challenge level that matches your skills</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficulties.map((difficulty, index) => {
          const isSelected = selectedDifficulty === difficulty.value;
          
          return (
            <motion.div
              key={difficulty.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => onDifficultySelect(difficulty.value)}
                className={`
                  w-full p-6 rounded-xl border-2 transition-all duration-200 text-center
                  ${
                    isSelected
                      ? `${difficulty.selectedBg} ring-2`
                      : `${difficulty.bgColor} border-2`
                  }
                `}
              >
                <div className="space-y-3">
                  {/* Emoji and gradient badge */}
                  <div className="flex justify-center">
                    <div className={`
                      w-12 h-12 rounded-full bg-gradient-to-r ${difficulty.color} 
                      flex items-center justify-center text-white text-xl shadow-lg
                    `}>
                      {difficulty.emoji}
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className={`text-lg font-semibold ${
                    isSelected ? difficulty.selectedText : difficulty.textColor
                  }`}>
                    {difficulty.label}
                  </div>
                  
                  {/* Description */}
                  <div className={`text-sm ${
                    isSelected ? difficulty.selectedText : difficulty.textColor
                  } opacity-80`}>
                    {difficulty.description}
                  </div>
                  
                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex justify-center"
                    >
                      <div className={`
                        w-6 h-6 rounded-full bg-gradient-to-r ${difficulty.color} 
                        flex items-center justify-center shadow-md
                      `}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySelector;
