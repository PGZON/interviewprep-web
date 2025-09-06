import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

// Context
import { TestSessionProvider, useTestSession } from '../context/TestSessionContext';

// Components
import ProgressBar from '../components/MCQTest/ProgressBar';
import QuestionCard from '../components/MCQTest/QuestionCard';
import OptionList from '../components/MCQTest/OptionList';
import NavigationButtons from '../components/MCQTest/NavigationButtons';

// Main Test Component (wrapped in context)
const TestAttemptContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState('');

  const {
    initializeSession,
    questions,
    isLoading,
    error,
    sessionId
  } = useTestSession();

  useEffect(() => {
    const initializeTestSession = () => {
      try {
        // Try to get session data from location state first
        const locationState = location.state;
        
        // Then try localStorage
        const storedSession = localStorage.getItem('currentTestSession');
        let sessionData = null;

        if (locationState && locationState.batchId) {
          sessionData = locationState;
        } else if (storedSession) {
          sessionData = JSON.parse(storedSession);
        }

        // Ensure we have questions either in sessionData or from localStorage
        if (!sessionData.questions && storedSession) {
          const storedData = JSON.parse(storedSession);
          if (storedData.questions) {
            sessionData.questions = storedData.questions;

          }
        }

        if (!sessionData || !sessionData.questions || sessionData.questions.length === 0) {

          setInitError('No test session found. Please start a new test from the test setup page.');
          return;
        }

        // Initialize the session
        initializeSession(sessionData);
        setIsInitialized(true);
        
      } catch (error) {

        setInitError('Failed to load test session. Please try again.');
      }
    };

    if (!isInitialized) {
      initializeTestSession();
    }
  }, [initializeSession, location.state, isInitialized]);

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard/test');
  };

  // Loading state
  if (isLoading && !isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Test</h2>
          <p className="text-gray-600">Preparing your questions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (initError || error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 text-center">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Test Unavailable</h2>
          <p className="text-gray-600 mb-6">{initError || error}</p>
          
          <motion.button
            onClick={handleBackToDashboard}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiArrowLeft size={18} />
            <span>Back to Test Setup</span>
          </motion.button>
        </div>
      </div>
    );
  }

  // No questions state
  if (isInitialized && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Questions Available</h2>
          <p className="text-gray-600 mb-6">Unable to load test questions. Please try again.</p>
          
          <motion.button
            onClick={handleBackToDashboard}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiArrowLeft size={18} />
            <span>Back to Test Setup</span>
          </motion.button>
        </div>
      </div>
    );
  }

  // Main test interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between sticky top-0 z-10 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pb-4"
          >
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Test in Progress</h1>
              <p className="text-gray-600">Answer each question carefully</p>
            </div>

            <div className="w-32"></div> {/* Spacer for centering */}
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ProgressBar />
          </motion.div>

          {/* Question Card - Always visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="sticky top-20 z-5"
          >
            <QuestionCard />
          </motion.div>

          {/* Options - Scrollable area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pb-20" /* Add padding for navigation buttons */
          >
            <OptionList />
          </motion.div>

          {/* Navigation - Fixed at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 z-10"
          >
            <div className="max-w-4xl mx-auto">
              <NavigationButtons />
            </div>
          </motion.div>

          {/* Session Info (Debug - can be removed in production) */}
          {process.env.NODE_ENV === 'development' && sessionId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-gray-400 text-center pb-16"
            >
              Session ID: {sessionId}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main component with provider
const TestAttemptPage = () => {
  return (
    <TestSessionProvider>
      <TestAttemptContent />
    </TestSessionProvider>
  );
};

export default TestAttemptPage;
