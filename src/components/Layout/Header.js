import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiMenu, 
  FiBell, 
  FiSettings, 
  FiLogOut,
  FiChevronDown,
  FiCode
} from 'react-icons/fi';
import { getCurrentUser, logout } from '../../services/authService';

const Header = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Left side - Mobile menu button */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-white/50 transition-all duration-200"
          >
            <FiMenu size={20} />
          </button>
          <div className="lg:hidden ml-2 flex items-center">
            <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg mr-2">
              <FiCode className="text-white text-sm" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700">InterviewPrep</h1>
              <p className="text-xs text-gray-500 -mt-1">AI Powered</p>
            </div>
          </div>
        </div>

        {/* Right side - User menu and actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200 relative"
          >
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200"
          >
            <FiSettings size={20} />
          </motion.button>

          {/* User dropdown */}
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/50 transition-all duration-200"
            >
              {user?.photoURL ? (
                // If user has a profile photo (Google login)
                <img 
                  src={user.photoURL} 
                  alt={user?.name || 'Profile'} 
                  className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" 
                />
              ) : (
                // Fallback to initials avatar
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              <div className="hidden sm:block text-left">
                <div className="text-base font-medium text-gray-900">
                  {user?.name || user?.displayName || user?.email?.split('@')[0] || 'User'}
                </div>
                <div className="text-sm text-gray-500">
                  {user?.email || 'user@example.com'}
                </div>
              </div>
              <FiChevronDown className="text-gray-400" size={16} />
            </motion.button>

            {/* Enhanced Dropdown menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <button
                  onClick={() => navigate('/dashboard/profile')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors rounded-lg mx-1"
                >
                  <FiSettings className="mr-3" size={16} />
                  Profile Settings
                </button>
                <hr className="my-2 border-gray-100 mx-2" />
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-colors rounded-lg mx-1"
                >
                  <FiLogOut className="mr-3" size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
