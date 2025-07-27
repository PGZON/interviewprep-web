import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiPlayCircle, 
  FiFileText, 
  FiTrendingUp, 
  FiAward,
  FiTarget,
  FiClock,
  FiBarChart2,
  FiUser,
  FiCode,
  FiCheckCircle,
  FiActivity
} from 'react-icons/fi';
import { getCurrentUser } from '../services/authService';
import StatCard from '../components/Dashboard/StatCard';
import QuickActionCard from '../components/Dashboard/QuickActionCard';
import ActivityItem from '../components/Dashboard/ActivityItem';

const DashboardHome = () => {
  const user = getCurrentUser();

  const stats = [
    {
      label: "Tests Completed",
      value: "12",
      change: "+3 this week",
      changeType: "positive",
      icon: FiTarget,
      color: "blue"
    },
    {
      label: "Average Score",
      value: "85%",
      change: "+5% from last week",
      changeType: "positive",
      icon: FiBarChart2,
      color: "green"
    },
    {
      label: "Time Spent",
      value: "24h",
      change: "+2h this week",
      changeType: "positive",
      icon: FiClock,
      color: "purple"
    },
    {
      label: "Rank",
      value: "#47",
      change: "+3 positions",
      changeType: "positive",
      icon: FiAward,
      color: "yellow"
    }
  ];

  const quickActions = [
    {
      title: "Start New Test",
      description: "Begin a new practice session with curated questions",
      icon: FiPlayCircle,
      color: "blue",
      link: "/dashboard/test"
    },
    {
      title: "Review Answers",
      description: "Analyze your previous attempts and learn from mistakes",
      icon: FiFileText,
      color: "green",
      link: "/dashboard/review"
    },
    {
      title: "View Progress",
      description: "Track your improvement and set new goals",
      icon: FiTrendingUp,
      color: "purple",
      link: "/dashboard/profile"
    }
  ];

  const recentActivities = [
    { 
      action: "Completed JavaScript Fundamentals Test", 
      time: "2 hours ago", 
      score: "92%",
      icon: FiCode
    },
    { 
      action: "Reviewed React Hooks Questions", 
      time: "1 day ago", 
      score: "88%",
      icon: FiCheckCircle
    },
    { 
      action: "Started Algorithm Practice Session", 
      time: "2 days ago", 
      score: "85%",
      icon: FiActivity
    },
    { 
      action: "Completed CSS Styling Challenge", 
      time: "3 days ago", 
      score: "94%",
      icon: FiCode
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50"
    >
      <div className="space-y-8 p-6">
        {/* Enhanced Greeting Section */}
        <motion.div 
          variants={itemVariants} 
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white/5 rounded-full"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Ready to continue your interview preparation journey?
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-100">12 tests completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-100">85% average score</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FiUser className="text-3xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              color={stat.color}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Quick Actions Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <div className="text-sm text-gray-500">Choose your next step</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={action.title}
                title={action.title}
                description={action.description}
                icon={action.icon}
                color={action.color}
                link={action.link}
                delay={index * 0.1 + 0.3}
              />
            ))}
          </div>
        </motion.div>

        {/* Recent Activity Feed */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-2">
              {recentActivities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  action={activity.action}
                  time={activity.time}
                  score={activity.score}
                  icon={activity.icon}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Performance Insights */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Progress */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tests Completed</span>
                  <span className="font-semibold text-gray-900">5/7</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '71%'}}></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Goal: 7 tests per week</span>
                  <span className="text-blue-600 font-medium">71% complete</span>
                </div>
              </div>
            </div>

            {/* Skill Areas */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skill Areas</h3>
              <div className="space-y-3">
                {[
                  { skill: 'JavaScript', score: 92, color: 'bg-yellow-500' },
                  { skill: 'React', score: 88, color: 'bg-blue-500' },
                  { skill: 'Algorithms', score: 76, color: 'bg-purple-500' },
                  { skill: 'CSS', score: 94, color: 'bg-green-500' }
                ].map((item, index) => (
                  <div key={item.skill} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                    <span className="flex-1 text-gray-700">{item.skill}</span>
                    <span className="font-semibold text-gray-900">{item.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;
