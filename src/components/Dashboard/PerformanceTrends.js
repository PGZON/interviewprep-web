import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { FiTrendingUp, FiBarChart2, FiCalendar } from 'react-icons/fi';

const PerformanceTrends = ({ performanceData = [] }) => {
  const [timeFilter, setTimeFilter] = useState('30'); // 7, 30, or 'all'
  const [chartType, setChartType] = useState('line'); // line or bar

  // Sample data if no real data provided
  const sampleData = [
    { date: '2025-08-01', score: 65, tests: 2 },
    { date: '2025-08-05', score: 72, tests: 1 },
    { date: '2025-08-10', score: 68, tests: 3 },
    { date: '2025-08-15', score: 78, tests: 2 },
    { date: '2025-08-20', score: 82, tests: 1 },
    { date: '2025-08-25', score: 75, tests: 2 },
    { date: '2025-08-28', score: 88, tests: 1 },
    { date: '2025-08-30', score: 85, tests: 2 },
    { date: '2025-09-01', score: 90, tests: 1 },
    { date: '2025-09-03', score: 92, tests: 2 },
    { date: '2025-09-05', score: 95, tests: 1 }
  ];

  const data = performanceData.length > 0 ? performanceData : sampleData;

  // Filter data based on time range
  const filterData = (data, days) => {
    if (days === 'all') return data;
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));
    
    return data.filter(item => new Date(item.date) >= cutoffDate);
  };

  const filteredData = filterData(data, timeFilter);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-lg border border-white/20">
          <p className="text-base font-medium text-gray-900">{formatDate(label)}</p>
          <p className="text-base text-blue-600">
            Score: <span className="font-bold">{payload[0].value}%</span>
          </p>
          {payload[1] && (
            <p className="text-base text-green-600">
              Tests: <span className="font-bold">{payload[1].value}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <FiTrendingUp className="text-blue-600" size={24} />
          <h3 className="text-2xl font-bold text-gray-900">Performance Trends</h3>
        </div>

        <div className="flex items-center space-x-2">
          {/* Chart Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-colors ${
                chartType === 'line'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiTrendingUp size={16} />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-md transition-colors ${
                chartType === 'bar'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiBarChart2 size={16} />
            </button>
          </div>

          {/* Time Filter */}
          <div className="flex items-center space-x-1">
            <FiCalendar className="text-gray-500" size={16} />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="score" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Avg Score</p>
            <p className="text-lg font-bold text-blue-600">
              {filteredData.length > 0 
                ? Math.round(filteredData.reduce((sum, item) => sum + item.score, 0) / filteredData.length)
                : 0}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Tests</p>
            <p className="text-lg font-bold text-green-600">
              {filteredData.reduce((sum, item) => sum + (item.tests || 1), 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Best Score</p>
            <p className="text-lg font-bold text-purple-600">
              {filteredData.length > 0 
                ? Math.max(...filteredData.map(item => item.score))
                : 0}%
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceTrends;
