import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance'; // Use axiosInstance instead of plain axios
import { useToast } from '../contexts/ToastContext';
import { FiTarget, FiClock, FiUsers } from 'react-icons/fi';

// Test Setup Components
import TopicSelector from '../components/TestSetup/TopicSelector';
import DifficultySelector from '../components/TestSetup/DifficultySelector';
import CustomTopicInput from '../components/TestSetup/CustomTopicInput';
import StartTestButton from '../components/TestSetup/StartTestButton';

const StartTestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle quick navigation from dashboard
  useEffect(() => {
    if (location.state?.quickTopic) {
      setSelectedTopic(location.state.quickTopic);
      setSelectedDifficulty('EASY'); // Default difficulty for quick start
    }
    if (location.state?.quickMode) {
      setSelectedTopic('DSA'); // Default topic for quick mode
      setSelectedDifficulty('EASY');
    }
  }, [location.state]);

  // Check if form is valid
  const isFormValid = () => {
    if (!selectedTopic || !selectedDifficulty) return false;
    if (selectedTopic === 'Other' && (!customTopic || customTopic.length < 3)) return false;
    return true;
  };

  // Handle topic selection
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setError('');
    if (topic !== 'Other') {
      setCustomTopic('');
    }
  };

  // Handle difficulty selection
  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setError('');
  };

  // Handle custom topic input
  const handleCustomTopicChange = (value) => {
    setCustomTopic(value.slice(0, 50)); // Limit to 50 characters
    setError('');
  };

  // Start the test
  const handleStartTest = async () => {
    if (!isFormValid()) return;

    setIsLoading(true);
    setError('');

    // Determine the topic to send to API (moved outside try-catch)
    const topicToSend = selectedTopic === 'Other' ? customTopic : selectedTopic;

    try {
      // Clear any previous test data
      localStorage.removeItem('testAnswers');
      
      console.log('Starting test with:', { topic: topicToSend, difficulty: selectedDifficulty }); // Debug log

      // Check if token exists before making request
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      if (!token) {
        setError('Authentication required. Please log in again.');
        toast.error('Please log in to start a test');
        navigate('/auth');
        return;
      }

      // Make API request to generate MCQ batch using axiosInstance
      const response = await axiosInstance.post('/mcq/generate', {
        topic: topicToSend,
        difficulty: selectedDifficulty,
        batchSize: 10
      });

      console.log('✅ Backend response received:', response.data); // Debug log

      // Handle different possible response structures
      let sessionData;
      if (response.data.questions) {
        // Direct questions array in response
        sessionData = {
          batchId: response.data.batchId || 'batch-' + Date.now(),
          sessionId: response.data.sessionId || 'session-' + Date.now(),
          questions: response.data.questions.map((question, index) => ({
            ...question,
            id: question.id || `question-${index + 1}` // Ensure each question has a unique ID
          })),
          topic: topicToSend,
          difficulty: selectedDifficulty,
          startTime: new Date().toISOString()
        };
      } else if (Array.isArray(response.data)) {
        // Response is directly an array of questions
        sessionData = {
          batchId: 'batch-' + Date.now(),
          sessionId: 'session-' + Date.now(),
          questions: response.data.map((question, index) => ({
            ...question,
            id: question.id || `question-${index + 1}` // Ensure each question has a unique ID
          })),
          topic: topicToSend,
          difficulty: selectedDifficulty,
          startTime: new Date().toISOString()
        };
      } else {
        // Fallback - extract any questions array found
        const questions = response.data.mcqs || response.data.data || response.data;
        sessionData = {
          batchId: response.data.batchId || 'batch-' + Date.now(),
          sessionId: response.data.sessionId || 'session-' + Date.now(),
          questions: Array.isArray(questions) ? questions.map((question, index) => ({
            ...question,
            id: question.id || `question-${index + 1}` // Ensure each question has a unique ID
          })) : [],
          topic: topicToSend,
          difficulty: selectedDifficulty,
          startTime: new Date().toISOString()
        };
      }
      
      console.log('✅ Session data prepared:', sessionData);
      
      // Store in localStorage for the test attempt page
      localStorage.setItem('currentTestSession', JSON.stringify(sessionData));
      
      console.log('✅ Session stored in localStorage');

      // Show success message
      toast.success(`Test generated successfully! ${sessionData.questions?.length || 0} questions ready.`);

      // Navigate to test attempt page
      navigate('/dashboard/test/attempt', { 
        state: sessionData  // Pass the complete session data including questions
      });
      
      console.log('✅ Navigating to test attempt page');

    } catch (error) {
      console.error('❌ Failed to generate test:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      // Provide more specific error messages based on error type
      let errorMessage = 'Failed to generate test questions. ';
      
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        console.log('🔄 Backend not available - switching to demo mode');
        errorMessage += 'Backend server is not running. Using demo mode instead.';
        
        // Fallback to demo mode
        const demoQuestions = [
          {
            id: 1,
            questionText: `What is a key concept in ${topicToSend}?`,
            optionA: "Option A",
            optionB: "Option B", 
            optionC: "Option C",
            optionD: "Option D",
            correctOption: "A"
          },
          {
            id: 2,
            questionText: `Which of the following is important for ${topicToSend}?`,
            optionA: "First choice",
            optionB: "Second choice",
            optionC: "Third choice",
            optionD: "Fourth choice",
            correctOption: "B"
          }
        ];
        
        const demoSession = {
          batchId: 'demo-batch-' + Date.now(),
          sessionId: 'demo-session-' + Date.now(),
          questions: demoQuestions,
          topic: topicToSend,
          difficulty: selectedDifficulty,
          startTime: new Date().toISOString()
        };
        
        console.log('✅ Demo session created:', demoSession);
        
        localStorage.setItem('currentTestSession', JSON.stringify(demoSession));
        navigate('/dashboard/test/attempt', { 
          state: { 
            batchId: demoSession.batchId, 
            sessionId: demoSession.sessionId, 
            topic: topicToSend, 
            difficulty: selectedDifficulty 
          } 
        });
        return;
      } else if (error.response?.status === 400) {
        errorMessage += 'Invalid request parameters. Please check your selections.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
        toast.error('Session expired - Please log in again');
        navigate('/auth');
        return;
      } else if (error.response?.status === 403) {
        errorMessage = 'You don\'t have access. Please login again.';
        toast.error('Access denied - Please check your permissions');
        // Don't navigate away, let user try again
      } else if (error.response?.status === 500) {
        errorMessage += 'Server error. Please try again later.';
      } else {
        errorMessage += 'Please try again.';
      }
      
      // Show toast notification for errors
      toast.error(errorMessage);
      
      console.error('Final error message:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/20">
            <FiTarget className="text-blue-600" size={20} />
            <span className="font-medium text-gray-900">Test Setup</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">
            Ready to Test Your Knowledge?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your subject, set the difficulty, and challenge yourself with AI-generated questions
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { 
              icon: FiTarget, 
              label: "Questions", 
              value: "10", 
              color: "from-blue-500 to-cyan-500" 
            },
            { 
              icon: FiClock, 
              label: "Duration", 
              value: "~15 min", 
              color: "from-emerald-500 to-green-500" 
            },
            { 
              icon: FiUsers, 
              label: "AI Powered", 
              value: "Dynamic", 
              color: "from-purple-500 to-pink-500" 
            }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg text-white shadow-md`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Form */}
        <div className="space-y-8">
          {/* Topic Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <TopicSelector 
              selectedTopic={selectedTopic} 
              onTopicSelect={handleTopicSelect} 
            />
          </motion.div>

          {/* Custom Topic Input (conditional) */}
          <CustomTopicInput 
            isVisible={selectedTopic === 'Other'}
            customTopic={customTopic}
            onCustomTopicChange={handleCustomTopicChange}
          />

          {/* Difficulty Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <DifficultySelector 
              selectedDifficulty={selectedDifficulty} 
              onDifficultySelect={handleDifficultySelect} 
            />
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </motion.div>
          )}

          {/* Start Test Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <StartTestButton
              isDisabled={!isFormValid()}
              isLoading={isLoading}
              onClick={handleStartTest}
              selectedTopic={selectedTopic}
              selectedDifficulty={selectedDifficulty}
              customTopic={customTopic}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StartTestPage;
