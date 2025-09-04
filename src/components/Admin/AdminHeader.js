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
      className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        {/* Left section - Admin info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
              <FiShield className="text-red-400" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-gray-300">System Administration Panel</p>
            </div>
          </div>

          {/* System status indicator */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-300">System Online</span>
          </div>
        </div>

        {/* Center section - Quick stats */}
        {userStats && (
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">{userStats.totalUsers || 0}</div>
              <div className="text-xs text-gray-400">Users</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">{userStats.activeTests || 0}</div>
              <div className="text-xs text-gray-400">Active Tests</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">{userStats.totalQuestions || 0}</div>
              <div className="text-xs text-gray-400">Questions</div>
            </div>
          </div>
        )}

        {/* Right section - Controls */}
        <div className="flex items-center space-x-4">
          {/* Current time */}
          <div className="hidden sm:flex items-center space-x-2 text-gray-300">
            <FiClock size={16} />
            <span className="text-sm font-mono">{formatTime(currentTime)}</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors relative border border-white/20"
            >
              <FiBell size={20} className="text-gray-300" />
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
              <div className="text-sm font-medium text-white">Administrator</div>
              <div className="text-xs text-gray-400">Super Admin</div>
            </div>
            <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
              <FiUser size={20} className="text-blue-400" />
            </div>
          </div>

          {/* Logout button */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30"
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
