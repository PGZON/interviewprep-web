import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiUsers, 
  FiHelpCircle, 
  FiBarChart2,
  FiSettings,
  FiShield
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
      className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 h-fit sticky top-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-100">
        <div className="p-2 bg-red-100 rounded-lg">
          <FiShield className="text-red-600" size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
          <p className="text-sm text-gray-600">System management</p>
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
                ? 'bg-blue-50 border-2 border-blue-200 text-blue-700'
                : 'hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon 
                size={20} 
                className={activeTab === item.id ? 'text-blue-600' : 'text-gray-500'} 
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-500 mt-1">{item.description}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="text-center text-xs text-gray-500">
          <p>Admin Panel v1.0</p>
          <p className="mt-1">Secure Access Only</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
