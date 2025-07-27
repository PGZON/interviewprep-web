import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiCalendar, FiAward, FiTarget, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import axiosInstance from '../../api/axiosInstance';

const UserProfileCard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/user/me');
      setUserInfo(response.data);
      console.log('User info loaded:', response.data);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url
      });
      
      let errorMessage = 'Failed to load user info';
      
      if (error.response?.status === 401) {
        errorMessage = 'Session expired - Please log in again';
      } else if (error.response?.status === 403) {
        errorMessage = 'Access denied - Insufficient permissions';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server error - Please try again later';
      } else if (!error.response) {
        errorMessage = 'Network error - Check your connection';
      } else {
        errorMessage = `Error ${error.response?.status || 'Unknown'}`;
      }
      
      setError(errorMessage);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
      >
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    const isAuthError = error.includes('Session expired') || error.includes('Access denied');
    const ErrorIcon = isAuthError ? FiAlertCircle : FiUser;
    const errorColor = isAuthError ? 'text-orange-600' : 'text-red-600';
    const bgColor = isAuthError ? 'bg-orange-50' : 'bg-red-50';
    const buttonColor = isAuthError ? 'bg-orange-50 hover:bg-orange-100 text-orange-600' : 'bg-blue-50 hover:bg-blue-100 text-blue-600';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
      >
        <div className="text-center">
          <div className={`${errorColor} mb-4`}>
            <ErrorIcon size={48} className="mx-auto mb-2" />
            <p className="font-medium">Failed to Load Profile</p>
            <p className="text-sm text-gray-600 mt-1">{error}</p>
          </div>
          {!isAuthError && (
            <button
              onClick={fetchUserInfo}
              className={`flex items-center space-x-2 mx-auto px-4 py-2 ${buttonColor} rounded-lg transition-colors`}
            >
              <FiRefreshCw size={16} />
              <span>Retry</span>
            </button>
          )}
          {isAuthError && (
            <div className={`mt-3 p-3 ${bgColor} rounded-lg text-sm`}>
              Please refresh the page or log in again
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  if (!userInfo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
      >
        <div className="text-center text-gray-500">
          <FiUser size={48} className="mx-auto mb-2" />
          <p>No user data available</p>
          <button
            onClick={fetchUserInfo}
            className="mt-2 text-blue-600 hover:text-blue-800 underline"
          >
            Try again
          </button>
        </div>
      </motion.div>
    );
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
    >
      <div className="flex items-center space-x-4 mb-6">
        {/* Profile Avatar */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {getInitials(userInfo.name || 'User')}
          </div>
          {userInfo.streak > 0 && (
            <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {userInfo.streak}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {userInfo.name || 'User'}
          </h2>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <FiMail className="mr-2" size={14} />
            {userInfo.email}
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <FiUser className="mr-2" size={12} />
            {userInfo.role || 'Student'}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <FiTarget className="text-blue-600" size={16} />
          </div>
          <div className="text-lg font-bold text-blue-600">{userInfo.streak || 0}</div>
          <div className="text-xs text-gray-600">Day Streak</div>
        </div>

        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <FiCalendar className="text-green-600" size={16} />
          </div>
          <div className="text-lg font-bold text-green-600">
            {userInfo.joinDate ? formatDate(userInfo.joinDate) : 'Today'}
          </div>
          <div className="text-xs text-gray-600">Member Since</div>
        </div>

        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <FiAward className="text-purple-600" size={16} />
          </div>
          <div className="text-lg font-bold text-purple-600">
            {userInfo.lastLogin ? formatDate(userInfo.lastLogin) : 'Today'}
          </div>
          <div className="text-xs text-gray-600">Last Login</div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfileCard;
