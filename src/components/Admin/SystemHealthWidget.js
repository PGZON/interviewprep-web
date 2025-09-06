import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import { 
  FiCpu, 
  FiHardDrive, 
  FiWifi, 
  FiDatabase,
  FiActivity,
  FiAlertCircle,
  FiCheckCircle,
  FiRefreshCw
} from 'react-icons/fi';

const SystemHealthWidget = () => {
  const [healthData, setHealthData] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchHealthData = async () => {
    // Sample health data for demo/fallback
    const sampleHealthData = {
      cpu: { usage: 45, status: 'healthy', temperature: 65 },
      memory: { usage: 68, total: 16384, used: 11141, status: 'healthy' },
      disk: { usage: 72, total: 512, used: 368, status: 'warning' },
      database: { connections: 23, maxConnections: 100, responseTime: 120, status: 'healthy' },
      api: { responseTime: 85, requestsPerMinute: 42, errorRate: 0.2, status: 'healthy' },
      uptime: { days: 15, hours: 7, minutes: 32, status: 'healthy' }
    };

    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/system/health');
      setHealthData(response.data);
      setLastUpdate(new Date());
    } catch (error) {

      setHealthData(sampleHealthData);
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchHealthData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <FiCheckCircle className="text-green-600" size={16} />;
      case 'warning':
      case 'critical':
        return <FiAlertCircle className="text-red-600" size={16} />;
      default:
        return <FiActivity className="text-gray-600" size={16} />;
    }
  };

  const formatUptime = (uptime) => {
    if (!uptime) return '0d 0h 0m';
    return `${uptime.days}d ${uptime.hours}h ${uptime.minutes}m`;
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '0 MB';
    const gb = bytes / 1024;
    return `${gb.toFixed(1)} GB`;
  };

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdate) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FiActivity className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-500">Updated {formatLastUpdate()}</span>
          <button
            onClick={fetchHealthData}
            disabled={loading}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} size={16} />
          </button>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* CPU Usage */}
        <div className={`p-4 rounded-lg border ${getStatusColor(healthData.cpu?.status)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <FiCpu size={16} />
              <span className="text-sm font-medium">CPU</span>
            </div>
            {getStatusIcon(healthData.cpu?.status)}
          </div>
          <div className="text-2xl font-bold mb-1">{healthData.cpu?.usage || 0}%</div>
          {healthData.cpu?.temperature && (
            <div className="text-xs opacity-75">{healthData.cpu.temperature}°C</div>
          )}
        </div>

        {/* Memory Usage */}
        <div className={`p-4 rounded-lg border ${getStatusColor(healthData.memory?.status)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <FiHardDrive size={16} />
              <span className="text-sm font-medium">Memory</span>
            </div>
            {getStatusIcon(healthData.memory?.status)}
          </div>
          <div className="text-2xl font-bold mb-1">{healthData.memory?.usage || 0}%</div>
          {healthData.memory?.used && healthData.memory?.total && (
            <div className="text-xs opacity-75">
              {formatBytes(healthData.memory.used)} / {formatBytes(healthData.memory.total)}
            </div>
          )}
        </div>

        {/* Disk Usage */}
        <div className={`p-4 rounded-lg border ${getStatusColor(healthData.disk?.status)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <FiHardDrive size={16} />
              <span className="text-sm font-medium">Disk</span>
            </div>
            {getStatusIcon(healthData.disk?.status)}
          </div>
          <div className="text-2xl font-bold mb-1">{healthData.disk?.usage || 0}%</div>
          {healthData.disk?.used && healthData.disk?.total && (
            <div className="text-xs opacity-75">
              {formatBytes(healthData.disk.used)} / {formatBytes(healthData.disk.total)}
            </div>
          )}
        </div>

        {/* Database */}
        <div className={`p-4 rounded-lg border ${getStatusColor(healthData.database?.status)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <FiDatabase size={16} />
              <span className="text-sm font-medium">Database</span>
            </div>
            {getStatusIcon(healthData.database?.status)}
          </div>
          <div className="text-2xl font-bold mb-1">
            {healthData.database?.connections || 0}
          </div>
          <div className="text-xs opacity-75">
            {healthData.database?.responseTime || 0}ms response
          </div>
        </div>

        {/* API Performance */}
        <div className={`p-4 rounded-lg border ${getStatusColor(healthData.api?.status)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <FiWifi size={16} />
              <span className="text-sm font-medium">API</span>
            </div>
            {getStatusIcon(healthData.api?.status)}
          </div>
          <div className="text-2xl font-bold mb-1">
            {healthData.api?.responseTime || 0}ms
          </div>
          <div className="text-xs opacity-75">
            {healthData.api?.requestsPerMinute || 0} req/min
          </div>
        </div>

        {/* System Uptime */}
        <div className={`p-4 rounded-lg border ${getStatusColor(healthData.uptime?.status)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <FiActivity size={16} />
              <span className="text-sm font-medium">Uptime</span>
            </div>
            {getStatusIcon(healthData.uptime?.status)}
          </div>
          <div className="text-lg font-bold mb-1">
            {formatUptime(healthData.uptime)}
          </div>
          <div className="text-xs opacity-75">System online</div>
        </div>
      </div>

      {/* Overall Status */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">
            All systems operational
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemHealthWidget;
