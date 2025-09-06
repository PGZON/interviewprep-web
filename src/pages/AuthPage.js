import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import { getAuthStatus } from '../utils/authUtils';
import { motion } from 'framer-motion';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [oauthError, setOauthError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Single authentication check effect
  useEffect(() => {
    const authStatus = getAuthStatus();
    if (authStatus.isAuthenticated) {
      navigate(authStatus.redirectPath);
    }

    // Set up event listener for auth state changes instead of polling
    const handleAuthChange = () => {
      const newAuthStatus = getAuthStatus();
      if (newAuthStatus.isAuthenticated) {
        navigate(newAuthStatus.redirectPath);
      }
    };

    window.addEventListener('auth-state-change', handleAuthChange);
    return () => window.removeEventListener('auth-state-change', handleAuthChange);
  }, [navigate]);

  // Check for OAuth error in URL params
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setOauthError(decodeURIComponent(error));
    }
  }, [searchParams]);

  const switchToSignup = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-6xl px-4">
        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <div className="md:grid md:grid-cols-5 min-h-[600px]">
            {/* Left side - Info/Branding */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white md:col-span-2 hidden md:flex md:flex-col md:justify-between"
            >
              <div>
                {/* Logo and Brand */}
                <motion.div variants={itemVariants} className="flex items-center mb-12">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mr-4 shadow-xl border-2 border-white/20">
                      <img src="/AppLogo.svg" alt="InterviewPrep Logo" className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border border-white"></div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-extrabold text-white drop-shadow-lg bg-clip-text bg-gradient-to-r from-white to-blue-200">InterviewPrep</h1>
                    <span className="text-sm font-semibold tracking-wider text-blue-300">AI Powered</span>
                  </div>
                </motion.div>

                {/* Main Headline */}
                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl font-bold mb-4">Ace your next technical interview</h2>
                  <p className="text-white/80 text-lg">
                    Practice with real questions, get instant AI feedback, and build your confidence.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Practice with real questions</h3>
                      <p className="text-white/80 text-sm">Curated from actual technical interviews</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">AI-powered feedback</h3>
                      <p className="text-white/80 text-sm">Get instant analysis of your answers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Track your progress</h3>
                      <p className="text-white/80 text-sm">Visualize improvement over time</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mt-12">
                  <div className="inline-flex rounded-lg bg-white/20 p-1.5">
                    <div className="flex items-center space-x-1.5 text-xs font-medium text-white">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-600">✓</span>
                      <span>Used by 10,000+ developers</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Authentication Forms */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full p-6 sm:p-10 md:col-span-3"
            >
              {/* Mobile logo */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="md:hidden flex items-center justify-center mb-10"
              >
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg border-2 border-indigo-400/30 mr-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"></path>
                      <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border border-white"></div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700 leading-none">
                    InterviewPrep
                  </h1>
                  <span className="text-sm font-semibold tracking-wide text-blue-600">
                    AI Powered
                  </span>
                </div>
              </motion.div>

              {/* Authentication Forms */}
              <div className="max-w-md mx-auto">
                {/* OAuth Error Display */}
                {oauthError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Authentication Failed
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{oauthError}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Form Header */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-bold text-gray-900">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-base text-gray-600 mt-2">
                    {isLogin 
                      ? 'Sign in to continue to your dashboard' 
                      : 'Join thousands of developers preparing for interviews'
                    }
                  </p>
                </motion.div>

                {isLogin ? (
                  <LoginForm onSwitchToSignup={switchToSignup} />
                ) : (
                  <SignupForm onSwitchToLogin={switchToLogin} />
                )}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 text-center text-xs text-white/70"
        >
          <p>© {new Date().getFullYear()} InterviewPrep. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
