import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiFileText, 
  FiClock, 
  FiTarget,
  FiTrendingUp,
  FiEye,
  FiFilter,
  FiCalendar,
  FiChevronRight
} from 'react-icons/fi';

const ReviewPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');

  const filters = [
    { id: 'all', name: 'All Tests', count: 28 },
    { id: 'passed', name: 'Passed', count: 23 },
    { id: 'failed', name: 'Failed', count: 5 },
    { id: 'javascript', name: 'JavaScript', count: 12 },
    { id: 'react', name: 'React', count: 8 },
    { id: 'algorithms', name: 'Algorithms', count: 8 }
  ];

  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'score', name: 'Highest Score' },
    { id: 'duration', name: 'Shortest Time' }
  ];

  // Mock data for test attempts
  const testAttempts = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      category: 'JavaScript',
      score: 92,
      totalQuestions: 25,
      correctAnswers: 23,
      duration: '28 min',
      date: '2024-01-26',
      difficulty: 'Medium',
      status: 'passed'
    },
    {
      id: 2,
      title: 'React Hooks & State',
      category: 'React',
      score: 88,
      totalQuestions: 20,
      correctAnswers: 18,
      duration: '22 min',
      date: '2024-01-25',
      difficulty: 'Medium',
      status: 'passed'
    },
    {
      id: 3,
      title: 'Algorithms & Data Structures',
      category: 'Algorithms',
      score: 76,
      totalQuestions: 15,
      correctAnswers: 11,
      duration: '45 min',
      date: '2024-01-24',
      difficulty: 'Hard',
      status: 'passed'
    },
    {
      id: 4,
      title: 'Node.js Backend',
      category: 'Node.js',
      score: 64,
      totalQuestions: 20,
      correctAnswers: 13,
      duration: '35 min',
      date: '2024-01-23',
      difficulty: 'Medium',
      status: 'failed'
    },
    {
      id: 5,
      title: 'CSS & Styling',
      category: 'CSS',
      score: 95,
      totalQuestions: 18,
      correctAnswers: 17,
      duration: '15 min',
      date: '2024-01-22',
      difficulty: 'Easy',
      status: 'passed'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Review</h1>
          <p className="text-gray-600 mt-1">Review your past test attempts and track your progress</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
            <FiFilter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <FiFilter className="text-gray-500" />
          <span className="font-medium text-gray-900">Filter by</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedFilter === filter.id
                  ? 'bg-blue-100 text-blue-600 border border-blue-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent'
              }`}
            >
              {filter.name} ({filter.count})
            </button>
          ))}
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiFileText className="text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Tests</div>
              <div className="text-2xl font-bold text-gray-900">28</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FiTarget className="text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Average Score</div>
              <div className="text-2xl font-bold text-gray-900">85%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Improvement</div>
              <div className="text-2xl font-bold text-gray-900">+12%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FiClock className="text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Time</div>
              <div className="text-2xl font-bold text-gray-900">12h</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Test Attempts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Test Attempts</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {testAttempts.map((attempt, index) => (
            <motion.div
              key={attempt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h4 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {attempt.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(attempt.difficulty)}`}>
                      {attempt.difficulty}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(attempt.score)}`}>
                      {attempt.score}%
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FiFileText className="mr-1" size={14} />
                      {attempt.correctAnswers}/{attempt.totalQuestions} correct
                    </span>
                    <span className="flex items-center">
                      <FiClock className="mr-1" size={14} />
                      {attempt.duration}
                    </span>
                    <span className="flex items-center">
                      <FiCalendar className="mr-1" size={14} />
                      {new Date(attempt.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <FiEye size={16} />
                    <span>Review</span>
                  </motion.button>
                  <FiChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewPage;
