import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBell, 
  FiUser, 
  FiLogOut,
  FiShield,
  FiClock
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ onLogout, userStats = null }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications] = useState([
    { id: 1, message: "5 new user registrations", time: "5 min ago", type: "info" },
    { id: 2, message: "System backup completed", time: "1 hour ago", type: "success" },
    { id: 3, message: "High server load detected", time: "2 hours ago", type: "warning" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    onLogout && onLogout();
    navigate('/auth');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        {/* Left section - Admin info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FiShield className="text-red-600" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">System Administration Panel</p>
            </div>
          </div>

          {/* System status indicator */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">System Online</span>
          </div>
        </div>

        {/* Center section - Quick stats */}
        {userStats && (
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{userStats.totalUsers || 0}</div>
              <div className="text-xs text-gray-500">Users</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{userStats.activeTests || 0}</div>
              <div className="text-xs text-gray-500">Active Tests</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{userStats.totalQuestions || 0}</div>
              <div className="text-xs text-gray-500">Questions</div>
            </div>
          </div>
        )}

        {/* Right section - Controls */}
        <div className="flex items-center space-x-4">
          {/* Current time */}
          <div className="hidden sm:flex items-center space-x-2 text-gray-600">
            <FiClock size={16} />
            <span className="text-sm font-mono">{formatTime(currentTime)}</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors relative"
            >
              <FiBell size={20} className="text-gray-600" />
              {notifications.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">
                    {notifications.length > 9 ? '9+' : notifications.length}
                  </span>
                </div>
              )}
            </motion.button>
          </div>

          {/* Admin profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-gray-900">Administrator</div>
              <div className="text-xs text-gray-500">Super Admin</div>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
              <FiUser size={20} className="text-blue-600" />
            </div>
          </div>

          {/* Logout button */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-200"
          >
            <FiLogOut size={16} />
            <span className="hidden sm:inline text-sm font-medium">Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Notification dropdown (could be expanded in future) */}
      {/* This would typically be a dropdown showing the notifications array */}
    </motion.div>
  );
};

export default AdminHeader;
