import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiPlayCircle, 
  FiFileText, 
  FiUser, 
  FiX,
  FiTrendingUp,
  FiAward,
  FiShield
} from 'react-icons/fi';
import { isAdmin } from '../../utils/auth';
import { getCurrentUser } from '../../services/authService';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const userIsAdmin = isAdmin();
  const user = getCurrentUser();

  const sidebarLinks = [
    { 
      path: "/dashboard", 
      label: "Dashboard", 
      icon: FiHome,
      description: "Overview & stats"
    },
    { 
      path: "/dashboard/test", 
      label: "Start Test", 
      icon: FiPlayCircle,
      description: "Practice questions"
    },
    { 
      path: "/dashboard/review", 
      label: "Review", 
      icon: FiFileText,
      description: "Past attempts"
    },
    { 
      path: "/dashboard/progress", 
      label: "Progress", 
      icon: FiTrendingUp,
      description: "Track improvement"
    },
    { 
      path: "/dashboard/achievements", 
      label: "Achievements", 
      icon: FiAward,
      description: "Badges & milestones"
    },
    { 
      path: "/dashboard/profile", 
      label: "Profile", 
      icon: FiUser,
      description: "Account settings"
    }
  ];

  // Add admin link if user is admin
  if (userIsAdmin) {
    sidebarLinks.push({
      path: "/admin",
      label: "Admin Panel",
      icon: FiShield,
      description: "System management",
      isAdmin: true
    });
  }

  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/80 backdrop-blur-md shadow-xl border-r border-white/20 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex h-full flex-col">
          {/* Logo and close button */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg border-2 border-indigo-400/30">
                  <img src="/AppLogo.svg" alt="InterviewPrep Logo" className="w-full h-full p-1.5 object-contain" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-white"></div>
              </div>
              <div>
                <h1 className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700 leading-none">InterviewPrep</h1>
                <p className="text-xs font-semibold tracking-wide text-blue-600">AI Powered</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/50 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = isActivePath(link.path);
              
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3 
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      group flex items-center space-x-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? link.isAdmin
                            ? 'bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-600 shadow-lg ring-1 ring-red-500/20'
                            : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 shadow-lg ring-1 ring-blue-500/20'
                          : link.isAdmin
                            ? 'text-red-700 hover:bg-red-50 hover:text-red-900 hover:shadow-md'
                            : 'text-gray-700 hover:bg-white/60 hover:text-gray-900 hover:shadow-md'
                      }
                    `}
                  >
                    <div className={`
                      p-2 rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? link.isAdmin
                            ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : link.isAdmin
                            ? 'bg-red-100 text-red-600 group-hover:bg-red-200 group-hover:shadow-md'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-white group-hover:shadow-md'
                      }
                    `}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-medium">{link.label}</div>
                      <div className="text-sm text-gray-500 mt-0.5">{link.description}</div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-white/20 p-4">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white shadow-md">
              {user?.photoURL ? (
                // If user has a profile photo (Google login)
                <img 
                  src={user.photoURL} 
                  alt={user?.name || 'Profile'} 
                  className="w-10 h-10 rounded-full object-cover shadow-lg" 
                />
              ) : (
                // Fallback to initials avatar
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-lg">
                  {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || user?.displayName || user?.email?.split('@')[0] || 'User'}
                </div>
                <div className="text-xs text-gray-500">
                  {user?.role === 'ADMIN' ? 'Admin' : user?.role || 'User'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
