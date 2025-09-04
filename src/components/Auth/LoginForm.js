import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { login, loginWithGoogle } from '../../services/authService';
import { getPostLoginRedirect } from '../../utils/authUtils';

const LoginForm = ({ onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [apiError, setApiError] = useState('');
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

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setApiError('');

    try {
      console.log('Starting Google authentication flow...');
      const response = await loginWithGoogle();
      console.log('Google login successful, response:', response);
      
      // Verify tokens were stored properly
      const storedToken = localStorage.getItem('authToken');
      console.log('Stored token available after Google login:', !!storedToken);
      
      const redirectPath = getPostLoginRedirect();
      console.log('Google login complete, redirecting to:', redirectPath);
      
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
      console.error('Google login error:', error);
      let errorMessage = 'Google sign-in failed. Please try again.';
      
      // Provide more specific error messages based on Firebase error codes
      if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked. Please enable popups for this site and try again.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed. Please try again and complete the sign-in process.';
      } else if (error.message && error.message.includes('cross-origin')) {
        errorMessage = 'Browser security blocked the popup. Try disabling Enhanced Protection if enabled.';
      }
      
      // Handle backend specific errors
      if (error.response?.data) {
        console.log('Backend error details:', error.response.data);
        
        if (error.response.data.message && error.response.data.message.includes('UID')) {
          errorMessage = 'Authentication failed: User ID could not be verified. Please try again or use email login.';
        }
      }
      
      setApiError(
        error.response?.data?.message || 
        error.message || 
        errorMessage
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
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
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
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
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
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
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign up for free
            </button>
          </p>
        </div>

        {/* Social Login Options */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2"></div>
                  Connecting...
                </div>
              ) : (
                <>
                  <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
                  Sign in with Google
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
