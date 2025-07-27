import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay, FiStar, FiTrendingUp } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-mesh">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-500/10 rounded-full blur-lg"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium">AI-Powered Interview Prep</span>
              <FiStar className="text-yellow-400 w-4 h-4" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            >
              Ace Your Tech 
              <span className="block">
                <span className="text-gradient-blue bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Interviews
                </span>
              </span>
              <span className="block">with AI Power</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Master coding interviews with personalized AI-generated questions, 
              real-time feedback, and comprehensive progress tracking designed for 
              software engineers and developers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <motion.a
                href="#features"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group btn-gradient btn-glow px-8 py-4 rounded-xl font-semibold text-lg text-white flex items-center justify-center space-x-2 relative overflow-hidden"
              >
                <span>Get Started Free</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group glass backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-white/10 transition-all duration-300"
              >
                <FiPlay className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-white/60 text-sm">Questions Generated</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-white/60 text-sm">Users Preparing</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-white/60 text-sm">Success Rate</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative lg:block hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-white/60 text-sm">AI Interview Assistant</div>
                  </div>

                  {/* Question Preview */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="text-white/80 text-sm mb-2">Question 1 of 10</div>
                    <div className="text-white font-medium mb-4">
                      What is the time complexity of Binary Search?
                    </div>
                    <div className="space-y-2">
                      {['O(n)', 'O(log n)', 'O(n²)', 'O(1)'].map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <div className={`w-4 h-4 rounded-full border-2 border-white/40 ${index === 1 ? 'bg-green-400 border-green-400' : ''}`}></div>
                          <span className="text-white/80">{option}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-white/60 text-sm">
                      <span>Progress</span>
                      <span>7/10</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        transition={{ duration: 1.5, delay: 1.2 }}
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg"
              >
                ✓
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 glass backdrop-blur-sm border border-white/20 rounded-lg p-3 flex items-center space-x-2"
              >
                <FiTrendingUp className="text-green-400 w-5 h-5" />
                <div className="text-white text-sm">
                  <div className="font-medium">Accuracy: 94%</div>
                  <div className="text-white/60 text-xs">+12% this week</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/30 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
