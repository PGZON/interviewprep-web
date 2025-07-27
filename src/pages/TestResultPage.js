import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiRefreshCw, FiHome, FiShare2 } from 'react-icons/fi';
import { useToast } from '../contexts/ToastContext';

// Components
import ScoreSummary from '../components/Result/ScoreSummary';
import QuestionReviewCard from '../components/Result/QuestionReviewCard';
import PerformanceChart from '../components/Result/PerformanceChart';
import FeedbackBanner from '../components/Result/FeedbackBanner';

const TestResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  
  // State
  const [testData, setTestData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Calculated results
  const [results, setResults] = useState({
    totalQuestions: 0,
    totalAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
    scorePercentage: 0
  });

  useEffect(() => {
    const initializeResults = async () => {
      try {
        setIsLoading(true);
        
        // Try to get data from location state first
        const locationState = location.state;
        
        // Then try localStorage
        const storedSession = localStorage.getItem('currentTestSession');
        let sessionData = null;

        if (locationState && locationState.fromAttempt) {
          // Coming from test attempt page
          if (storedSession) {
            sessionData = JSON.parse(storedSession);
          }
        } else if (storedSession) {
          sessionData = JSON.parse(storedSession);
        }

        if (!sessionData || !sessionData.questions) {
          setError('No test results found. Please complete a test first.');
          return;
        }

        setTestData(sessionData);
        
        // Get user answers from TestSessionContext or localStorage  
        const answersData = JSON.parse(localStorage.getItem('testAnswers') || '{}');
        setUserAnswers(answersData);
        
        // Calculate results
        calculateResults(sessionData.questions, answersData);
        
      } catch (error) {
        console.error('Failed to load test results:', error);
        setError('Failed to load test results. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeResults();
  }, [location.state]);

  // Calculate test results
  const calculateResults = (questions, answers) => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    
    let correctCount = 0;
    let incorrectCount = 0;
    
    questions.forEach(question => {
      const userAnswer = answers[question.id];
      const correctAnswer = question.correctOption || question.correctAnswer;
      
      if (userAnswer) {
        if (userAnswer === correctAnswer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });
    
    const unansweredCount = totalQuestions - answeredQuestions;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    
    setResults({
      totalQuestions,
      totalAnswered: answeredQuestions,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      unanswered: unansweredCount,
      scorePercentage
    });
  };

  // Handle navigation
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleRetakeTest = () => {
    navigate('/dashboard/test');
  };

  const handleNewTest = () => {
    // Clear stored session and navigate to test setup
    localStorage.removeItem('currentTestSession');
    localStorage.removeItem('testAnswers');
    navigate('/dashboard/test');
  };

  // Share results (enhanced with toast feedback)
  const handleShareResults = async () => {
    const shareText = `I scored ${results.scorePercentage}% on ${testData?.topic} test! 🎉`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Test Results',
          text: shareText,
          url: window.location.href
        });
        toast.success('Results shared successfully!');
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error('Failed to share results');
        }
      }
    } else {
      // Fallback - copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        toast.success('Results copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy to clipboard');
        console.error('Clipboard error:', error);
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Results</h2>
          <p className="text-gray-600">Calculating your performance...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !testData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Results Unavailable</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          
          <motion.button
            onClick={handleBackToDashboard}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiHome size={18} />
            <span>Back to Dashboard</span>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0"
        >
          <div>
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-2"
            >
              <FiArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Test Results</h1>
            <p className="text-gray-600">Review your performance and areas for improvement</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={handleShareResults}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiShare2 size={16} />
              <span>Share</span>
            </motion.button>

            <motion.button
              onClick={handleRetakeTest}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiRefreshCw size={16} />
              <span>Retake Test</span>
            </motion.button>

            <motion.button
              onClick={handleNewTest}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>New Test</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Score Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ScoreSummary
            totalQuestions={results.totalQuestions}
            totalAnswered={results.totalAnswered}
            correctAnswers={results.correctAnswers}
            incorrectAnswers={results.incorrectAnswers}
            unanswered={results.unanswered}
            topic={testData.topic}
            difficulty={testData.difficulty}
            timeTaken="~15m"
          />
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PerformanceChart
            correctAnswers={results.correctAnswers}
            incorrectAnswers={results.incorrectAnswers}
            unanswered={results.unanswered}
            topic={testData.topic}
            difficulty={testData.difficulty}
          />
        </motion.div>

        {/* Feedback Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FeedbackBanner
            correctAnswers={results.correctAnswers}
            totalQuestions={results.totalQuestions}
            topic={testData.topic}
            difficulty={testData.difficulty}
            incorrectAnswers={results.incorrectAnswers}
          />
        </motion.div>

        {/* Question Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Question Review</h3>
            <p className="text-gray-600 mb-6">
              Review each question to understand your performance and learn from any mistakes.
            </p>
          </div>

          <div className="space-y-6">
            {testData.questions.map((question, index) => {
              const userAnswer = userAnswers[question.id];
              const correctAnswer = question.correctOption || question.correctAnswer;
              const isCorrect = userAnswer === correctAnswer;
              const wasAnswered = userAnswer !== undefined && userAnswer !== null;

              return (
                <QuestionReviewCard
                  key={question.id}
                  question={question}
                  questionIndex={index}
                  userAnswer={userAnswer}
                  correctAnswer={correctAnswer}
                  isCorrect={isCorrect}
                  wasAnswered={wasAnswered}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4">
            <motion.button
              onClick={handleRetakeTest}
              className="w-full md:w-auto px-6 py-3 bg-blue-100 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Practice Same Topic
            </motion.button>
            
            <motion.button
              onClick={handleNewTest}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try Different Topic
            </motion.button>
            
            <motion.button
              onClick={handleBackToDashboard}
              className="w-full md:w-auto px-6 py-3 bg-gray-100 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Dashboard
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestResultPage;
