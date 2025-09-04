import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/Features';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import { isAuthenticated } from '../services/authService';
import { initCursor, destroyCursor } from '../utils/cursor';

const LandingPage = () => {
  const navigate = useNavigate();
  const userIsAuthenticated = isAuthenticated();
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Initialize cursor effect only on landing page
  useEffect(() => {
    // Add landing page class to body
    document.body.classList.add('landing-page');
    
    const cleanup = initCursor();
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    // Cleanup when component unmounts (user navigates away)
    return () => {
      document.body.classList.remove('landing-page');
      if (cleanup) cleanup();
      destroyCursor();
      clearTimeout(timer);
    };
  }, []);

  const handleCTAClick = () => {
    if (userIsAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        /* Loading Screen */
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 flex items-center justify-center z-50"
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
              className="w-20 h-20 bg-white/20 rounded-full border-4 border-white/30 border-t-white mx-auto mb-6"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-2"
            >
              InterviewPrep
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/80"
            >
              AI Powered Interview Preparation
            </motion.p>
          </div>
        </motion.div>
      ) : (
        /* Main Landing Page */
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen overflow-x-hidden relative"
        >
          {/* Floating Background Elements */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <motion.div
              style={{ y, opacity }}
              className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              style={{ y: y2 }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Page Content */}
          <div className="relative z-10">
            <Navbar />
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroSection />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <FeaturesSection />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <StatsSection />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <CTASection />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Footer />
            </motion.div>
          </div>
          
          {/* Enhanced Floating CTA Button */}
          <motion.button
            onClick={handleCTAClick}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 3, duration: 0.8, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="floating-cta group shadow-2xl"
          >
            <span className="relative z-10">
              {userIsAuthenticated ? 'Dashboard' : 'Join Waitlist'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>

          {/* Scroll Progress Indicator */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transform origin-left"
            style={{ scaleX: scrollYProgress }}
          />

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed w-2 h-2 bg-white/20 rounded-full pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;
