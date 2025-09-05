import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiDatabase, FiAward, FiTrendingUp, FiShield } from 'react-icons/fi';

const FeaturesPage = () => {
  const features = [
    {
      icon: FiCode,
      title: "Smart Code Analysis",
      description: "Advanced AI algorithms analyze your code in real-time, providing instant feedback on syntax, logic, and best practices.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: FiCpu,
      title: "AI-Powered Questions",
      description: "Dynamic question generation based on your skill level and learning progress. Questions adapt as you improve.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FiDatabase,
      title: "Vast Question Bank",
      description: "Access thousands of curated questions across different programming languages, frameworks, and difficulty levels.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: FiAward,
      title: "Performance Tracking",
      description: "Detailed analytics and progress tracking to help you identify strengths and areas for improvement.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: FiTrendingUp,
      title: "Learning Paths",
      description: "Customized learning paths based on your target role and technology stack preferences.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: FiShield,
      title: "Mock Interviews",
      description: "Realistic mock interview sessions with AI-powered feedback and performance analysis.",
      color: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Features that Empower Your 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Interview Prep</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600"
        >
          Everything you need to ace your technical interviews, powered by cutting-edge AI technology.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-20 text-center"
      >
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          Get Started Free
        </button>
      </motion.div>
    </div>
  );
};

export default FeaturesPage;
