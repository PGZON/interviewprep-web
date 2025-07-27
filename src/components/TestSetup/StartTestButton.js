import React from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiLoader, FiArrowRight } from 'react-icons/fi';

const StartTestButton = ({ 
  isDisabled, 
  isLoading, 
  onClick, 
  selectedTopic, 
  selectedDifficulty,
  customTopic 
}) => {
  const getButtonText = () => {
    if (isLoading) return 'Generating Questions...';
    if (isDisabled) return 'Select Topic & Difficulty';
    return 'Start Test';
  };

  const getTopicDisplay = () => {
    if (selectedTopic === 'Other' && customTopic) {
      return customTopic;
    }
    return selectedTopic;
  };

  return (
    <div className="space-y-4">
      {/* Test Summary (when ready) */}
      {!isDisabled && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-xl p-4 border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-blue-900">Ready to start:</div>
              <div className="text-lg font-bold text-blue-800">
                {getTopicDisplay()} - {selectedDifficulty}
              </div>
              <div className="text-sm text-blue-600">10 questions • ~15 minutes</div>
            </div>
            <div className="p-3 bg-blue-500 rounded-full text-white">
              <FiPlay size={20} />
            </div>
          </div>
        </motion.div>
      )}

      {/* Start Button */}
      <motion.button
        onClick={onClick}
        disabled={isDisabled || isLoading}
        whileHover={!isDisabled && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!isDisabled && !isLoading ? { scale: 0.98 } : {}}
        className={`
          w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2
          ${
            isDisabled
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : isLoading
              ? 'bg-blue-400 text-white cursor-wait'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700'
          }
        `}
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FiLoader size={20} />
            </motion.div>
            <span>{getButtonText()}</span>
          </>
        ) : (
          <>
            <FiPlay size={20} />
            <span>{getButtonText()}</span>
            {!isDisabled && <FiArrowRight size={20} />}
          </>
        )}
      </motion.button>

      {/* Help text */}
      {isDisabled && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-500"
        >
          Please select both a topic and difficulty level to continue
        </motion.p>
      )}

      {/* Loading steps */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="text-center text-sm text-gray-600">
            This may take a few moments...
          </div>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-2 h-2 bg-blue-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StartTestButton;
