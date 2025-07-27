import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiHelpCircle, 
  FiCalendar, 
  FiTarget, 
  FiSearch,
  FiFilter,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiAlertTriangle,
  FiX
} from 'react-icons/fi';

const QuestionAuditTable = ({ questions = [], loading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const questionsPerPage = 10;

  // Sample data if no real data provided
  const sampleQuestions = [
    {
      id: 1,
      questionText: "What is the time complexity of finding an element in a Binary Search Tree (BST)?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctOption: "B",
      topic: "DSA",
      difficulty: "EASY",
      createdAt: "2025-01-26T10:30:00Z",
      type: "MCQ"
    },
    {
      id: 2,
      questionText: "Which scheduling algorithm is used in round-robin scheduling?",
      options: ["FIFO", "Time slicing", "Priority based", "Shortest job first"],
      correctOption: "B",
      topic: "OS",
      difficulty: "MEDIUM",
      createdAt: "2025-01-26T09:15:00Z",
      type: "MCQ"
    },
    {
      id: 3,
      questionText: "What is the purpose of normalization in databases?",
      options: ["Reduce data redundancy", "Increase data speed", "Create backups", "Encrypt data"],
      correctOption: "A",
      topic: "Database",
      difficulty: "MEDIUM",
      createdAt: "2025-01-26T08:45:00Z",
      type: "MCQ"
    },
    {
      id: 4,
      questionText: "Which layer of OSI model handles error detection and correction?",
      options: ["Physical", "Data Link", "Network", "Transport"],
      correctOption: "B",
      topic: "Networking",
      difficulty: "HARD",
      createdAt: "2025-01-25T16:20:00Z",
      type: "MCQ"
    }
  ];

  const data = questions.length > 0 ? questions : sampleQuestions;

  // Get unique topics and difficulties for filters
  const topics = ['all', ...new Set(data.map(q => q.topic))];
  const difficulties = ['all', ...new Set(data.map(q => q.difficulty))];

  // Filter and search questions
  const filteredQuestions = data
    .filter(question => {
      const matchesSearch = question.questionText.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTopic = filterTopic === 'all' || question.topic === filterTopic;
      const matchesDifficulty = filterDifficulty === 'all' || question.difficulty === filterDifficulty;
      return matchesSearch && matchesTopic && matchesDifficulty;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + questionsPerPage);

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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const truncateText = (text, maxLength = 80) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Check for potential issues in questions
  const checkQuestionIssues = (question) => {
    const issues = [];
    
    if (question.questionText.length < 10) {
      issues.push('Question too short');
    }
    
    if (question.options && question.options.length < 4) {
      issues.push('Less than 4 options');
    }
    
    if (question.options && question.options.some(opt => opt.length < 2)) {
      issues.push('Very short options');
    }
    
    return issues;
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <FiHelpCircle className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">Question Audit</h3>
            <span className="text-sm text-gray-500">({filteredQuestions.length} questions)</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search questions by content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiTarget className="text-gray-500" size={16} />
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
              <FiFilter className="text-gray-500" size={16} />
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
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th 
                  className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleSort('questionText')}
                >
                  Question
                </th>
                <th 
                  className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleSort('topic')}
                >
                  Topic
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Difficulty</th>
                <th 
                  className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center space-x-1">
                    <FiCalendar size={16} />
                    <span>Created</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedQuestions.map((question, index) => {
                const issues = checkQuestionIssues(question);
                return (
                  <motion.tr
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 max-w-xs">
                      <div className="text-sm text-gray-900">
                        {truncateText(question.questionText)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{question.topic}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{formatDate(question.createdAt)}</span>
                    </td>
                    <td className="py-4 px-4">
                      {issues.length > 0 ? (
                        <div className="flex items-center space-x-1">
                          <FiAlertTriangle className="text-yellow-500" size={16} />
                          <span className="text-xs text-yellow-600">{issues.length} issue(s)</span>
                        </div>
                      ) : (
                        <span className="text-xs text-green-600">✓ OK</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => setSelectedQuestion(question)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors text-sm"
                      >
                        <FiEye size={16} />
                        <span>View</span>
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + questionsPerPage, filteredQuestions.length)} of {filteredQuestions.length} questions
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronLeft size={20} />
              </button>
              
              <div className="flex items-center space-x-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <FiHelpCircle size={48} className="mx-auto" />
            </div>
            <p className="text-gray-600">No questions found</p>
            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </motion.div>

      {/* Question Detail Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Question Details</h3>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Question:</label>
                <p className="text-gray-900 mt-1">{selectedQuestion.questionText}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Options:</label>
                <div className="mt-2 space-y-2">
                  {selectedQuestion.options?.map((option, index) => (
                    <div 
                      key={index}
                      className={`p-2 rounded-lg border ${
                        selectedQuestion.correctOption === String.fromCharCode(65 + index)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + index)}:</span> {option}
                      {selectedQuestion.correctOption === String.fromCharCode(65 + index) && (
                        <span className="ml-2 text-green-600 font-bold">✓ Correct</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Topic:</label>
                  <p className="text-gray-900">{selectedQuestion.topic}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Difficulty:</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                    {selectedQuestion.difficulty}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Created At:</label>
                <p className="text-gray-900">{formatDate(selectedQuestion.createdAt)}</p>
              </div>

              {checkQuestionIssues(selectedQuestion).length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiAlertTriangle className="text-yellow-600" size={16} />
                    <span className="text-sm font-medium text-yellow-800">Potential Issues:</span>
                  </div>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {checkQuestionIssues(selectedQuestion).map((issue, index) => (
                      <li key={index}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default QuestionAuditTable;
