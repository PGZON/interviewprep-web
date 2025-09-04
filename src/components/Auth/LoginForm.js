import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { login } from '../../services/authService';
import { getPostLoginRedirect } from '../../utils/authUtils';
import ForgotPasswordForm from './ForgotPasswordForm';
import OAuthButtons from './OAuthButtons';
import { motion } from 'framer-motion';

const LoginForm = ({ onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');

    try {
      console.log('Attempting login with:', data);
      const response = await login({
        email: data.email,
        password: data.password,
        rememberMe,
      });
      
      console.log('Login successful, response:', response);
      
      // Verify tokens were stored properly
      const storedToken = localStorage.getItem('authToken');
      console.log('Stored token available:', !!storedToken);
      
      // Determine redirect path based on user role
      const redirectPath = getPostLoginRedirect();
      console.log('Navigating to:', redirectPath);
      
      // Force a longer delay to ensure tokens are stored and processed
      setTimeout(() => {
        // Double check token is still available before redirect
        if (localStorage.getItem('authToken')) {
          navigate(redirectPath, { replace: true });
        } else {
          console.error('Token missing before redirect, aborting navigation');
          setApiError('Authentication error: Login succeeded but session was lost');
        }
      }, 500);
    } catch (error) {
      console.error('Login error:', error);
      setApiError(
        error.response?.data?.message || 
        error.message ||
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {showForgotPassword ? (
        <ForgotPasswordForm onBackToLogin={() => setShowForgotPassword(false)} />
      ) : (
        <>
          {apiError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm"
            >
              <p className="text-red-700 text-sm">{apiError}</p>
            </motion.div>
          )}

          <OAuthButtons />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm ${
                    errors.email ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm ${
                    errors.password ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Switch to Sign Up */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginForm;
