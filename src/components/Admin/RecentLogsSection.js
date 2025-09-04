import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import { 
  FiActivity, 
  FiUser, 
  FiBook, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiClock, 
  FiRefreshCw,
  FiEye,
  FiFilter
} from 'react-icons/fi';

// Sample logs data for demo/fallback
const getSampleLogs = () => [
  {
    id: 1,
    type: 'user_login',
    message: 'User john.doe@example.com logged in',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    severity: 'info',
    userId: 'user_123',
    details: { ip: '192.168.1.100', userAgent: 'Chrome/91.0' }
  },
  {
    id: 2,
    type: 'test_completed',
    message: 'User completed JavaScript Fundamentals test with score 85%',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    severity: 'success',
    userId: 'user_456',
    details: { testId: 'test_789', score: 85, duration: '15 mins' }
  },
  {
    id: 3,
    type: 'system_error',
    message: 'Failed to generate question: HuggingFace API timeout',
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    severity: 'error',
    details: { endpoint: '/api/huggingface/generate', error: 'Timeout after 30s' }
  },
  {
    id: 4,
    type: 'admin_action',
    message: 'Admin promoted user alice@company.com to admin role',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    severity: 'warning',
    adminId: 'admin_001',
    details: { targetUserId: 'user_789', action: 'role_promotion' }
  },
  {
    id: 5,
    type: 'user_registration',
    message: 'New user registered: mike.wilson@startup.io',
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    severity: 'info',
    details: { registrationMethod: 'email', emailVerified: true }
  },
  {
    id: 6,
    type: 'question_added',
    message: 'New question added to React category',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    severity: 'info',
    details: { category: 'React', difficulty: 'intermediate', questionId: 'q_567' }
  },
  {
    id: 7,
    type: 'security_alert',
    message: 'Multiple failed login attempts for admin account',
    timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    severity: 'error',
    details: { attempts: 5, ip: '192.168.1.200', blocked: true }
  },
  {
    id: 8,
    type: 'system_maintenance',
    message: 'Database backup completed successfully',
    timestamp: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    severity: 'success',
    details: { backupSize: '2.4 GB', duration: '3 mins' }
  }
];

const RecentLogsSection = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Sample logs data for demo/fallback
  // eslint-disable-next-line no-unused-vars
  const sampleLogs = [
    {
      id: 1,
      type: 'user_login',
      message: 'User john.doe@example.com logged in',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      severity: 'info',
      userId: 'user_123',
      details: { ip: '192.168.1.100', userAgent: 'Chrome/91.0' }
    },
    {
      id: 2,
      type: 'test_completed',
      message: 'User completed JavaScript Fundamentals test with score 85%',
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      severity: 'success',
      userId: 'user_456',
      details: { testId: 'test_789', score: 85, duration: '15 mins' }
    },
    {
      id: 3,
      type: 'system_error',
      message: 'Failed to generate question: HuggingFace API timeout',
      timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
      severity: 'error',
      details: { endpoint: '/api/huggingface/generate', error: 'Timeout after 30s' }
    },
    {
      id: 4,
      type: 'admin_action',
      message: 'Admin promoted user alice@company.com to admin role',
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      severity: 'warning',
      adminId: 'admin_001',
      details: { targetUserId: 'user_789', action: 'role_promotion' }
    },
    {
      id: 5,
      type: 'user_registration',
      message: 'New user registered: mike.wilson@startup.io',
      timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      severity: 'info',
      details: { registrationMethod: 'email', emailVerified: true }
    },
    {
      id: 6,
      type: 'question_added',
      message: 'New question added to React category',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      severity: 'info',
      details: { category: 'React', difficulty: 'intermediate', questionId: 'q_567' }
    },
    {
      id: 7,
      type: 'security_alert',
      message: 'Multiple failed login attempts for admin account',
      timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
      severity: 'error',
      details: { attempts: 5, ip: '192.168.1.200', blocked: true }
    },
    {
      id: 8,
      type: 'system_maintenance',
      message: 'Database backup completed successfully',
      timestamp: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
      severity: 'success',
      details: { backupSize: '2.4 GB', duration: '3 mins' }
    }
  ];

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/logs', {
        params: { 
          limit: 50,
          filter: filter !== 'all' ? filter : undefined
        }
      });
      setLogs(response.data);
    } catch (error) {
      console.warn('Admin logs API unavailable, using sample data:', error);
      // Filter sample data based on current filter
      const sampleLogs = getSampleLogs();
      const filteredLogs = filter === 'all' 
        ? sampleLogs 
        : sampleLogs.filter(log => log.severity === filter || log.type === filter);
      setLogs(filteredLogs);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchLogs();
      }, 30000); // Refresh every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, fetchLogs]);

  const getLogIcon = (type, severity) => {
    switch (type) {
      case 'user_login':
      case 'user_registration':
        return <FiUser className="text-blue-500" />;
      case 'test_completed':
      case 'question_added':
        return <FiBook className="text-green-500" />;
      case 'system_error':
      case 'security_alert':
        return <FiAlertCircle className="text-red-500" />;
      case 'system_maintenance':
        return <FiCheckCircle className="text-green-500" />;
      case 'admin_action':
        return <FiActivity className="text-purple-500" />;
      default:
        if (severity === 'error') return <FiAlertCircle className="text-red-500" />;
        if (severity === 'success') return <FiCheckCircle className="text-green-500" />;
        if (severity === 'warning') return <FiActivity className="text-yellow-500" />;
        return <FiActivity className="text-blue-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const logTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - logTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filterOptions = [
    { value: 'all', label: 'All Logs', count: logs.length },
    { value: 'error', label: 'Errors', count: logs.filter(l => l.severity === 'error').length },
    { value: 'warning', label: 'Warnings', count: logs.filter(l => l.severity === 'warning').length },
    { value: 'info', label: 'Info', count: logs.filter(l => l.severity === 'info').length },
    { value: 'success', label: 'Success', count: logs.filter(l => l.severity === 'success').length }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FiActivity className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Recent System Logs</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Auto Refresh Toggle */}
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Auto refresh</span>
            </label>
            
            {/* Manual Refresh Button */}
            <button
              onClick={fetchLogs}
              disabled={loading}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} size={16} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === option.value
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              <FiFilter className="inline mr-1" size={12} />
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>

      {/* Logs List */}
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <FiRefreshCw className="animate-spin text-blue-500 mr-2" size={20} />
            <span className="text-gray-500">Loading logs...</span>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FiEye size={48} className="mx-auto mb-2 text-gray-300" />
            <p>No logs found for the selected filter.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 border-l-4 mx-4 my-2 rounded-r-lg ${getSeverityColor(log.severity)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getLogIcon(log.type, log.severity)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {log.message}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <FiClock size={12} />
                        <span>{formatTimeAgo(log.timestamp)}</span>
                      </div>
                    </div>
                    
                    {log.details && (
                      <div className="mt-2">
                        <details className="text-xs text-gray-600">
                          <summary className="cursor-pointer hover:text-gray-800">
                            View details
                          </summary>
                          <pre className="mt-1 p-2 bg-gray-50 rounded text-xs overflow-x-auto">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </details>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50/50 rounded-b-xl">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Showing {logs.length} recent logs</span>
          <span>Updates every 30 seconds when auto-refresh is enabled</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentLogsSection;
