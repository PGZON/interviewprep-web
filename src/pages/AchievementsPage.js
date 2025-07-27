import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiAward, 
  FiStar, 
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiShield,
  FiHeart
} from 'react-icons/fi';

const AchievementsPage = () => {
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first coding challenge",
      icon: FiTarget,
      earned: true,
      earnedDate: "2024-01-15",
      points: 50,
      color: "from-green-400 to-emerald-500"
    },
    {
      id: 2,
      title: "Speed Demon",
      description: "Answer 10 questions in under 5 minutes",
      icon: FiZap,
      earned: true,
      earnedDate: "2024-01-20",
      points: 100,
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: 3,
      title: "Streak Master",
      description: "Maintain a 7-day study streak",
      icon: FiTrendingUp,
      earned: true,
      earnedDate: "2024-01-25",
      points: 150,
      color: "from-blue-400 to-cyan-500"
    },
    {
      id: 4,
      title: "Perfect Score",
      description: "Score 100% on any assessment",
      icon: FiStar,
      earned: true,
      earnedDate: "2024-02-01",
      points: 200,
      color: "from-purple-400 to-pink-500"
    },
    {
      id: 5,
      title: "Defender",
      description: "Complete 50 security-related questions",
      icon: FiShield,
      earned: false,
      progress: 32,
      total: 50,
      points: 175,
      color: "from-red-400 to-pink-500"
    },
    {
      id: 6,
      title: "Champion",
      description: "Rank in top 10% globally",
      icon: FiAward,
      earned: false,
      progress: 65,
      total: 100,
      points: 500,
      color: "from-yellow-500 to-amber-500"
    },
    {
      id: 7,
      title: "Dedication",
      description: "Study for 30 consecutive days",
      icon: FiHeart,
      earned: false,
      progress: 12,
      total: 30,
      points: 300,
      color: "from-rose-400 to-red-500"
    }
  ];

  const totalPoints = achievements
    .filter(achievement => achievement.earned)
    .reduce((sum, achievement) => sum + achievement.points, 0);

  const earnedCount = achievements.filter(achievement => achievement.earned).length;

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Achievements</h1>
            <p className="text-gray-600">Celebrate your learning milestones</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-white">
            <FiAward size={24} />
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white shadow-lg">
              <FiAward size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{earnedCount}</div>
          <div className="text-sm text-gray-600 mb-2">Badges Earned</div>
          <div className="text-xs text-blue-600 font-medium">
            {achievements.length - earnedCount} more to unlock
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white shadow-lg">
              <FiStar size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalPoints}</div>
          <div className="text-sm text-gray-600 mb-2">Total Points</div>
          <div className="text-xs text-yellow-600 font-medium">Keep earning!</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg">
              <FiTrendingUp size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {Math.round((earnedCount / achievements.length) * 100)}%
          </div>
          <div className="text-sm text-gray-600 mb-2">Completion Rate</div>
          <div className="text-xs text-purple-600 font-medium">Great progress!</div>
        </motion.div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className={`
              relative bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-200
              ${achievement.earned ? 'ring-2 ring-green-200' : 'opacity-75'}
            `}
          >
            {/* Achievement Icon */}
            <div className="flex items-center justify-between mb-4">
              <div className={`
                p-3 bg-gradient-to-r ${achievement.color} rounded-xl text-white shadow-lg
                ${!achievement.earned && 'grayscale opacity-60'}
              `}>
                <achievement.icon size={20} />
              </div>
              {achievement.earned && (
                <div className="flex items-center space-x-1 text-green-600">
                  <FiStar size={16} />
                  <span className="text-sm font-medium">{achievement.points} pts</span>
                </div>
              )}
            </div>

            {/* Achievement Details */}
            <div className="mb-4">
              <h3 className={`font-bold text-lg mb-2 ${
                achievement.earned ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-sm ${
                achievement.earned ? 'text-gray-600' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
            </div>

            {/* Progress or Earned Date */}
            {achievement.earned ? (
              <div className="text-xs text-green-600 font-medium">
                Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">
                    {achievement.progress}/{achievement.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                    className={`h-2 bg-gradient-to-r ${achievement.color} rounded-full`}
                  />
                </div>
              </div>
            )}

            {/* Earned Badge */}
            {achievement.earned && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white"
              >
                <FiStar size={12} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
