import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FiUsers, FiBookOpen, FiTarget, FiTrendingUp, FiStar, FiGlobe } from 'react-icons/fi';

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    {
      icon: FiBookOpen,
      number: 10000,
      suffix: '+',
      label: 'AI Questions Generated',
      description: 'Personalized practice questions',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: FiUsers,
      number: 2500,
      suffix: '+',
      label: 'Active Developers',
      description: 'Preparing for interviews',
      color: 'from-purple-500 to-pink-500',
      delay: 0.2
    },
    {
      icon: FiTarget,
      number: 15,
      suffix: '+',
      label: 'Technical Subjects',
      description: 'Comprehensive coverage',
      color: 'from-green-500 to-emerald-500',
      delay: 0.3
    },
    {
      icon: FiTrendingUp,
      number: 94,
      suffix: '%',
      label: 'Success Rate',
      description: 'Interview pass rate',
      color: 'from-orange-500 to-red-500',
      delay: 0.4
    },
    {
      icon: FiStar,
      number: 4.9,
      suffix: '/5',
      label: 'User Rating',
      description: 'Average satisfaction',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.5
    },
    {
      icon: FiGlobe,
      number: 50,
      suffix: '+',
      label: 'Countries',
      description: 'Global reach',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.6
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <FiTrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-white/90 text-sm font-medium">Platform Statistics</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Trusted by Developers
            <span className="block text-gradient bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who have successfully prepared for their technical interviews 
            and landed their dream jobs using our AI-powered platform.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: stat.delay }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center relative overflow-hidden group-hover:border-white/40 transition-all duration-300">
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                </div>

                {/* Number */}
                <div className="relative mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {inView && (
                      <CountUp
                        start={0}
                        end={stat.number}
                        duration={2.5}
                        delay={stat.delay}
                        decimals={stat.suffix === '/5' ? 1 : 0}
                      />
                    )}
                    <span className="text-3xl">{stat.suffix}</span>
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-white/60 group-hover:text-white/80 transition-colors">
                  {stat.description}
                </p>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Start your journey towards interview success today. Join thousands of developers 
              who trust our platform for their career advancement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#signup"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gradient btn-glow px-8 py-4 rounded-xl font-semibold text-lg text-white inline-flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <FiTarget className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#demo"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center space-x-2"
              >
                <span>Watch Demo</span>
                <FiStar className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
