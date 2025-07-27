import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit3, FiHelpCircle } from 'react-icons/fi';

const CustomTopicInput = ({ isVisible, customTopic, onCustomTopicChange }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                  <FiEdit3 size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Custom Topic</h4>
                  <p className="text-sm text-gray-600">What would you like to practice?</p>
                </div>
              </div>

              {/* Input Field */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => onCustomTopicChange(e.target.value)}
                    placeholder="e.g., Java Loops, MySQL Joins, React Hooks..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white placeholder-gray-400"
                    autoFocus
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="group relative">
                      <FiHelpCircle className="text-gray-400 hover:text-gray-600 cursor-help" size={16} />
                      <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Be specific! Examples: "Python Lists", "CSS Flexbox", "React useState"
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Character counter and validation */}
                <div className="flex justify-between items-center text-xs">
                  <div className="text-gray-500">
                    {customTopic.length}/50 characters
                  </div>
                  {customTopic.length > 0 && customTopic.length < 3 && (
                    <div className="text-red-500">
                      Topic should be at least 3 characters
                    </div>
                  )}
                  {customTopic.length >= 3 && (
                    <div className="text-green-600 flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Looks good!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700">Popular examples:</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript Promises",
                    "SQL Joins",
                    "Python OOP",
                    "React Hooks",
                    "CSS Grid",
                    "Node.js APIs"
                  ].map((example) => (
                    <button
                      key={example}
                      onClick={() => onCustomTopicChange(example)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomTopicInput;
