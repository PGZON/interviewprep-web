import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiMenu, FiX, FiCode } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userIsAuthenticated = isAuthenticated();
  
  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.9, 1]);
  const navbarScale = useTransform(scrollY, [0, 100], [0.98, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleAuthClick = () => {
    if (userIsAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ 
        opacity: navbarOpacity,
        scale: navbarScale
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass backdrop-blur-xl bg-white/80 shadow-lg border-b border-white/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-xl border-2 border-blue-400/30">
                <FiCode className="text-white text-2xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-3xl md:text-4xl font-extrabold tracking-tight transition-colors duration-300 ${
                isScrolled 
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700' 
                : 'text-white drop-shadow-md'
              }`}>
                InterviewPrep
              </span>
              <span className={`text-xs font-semibold tracking-wider transition-colors duration-300 ${
                isScrolled 
                ? 'text-blue-600' 
                : 'text-blue-300 drop-shadow-md'
              }`}>
                AI Powered
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                <span className="absolute bottom-0 left-4 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-6"></span>
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!userIsAuthenticated && (
              <motion.button
                onClick={() => navigate('/auth')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Login
              </motion.button>
            )}
            <motion.button
              onClick={handleAuthClick}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient btn-glow px-6 py-2 rounded-lg text-white font-medium text-sm relative overflow-hidden"
            >
              {userIsAuthenticated ? 'Dashboard' : 'Get Started'}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden glass-dark backdrop-blur-xl rounded-lg mt-2 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg mx-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 10 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="px-2 pt-4 space-y-2 border-t border-white/10">
                  {!userIsAuthenticated && (
                    <motion.button
                      onClick={() => {
                        navigate('/auth');
                        setIsMobileMenuOpen(false);
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg"
                    >
                      Login
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => {
                      handleAuthClick();
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="block w-full btn-gradient btn-glow px-4 py-3 text-white font-medium rounded-lg text-center"
                  >
                    {userIsAuthenticated ? 'Dashboard' : 'Get Started'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
