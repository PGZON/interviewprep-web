import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { FiActivity, FiClock, FiAward, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    testsCompleted: 0,
    averageScore: 0,
    streak: 0,
    totalPracticeTime: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data fetch - replace with actual API calls
    setTimeout(() => {
      setStats({
        testsCompleted: 15,
        averageScore: 85,
        streak: 5,
        totalPracticeTime: 2400 // in minutes
      });
      setRecentActivities([
        { id: 1, type: 'test', name: 'Data Structures', score: 90, date: '2025-09-05' },
        { id: 2, type: 'test', name: 'Algorithms', score: 85, date: '2025-09-04' },
        { id: 3, type: 'practice', name: 'System Design', duration: 45, date: '2025-09-03' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);



  return (
    <DashboardLayout>
      <div className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name || 'User'}! 👋
              </h1>
              <p className="mt-2 text-gray-600">
                Ready to ace your next technical interview? Let's practice!
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <FiActivity className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Tests Completed</h3>
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">{stats.testsCompleted}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <FiTrendingUp className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Average Score</h3>
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">{stats.averageScore}%</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <FiAward className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Current Streak</h3>
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">{stats.streak} days</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <FiClock className="w-6 h-6 text-purple-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Practice Time</h3>
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">
                  {Math.floor(stats.totalPracticeTime / 60)}h {stats.totalPracticeTime % 60}m
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="py-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{activity.name}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      {activity.type === 'test' ? (
                        <p className="font-semibold text-green-600">{activity.score}%</p>
                      ) : (
                        <p className="font-semibold text-blue-600">{activity.duration} min</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/tests')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-6 text-left shadow-sm transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">Start Practice Test</h3>
                <p className="text-indigo-100">Test your knowledge with our curated questions</p>
              </button>
              
              <button
                onClick={() => navigate('/progress')}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-6 text-left shadow-sm transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">View Detailed Progress</h3>
                <p className="text-purple-100">Track your improvement over time</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
