import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../api/axiosInstance'; // Use axiosInstance instead of plain axios

// Admin Components
import AdminHeader from '../components/Admin/AdminHeader';
import AdminSidebar from '../components/Admin/AdminSidebar';
import AdminStatsCards from '../components/Admin/AdminStatsCards';
import UserListTable from '../components/Admin/UserListTable';
import TestLogsTable from '../components/Admin/TestLogsTable';
import QuestionAuditTable from '../components/Admin/QuestionAuditTable';

// Icons
import { FiBarChart2, FiSettings } from 'react-icons/fi';

// Sample data for fallback/demo (moved outside component to avoid dependency issues)
const sampleStats = {
  totalUsers: 1247,
  totalQuestions: 3892,
  totalTests: 5674,
  avgScore: 78.5,
  activeUsers: 342,
  questionsToday: 128,
  systemHealth: 99.2,
  pendingReviews: 23
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [adminStats, setAdminStats] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/stats');
        setAdminStats(response.data);
      } catch (error) {
        console.warn('Admin stats API unavailable, using sample data:', error);
        // Use sample data as fallback
        setAdminStats(sampleStats);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    setActiveTab('user-tests');
  };

  const handleBackToUsers = () => {
    setSelectedUserId(null);
    setActiveTab('users');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <AdminStatsCards stats={adminStats} loading={loading} />
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <FiBarChart2 className="text-blue-600" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">System Analytics</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Monitor system performance and user engagement metrics.
                </p>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                >
                  View Analytics
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <FiSettings className="text-green-600" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Configure system parameters and administrative settings.
                </p>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                >
                  Manage Settings
                </button>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'users':
        return (
          <motion.div
            key="users"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <UserListTable onUserSelect={handleUserSelect} />
          </motion.div>
        );

      case 'user-tests':
        return (
          <motion.div
            key="user-tests"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TestLogsTable 
              userId={selectedUserId} 
              onBack={handleBackToUsers}
            />
          </motion.div>
        );

      case 'questions':
        return (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionAuditTable />
          </motion.div>
        );

      case 'analytics':
        return (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">System Analytics</h2>
            <div className="text-center text-gray-500 py-12">
              <FiBarChart2 size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Advanced analytics dashboard coming soon...</p>
              <p className="text-sm mt-2">This will include detailed charts, trends, and insights.</p>
            </div>
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Settings</h2>
            <div className="text-center text-gray-500 py-12">
              <FiSettings size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Administrative settings panel coming soon...</p>
              <p className="text-sm mt-2">This will include system configuration options.</p>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 text-center"
          >
            <p className="text-gray-500">Select a section from the sidebar to begin.</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <AdminHeader userStats={adminStats} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AdminSidebar 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
            />
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
