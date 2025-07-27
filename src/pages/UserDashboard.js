import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // Using new axios instance
import { useToast } from '../contexts/ToastContext';

// Dashboard Components
import UserProfileCard from '../components/Dashboard/UserProfileCard';
import StatCards from '../components/Dashboard/StatCards';
import PerformanceTrends from '../components/Dashboard/PerformanceTrends';
import TestHistoryTable from '../components/Dashboard/TestHistoryTable';
import QuickStartPanel from '../components/Dashboard/QuickStartPanel';
import AuthErrorModal from '../components/Auth/AuthErrorModal';

// Icons
import { FiHome, FiRefreshCw } from 'react-icons/fi';

// Hooks
import { useAuthErrors } from '../hooks/useAuthErrors';

const UserDashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    sessionExpired,
    accessForbidden,
    forbiddenMessage,
    dismissSessionExpired,
    dismissAccessForbidden
  } = useAuthErrors();

  const [dashboardData, setDashboardData] = useState({
    stats: null,
    history: [],
    performance: [],
    loading: true,
    error: null
  });

  const [refreshing, setRefreshing] = useState(false);

  // Fetch dashboard data - stable function without dependencies
  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    try {
      setRefreshing(true);
      
      console.log('🔄 Fetching dashboard data...');
      
      // Fetch user history with enhanced error handling
      let history = [];
      let historyError = null;
      
      try {
        console.log('📊 Fetching user history from /user/user-history...');
        const historyResponse = await axiosInstance.get('/user/user-history');
        history = historyResponse.data || [];
        console.log('✅ User history loaded successfully:', history.length, 'items');
        
        // Show success toast if this is a refresh (not initial load)
        if (isRefresh && history.length > 0) {
          toast.success(`Loaded ${history.length} test history records`);
        }
      } catch (error) {
        console.error('❌ Failed to fetch user history:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message
        });
        
        historyError = error;
        
        // Show specific toast for 403 errors (only during refresh to avoid spam)
        if (isRefresh) {
          if (error.response?.status === 403) {
            toast.warning('Unable to load test history - You may need additional permissions');
          } else if (error.response?.status === 401) {
            toast.error('Session expired - Please log in again');
          } else {
            toast.error('Failed to load test history');
          }
        }
        
        // Don't throw here - continue with empty history
        history = [];
      }
      
      // Fetch user stats (optional)
      let statsResponse = null;
      try {
        console.log('📈 Fetching user stats from /user/stats...');
        statsResponse = await axiosInstance.get('/user/stats');
        console.log('✅ User stats loaded successfully:', statsResponse.data);
        
        // Map backend response to frontend structure if needed
        if (statsResponse.data) {
          // Check if backend returns different field names and map them
          const backendStats = statsResponse.data;
          console.log('📊 Raw backend stats:', backendStats);
          
          // Map common backend field variations to frontend structure
          const mappedStats = {
            totalTests: backendStats.totalTests || backendStats.testsCompleted || backendStats.totalTestsAttempted || 0,
            averageScore: backendStats.averageScore || backendStats.avgScore || backendStats.overallAccuracy || 0,
            strongestTopic: backendStats.strongestTopic || backendStats.bestTopic || backendStats.topicStrength || 'N/A',
            weakestTopic: backendStats.weakestTopic || backendStats.worstTopic || backendStats.topicWeakness || 'N/A',
            totalTimeSpent: backendStats.totalTimeSpent || backendStats.timeSpent || backendStats.totalDuration || 0,
            completionRate: backendStats.completionRate || backendStats.testCompletionRate || 100
          };
          
          console.log('📊 Mapped stats:', mappedStats);
          statsResponse.data = mappedStats;
        }
      } catch (statsError) {
        console.log('ℹ️ Stats endpoint not available, will calculate from history');
        console.log('Stats error details:', {
          status: statsError.response?.status,
          statusText: statsError.response?.statusText,
          data: statsError.response?.data
        });
      }

      // Process history data to calculate stats and performance trends
      const calculatedStats = calculateStatsFromHistory(history);
      console.log('📊 Calculated stats from history:', calculatedStats);
      
      // Generate performance trends from history
      const performanceData = generatePerformanceData(history);

      const finalStats = statsResponse?.data || calculatedStats;
      console.log('📊 Final stats to be set:', finalStats);
      console.log('📊 Stats source:', statsResponse?.data ? 'backend' : 'calculated');
      
      // Ensure stats structure is valid before setting
      const validatedStats = {
        totalTests: Number(finalStats.totalTests) || 0,
        averageScore: Number(finalStats.averageScore) || 0,
        strongestTopic: finalStats.strongestTopic || 'N/A',
        weakestTopic: finalStats.weakestTopic || 'N/A',
        totalTimeSpent: Number(finalStats.totalTimeSpent) || 0,
        completionRate: Number(finalStats.completionRate) || 0
      };
      
      console.log('📊 Validated stats:', validatedStats);

      setDashboardData({
        stats: validatedStats,
        history: history,
        performance: performanceData,
        loading: false,
        error: historyError ? getErrorMessage(historyError) : null
      });

      // Show success message for successful refresh
      if (isRefresh && !historyError) {
        toast.success('Dashboard refreshed successfully');
      }

    } catch (error) {
      console.error('❌ Failed to fetch dashboard data:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url
      });
      
      const errorMessage = getErrorMessage(error);
      
      // Show error toast only during refresh to avoid spam
      if (isRefresh) {
        toast.error(`Failed to load dashboard: ${errorMessage}`);
      }
      
      // Show error state instead of fallback data
      setDashboardData({
        stats: null,
        history: [],
        performance: [],
        loading: false,
        error: errorMessage
      });
    } finally {
      setRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // No dependencies to prevent infinite re-renders

  // Helper function to get user-friendly error messages
  const getErrorMessage = (error) => {
    if (error.response?.status === 401) {
      return 'Session expired - Please log in again';
    } else if (error.response?.status === 403) {
      return 'Access denied - You may not have permission to view this data';
    } else if (error.response?.status >= 500) {
      return 'Server error - Please try again later';
    } else if (!error.response) {
      return 'Network error - Check your connection';
    } else {
      return `HTTP ${error.response?.status}: ${error.response?.statusText || 'Unknown error'}`;
    }
  };

  // Calculate stats from test history
  const calculateStatsFromHistory = (history) => {
    console.log('calculateStatsFromHistory - Input history:', history);
    
    if (!history || history.length === 0) {
      console.log('calculateStatsFromHistory - Empty history, returning default stats');
      return {
        totalTests: 0,
        averageScore: 0,
        strongestTopic: 'N/A',
        weakestTopic: 'N/A',
        totalTimeSpent: 0,
        completionRate: 0
      };
    }

    const totalTests = history.length;
    const totalScore = history.reduce((sum, test) => sum + (test.score || 0), 0);
    const averageScore = totalScore / totalTests;
    const totalTimeSpent = history.reduce((sum, test) => sum + (test.duration || 0), 0);
    
    console.log('calculateStatsFromHistory - Calculations:', {
      totalTests,
      totalScore,
      averageScore,
      totalTimeSpent
    });

    // Calculate topic performance
    const topicPerformance = {};
    history.forEach(test => {
      const topic = test.topic;
      if (!topicPerformance[topic]) {
        topicPerformance[topic] = { scores: [], count: 0 };
      }
      topicPerformance[topic].scores.push(test.score || 0);
      topicPerformance[topic].count++;
    });

    // Find strongest and weakest topics
    let strongestTopic = 'N/A';
    let weakestTopic = 'N/A';
    let highestAvg = 0;
    let lowestAvg = 100;

    Object.keys(topicPerformance).forEach(topic => {
      const avg = topicPerformance[topic].scores.reduce((sum, score) => sum + score, 0) / topicPerformance[topic].count;
      if (avg > highestAvg) {
        highestAvg = avg;
        strongestTopic = topic;
      }
      if (avg < lowestAvg) {
        lowestAvg = avg;
        weakestTopic = topic;
      }
    });

    // Calculate completion rate (assuming all tests in history were completed)
    const completionRate = 100;

    const finalStats = {
      totalTests,
      averageScore: Math.round(averageScore * 10) / 10,
      strongestTopic,
      weakestTopic,
      totalTimeSpent,
      completionRate
    };
    
    console.log('calculateStatsFromHistory - Final stats:', finalStats);
    
    return finalStats;
  };

  // Generate performance data for charts
  const generatePerformanceData = (history) => {
    if (!history || history.length === 0) return [];

    // Sort by date and create chart data
    const sortedHistory = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return sortedHistory.map(test => ({
      date: test.date,
      score: test.score || 0,
      tests: 1
    }));
  };

  // Refresh data
  const handleRefresh = () => {
    if (refreshing) return; // Prevent multiple simultaneous refreshes
    
    toast.info('Refreshing dashboard data...');
    fetchDashboardData(true); // Pass true to indicate this is a refresh
  };

  // Initial load
  useEffect(() => {
    fetchDashboardData(false); // Pass false to indicate this is initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty - only run on mount

  if (dashboardData.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <FiHome className="text-blue-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your learning overview</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
            {dashboardData.error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-sm text-orange-700 bg-orange-50 px-4 py-3 rounded-lg border border-orange-200 shadow-sm max-w-md"
              >
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-2 h-2 bg-orange-400 rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium">Data Loading Issue</p>
                    <p className="text-orange-600 mt-1">{dashboardData.error}</p>
                    <p className="text-orange-600 text-xs mt-1">
                      {dashboardData.error.includes('403') ? 
                        'Check with admin if you should have access to test history.' :
                        'Try refreshing or contact support if the issue persists.'
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            <motion.button
              onClick={handleRefresh}
              disabled={refreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              <FiRefreshCw className={`${refreshing ? 'animate-spin' : ''}`} size={16} />
              <span>Refresh</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Top Row - Profile and Quick Start */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UserProfileCard />
          </div>
          <div className="lg:col-span-2">
            <QuickStartPanel />
          </div>
        </div>

        {/* Stats Cards */}
        {console.log('🎯 Rendering StatCards with stats:', dashboardData.stats)}
        <StatCards stats={dashboardData.stats} />

        {/* Charts and History Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <PerformanceTrends performanceData={dashboardData.performance} />
          <div className="xl:col-span-1">
            <TestHistoryTable testHistory={dashboardData.history} />
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-8 text-gray-500 text-sm"
        >
          <p>Keep practicing to improve your skills! 🚀</p>
          <p className="mt-1">
            Last updated: {new Date().toLocaleString()}
          </p>
        </motion.div>
      </div>
      
      {/* Auth Error Modal */}
      <AuthErrorModal
        sessionExpired={sessionExpired}
        accessForbidden={accessForbidden}
        forbiddenMessage={forbiddenMessage}
        onDismissSession={dismissSessionExpired}
        onDismissForbidden={dismissAccessForbidden}
      />
    </div>
  );
};

export default UserDashboard;
