import React, { useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { loginWithGoogle } from '../../services/authService';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getPostLoginRedirect } from '../../utils/authUtils';

const OAuthButtons = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError('');

    try {
      console.log('Starting Google authentication flow...');
      await loginWithGoogle();
      
      // Verify tokens were stored properly
      const storedToken = localStorage.getItem('authToken');
      console.log('Stored token available after Google login:', !!storedToken);
      
      const redirectPath = getPostLoginRedirect();
      console.log('Google login complete, redirecting to:', redirectPath);
      
      // Wait briefly to ensure tokens are stored and processed
      setTimeout(() => {
        if (localStorage.getItem('authToken')) {
          navigate(redirectPath, { replace: true });
        } else {
          console.error('Token missing before redirect, aborting navigation');
          setError('Authentication error: Login succeeded but session was lost');
        }
      }, 500);
    } catch (error) {
      console.error('Google login error:', error);
      setError(
        error.message || 
        'Google sign-in failed. Please try again.'
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Let's use loginWithGoogle for GitHub as well for now since it's not implemented yet
  const handleGitHubLogin = async () => {
    setIsGithubLoading(true);
    setError('');

    try {
      // This is a placeholder - should be replaced with actual GitHub login
      console.log('GitHub login not fully implemented yet, using Google login temporarily');
      await loginWithGoogle();
      
      // Check for token and redirect
      const redirectPath = getPostLoginRedirect();
      
      setTimeout(() => {
        if (localStorage.getItem('authToken')) {
          navigate(redirectPath, { replace: true });
        } else {
          setError('Authentication error: Session was lost');
        }
      }, 500);
    } catch (error) {
      console.error('GitHub login error:', error);
      setError(error.message || 'GitHub sign-in failed. Please try again.');
    } finally {
      setIsGithubLoading(false);
    }
  };

  const buttonVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        delay: i * 0.1 
      }
    }),
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { 
        duration: 0.2 
      }
    },
    tap: { 
      scale: 0.98
    }
  };

  return (
    <div className="w-full space-y-6">
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600"
        >
          {error}
        </motion.div>
      )}
      
      <div className="space-y-4 w-full">
        <motion.button
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          custom={0}
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isGithubLoading}
          className="w-full flex items-center justify-center px-6 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500 mr-3"></div>
              <span className="text-base">Signing in with Google...</span>
            </>
          ) : (
            <>
              <FaGoogle className="mr-3 text-red-500" size={20} />
              <span className="text-base">Continue with Google</span>
            </>
          )}
        </motion.button>
        
        <motion.button
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          custom={1}
          onClick={handleGitHubLogin}
          disabled={isGoogleLoading || isGithubLoading}
          className="w-full flex items-center justify-center px-6 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGithubLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-800 mr-3"></div>
              <span className="text-base">Signing in with GitHub...</span>
            </>
          ) : (
            <>
              <FaGithub className="mr-3 text-gray-800" size={20} />
              <span className="text-base">Continue with GitHub</span>
            </>
          )}
        </motion.button>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative flex items-center justify-center w-full mt-4"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 text-gray-500 bg-white">or continue with email</span>
        </div>
      </motion.div>
    </div>
  );
};

export default OAuthButtons;
