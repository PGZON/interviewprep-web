import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiZap, 
  FiTarget, 
  FiTrendingUp, 
  FiUsers,
  FiCode,
  FiCheckCircle,
  FiClock,
  FiAward,
  FiDatabase,
  FiSettings,
  FiShield,
  FiGlobe
} from 'react-icons/fi';

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: FiZap,
      title: "AI-Generated MCQs",
      description: "Smart algorithms create personalized multiple-choice questions tailored to your skill level and learning pace.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500",
      delay: 0.1
    },
    {
      icon: FiTarget,
      title: "Topic-Wise Practice",
      description: "Focus on specific technologies and concepts like React, Node.js, Data Structures, Algorithms, and System Design.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500",
      delay: 0.2
    },
    {
      icon: FiTrendingUp,
      title: "Adaptive Difficulty",
      description: "Progressive difficulty levels from beginner to expert, adapting to your performance and growth dynamically.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500",
      delay: 0.3
    },
    {
      icon: FiUsers,
      title: "Progress Analytics",
      description: "Detailed insights into your learning journey with performance metrics, trends, and improvement suggestions.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500",
      delay: 0.4
    }
  ];

  const additionalFeatures = [
    { icon: FiCode, text: "Real-world coding scenarios", delay: 0.1 },
    { icon: FiCheckCircle, text: "Instant feedback and explanations", delay: 0.2 },
    { icon: FiClock, text: "Timed practice sessions", delay: 0.3 },
    { icon: FiAward, text: "Achievement badges and milestones", delay: 0.4 },
    { icon: FiDatabase, text: "Comprehensive question database", delay: 0.5 },
    { icon: FiSettings, text: "Customizable practice sessions", delay: 0.6 },
    { icon: FiShield, text: "Secure and private practice", delay: 0.7 },
    { icon: FiGlobe, text: "Multi-language support", delay: 0.8 }
  ];

  return (
    <section id="features" className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4">
            <FiZap className="w-4 h-4" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Everything You Need for
            <span className="block text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              Interview Success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive tools and AI-powered features designed to help you master technical interviews 
            and land your dream job with confidence.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`}></div>
                
                {/* Floating Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-6 h-6 ${feature.bgColor} rounded-full opacity-20 animate-ping`}></div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                And Much More...
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive tools and features designed for your success in technical interviews
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalFeatures.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: item.delay }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <motion.a
            href="#signup"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center btn-gradient btn-glow px-10 py-5 rounded-2xl font-bold text-xl text-white relative overflow-hidden group"
          >
            <span className="relative z-10">Start Practicing Now</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-3 relative z-10"
            >
              <FiZap className="w-6 h-6" />
            </motion.div>
          </motion.a>
          <p className="text-gray-500 mt-4">
            Join thousands of developers preparing for their dream jobs
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
