import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiTarget, 
  FiCalendar,
  FiBarChart2,
  FiActivity
} from 'react-icons/fi';

const ProgressPage = () => {
  const progressData = [
    {
      subject: "JavaScript",
      progress: 85,
      questionsAnswered: 127,
      accuracy: 78,
      color: "from-yellow-400 to-orange-500"
    },
    {
      subject: "React",
      progress: 72,
      questionsAnswered: 89,
      accuracy: 82,
      color: "from-blue-400 to-cyan-500"
    },
    {
      subject: "Node.js",
      progress: 60,
      questionsAnswered: 64,
      accuracy: 75,
      color: "from-green-400 to-emerald-500"
    },
    {
      subject: "System Design",
      progress: 45,
      questionsAnswered: 32,
      accuracy: 69,
      color: "from-purple-400 to-pink-500"
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 78 },
    { day: 'Wed', score: 82 },
    { day: 'Thu', score: 75 },
    { day: 'Fri', score: 88 },
    { day: 'Sat', score: 85 },
    { day: 'Sun', score: 92 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Progress Tracking</h1>
            <p className="text-gray-600">Monitor your learning journey and performance</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
            <FiTrendingUp size={24} />
          </div>
        </div>
      </motion.div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: "Total Questions", 
            value: "312", 
            change: "+23 this week",
            icon: FiTarget,
            color: "from-blue-500 to-cyan-500"
          },
          { 
            title: "Average Score", 
            value: "76%", 
            change: "+5% improvement",
            icon: FiBarChart2,
            color: "from-emerald-500 to-green-500"
          },
          { 
            title: "Study Streak", 
            value: "12 days", 
            change: "Keep it up!",
            icon: FiActivity,
            color: "from-orange-500 to-red-500"
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl text-white shadow-lg`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
            <div className="text-xs text-green-600 font-medium">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Subject Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FiTarget className="text-blue-600" />
          Subject Progress
        </h2>
        <div className="space-y-6">
          {progressData.map((subject, index) => (
            <div key={subject.subject} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{subject.subject}</h3>
                  <p className="text-sm text-gray-600">
                    {subject.questionsAnswered} questions • {subject.accuracy}% accuracy
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{subject.progress}%</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.progress}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className={`h-3 bg-gradient-to-r ${subject.color} rounded-full shadow-sm`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FiCalendar className="text-blue-600" />
          Weekly Performance
        </h2>
        <div className="flex items-end justify-between h-40 space-x-2">
          {weeklyProgress.map((day, index) => (
            <div key={day.day} className="flex flex-col items-center flex-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${day.score}%` }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg min-h-[20px] shadow-sm"
              />
              <div className="text-xs text-gray-600 mt-2 font-medium">{day.day}</div>
              <div className="text-xs text-gray-500">{day.score}%</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressPage;
