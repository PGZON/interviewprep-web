import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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

  // Initialize cursor effect only on landing page
  useEffect(() => {
    // Add landing page class to body
    document.body.classList.add('landing-page');
    
    const cleanup = initCursor();
    
    // Cleanup when component unmounts (user navigates away)
    return () => {
      document.body.classList.remove('landing-page');
      if (cleanup) cleanup();
      destroyCursor();
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
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
      
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
    </div>
  );
};

export default LandingPage;
