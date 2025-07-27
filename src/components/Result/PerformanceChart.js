import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiPieChart, FiBarChart2 } from 'react-icons/fi';

const PerformanceChart = ({ 
  correctAnswers, 
  incorrectAnswers, 
  unanswered, 
  topic,
  difficulty 
}) => {
  // Pie chart data
  const pieData = [
    { name: 'Correct', value: correctAnswers, color: '#10B981' },
    { name: 'Incorrect', value: incorrectAnswers, color: '#EF4444' },
    { name: 'Unanswered', value: unanswered, color: '#6B7280' }
  ].filter(item => item.value > 0);

  // Bar chart data for comparison
  const barData = [
    {
      category: 'Performance',
      correct: correctAnswers,
      incorrect: incorrectAnswers,
      unanswered: unanswered
    }
  ];

  // Custom label for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            Count: <span className="font-medium">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
      <div className="flex items-center space-x-3 mb-8">
        <FiPieChart className="text-blue-600" size={24} />
        <h3 className="text-2xl font-bold text-gray-900">Performance Analytics</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <FiPieChart className="text-gray-600" size={20} />
            <h4 className="text-lg font-semibold text-gray-900">Answer Distribution</h4>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex justify-center space-x-4 mt-4">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <FiBarChart2 className="text-gray-600" size={20} />
            <h4 className="text-lg font-semibold text-gray-900">Score Breakdown</h4>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="correct" fill="#10B981" name="Correct" radius={[4, 4, 0, 0]} />
              <Bar dataKey="incorrect" fill="#EF4444" name="Incorrect" radius={[4, 4, 0, 0]} />
              <Bar dataKey="unanswered" fill="#6B7280" name="Unanswered" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200"
      >
        <h4 className="text-lg font-semibold text-blue-900 mb-3">Quick Insights</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
            <div className="text-gray-600">Questions answered correctly</div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              {correctAnswers + incorrectAnswers + unanswered > 0 
                ? Math.round((correctAnswers / (correctAnswers + incorrectAnswers + unanswered)) * 100)
                : 0}%
            </div>
            <div className="text-gray-600">Overall accuracy rate</div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 capitalize">{difficulty}</div>
            <div className="text-gray-600">Difficulty level attempted</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceChart;
