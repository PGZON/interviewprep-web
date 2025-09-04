import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiUsers, 
  FiHelpCircle, 
  FiBarChart2,
  FiSettings,
  FiShield,
  FiActivity
} from 'react-icons/fi';

const AdminSidebar = ({ activeTab, onTabChange }) => {
  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: FiHome,
      description: 'Overview & stats'
    },
    {
      id: 'users',
      label: 'Users',
      icon: FiUsers,
      description: 'Manage users'
    },
    {
      id: 'questions',
      label: 'Questions',
      icon: FiHelpCircle,
      description: 'Question audit'
    },
    {
      id: 'logs',
      label: 'System Logs',
      icon: FiActivity,
      description: 'Recent activity'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: FiBarChart2,
      description: 'System metrics'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: FiSettings,
      description: 'Admin settings'
    }
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-white/20 h-fit sticky top-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-white/20">
        <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
          <FiShield className="text-red-400" size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Admin Panel</h2>
          <p className="text-sm text-gray-300">System management</p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-blue-500/20 border-2 border-blue-500/30 text-blue-300'
                : 'hover:bg-white/10 border-2 border-transparent text-gray-300 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon 
                size={20} 
                className={activeTab === item.id ? 'text-blue-400' : 'text-gray-400'} 
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-400 mt-1">{item.description}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-white/20">
        <div className="text-center text-xs text-gray-400">
          <p>Admin Panel v1.0</p>
          <p className="mt-1">Secure Access Only</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
