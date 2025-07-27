import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCalendar, 
  FiTarget, 
  FiTrendingUp, 
  FiEye, 
  FiFilter,
  FiDownload,
  FiClock
} from 'react-icons/fi';

const TestHistoryTable = ({ testHistory = [] }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  // Sample data if no real data provided
  const sampleHistory = [
    {
      id: 1,
      date: '2025-01-26',
      topic: 'DSA',
      score: 85,
      difficulty: 'MEDIUM',
      duration: 1200,
      totalQuestions: 10,
      correctAnswers: 8
    },
    {
      id: 2,
      date: '2025-01-25',
      topic: 'OS',
      score: 72,
      difficulty: 'EASY',
      duration: 900,
      totalQuestions: 10,
      correctAnswers: 7
    },
    {
      id: 3,
      date: '2025-01-24',
      topic: 'Networking',
      score: 90,
      difficulty: 'HARD',
      duration: 1800,
      totalQuestions: 10,
      correctAnswers: 9
    },
    {
      id: 4,
      date: '2025-01-23',
      topic: 'DSA',
      score: 68,
      difficulty: 'EASY',
      duration: 800,
      totalQuestions: 10,
      correctAnswers: 6
    },
    {
      id: 5,
      date: '2025-01-22',
      topic: 'Database',
      score: 95,
      difficulty: 'MEDIUM',
      duration: 1500,
      totalQuestions: 10,
      correctAnswers: 9
    }
  ];

  const data = testHistory.length > 0 ? testHistory : sampleHistory;

  // Get unique topics and difficulties for filters
  const topics = ['all', ...new Set(data.map(test => test.topic))];
  const difficulties = ['all', ...new Set(data.map(test => test.difficulty))];

  // Sort and filter data
  const processedData = data
    .filter(test => filterTopic === 'all' || test.topic === filterTopic)
    .filter(test => filterDifficulty === 'all' || test.difficulty === filterDifficulty)
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <FiCalendar className="text-blue-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Test History</h3>
          <span className="text-sm text-gray-500">({processedData.length} tests)</span>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
            <FiDownload size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-500" size={16} />
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {topics.map(topic => (
              <option key={topic} value={topic}>
                {topic === 'all' ? 'All Topics' : topic}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <FiTarget className="text-gray-500" size={16} />
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Difficulties' : difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th 
                className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  {sortBy === 'date' && (
                    <FiTrendingUp className={`transform transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} size={14} />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => handleSort('topic')}
              >
                <div className="flex items-center space-x-1">
                  <span>Topic</span>
                  {sortBy === 'topic' && (
                    <FiTrendingUp className={`transform transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} size={14} />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => handleSort('score')}
              >
                <div className="flex items-center space-x-1">
                  <span>Score</span>
                  {sortBy === 'score' && (
                    <FiTrendingUp className={`transform transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} size={14} />
                  )}
                </div>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Difficulty</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {processedData.map((test, index) => (
              <motion.tr
                key={test.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="text-gray-400" size={14} />
                    <span className="text-sm text-gray-900">{formatDate(test.date)}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900">{test.topic}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-bold ${getScoreColor(test.score)}`}>
                      {test.score}%
                    </span>
                    <span className="text-xs text-gray-500">
                      ({test.correctAnswers}/{test.totalQuestions})
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                    {test.difficulty}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <FiClock size={14} />
                    <span>{formatDuration(test.duration)}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                    <FiEye size={16} />
                    <span className="text-sm">View</span>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {processedData.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <FiCalendar size={48} className="mx-auto" />
          </div>
          <p className="text-gray-600">No test history found</p>
          <p className="text-sm text-gray-500">Take your first test to see results here</p>
        </div>
      )}
    </motion.div>
  );
};

export default TestHistoryTable;
