import React from 'react';
import { motion } from 'framer-motion';

const ProgressSummary = () => {
  const skills = [
    { name: 'Algorithms', progress: 75, color: 'bg-blue-500' },
    { name: 'Data Structures', progress: 85, color: 'bg-green-500' },
    { name: 'System Design', progress: 60, color: 'bg-purple-500' },
    { name: 'Problem Solving', progress: 80, color: 'bg-yellow-500' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">Skills Progress</h2>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{skill.name}</span>
              <span className="text-sm font-medium text-gray-700">{skill.progress}%</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`absolute h-full rounded-full ${skill.color}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Activity */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(7)].map((_, index) => {
            const activity = Math.floor(Math.random() * 5);
            const height = 20 + (activity * 10);
            return (
              <motion.div
                key={index}
                initial={{ height: 20 }}
                animate={{ height }}
                className="bg-indigo-100 rounded-t-md"
                style={{ height }}
                whileHover={{ scale: 1.1 }}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
            <div key={day} className="text-xs text-center text-gray-500">
              {day}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressSummary;
