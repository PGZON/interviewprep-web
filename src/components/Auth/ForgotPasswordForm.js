import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { forgotPassword } from '../../services/authService';

const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [apiError, setApiError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');

    try {
      await forgotPassword(data.email);
      setEmailSent(true);
    } catch (error) {
      console.error('Password reset error:', error);
      
      // Firebase specific error messages
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later.';
      }
      
      setApiError(
        error.response?.data?.message || 
        errorMessage
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <button
            onClick={onBackToLogin}
            className="p-2 mr-2 text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
            aria-label="Back to login"
          >
            <FaArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        </div>
        
        <p className="text-gray-600">
          {emailSent 
            ? 'We\'ve sent you an email with password reset instructions.' 
            : 'Enter your email address and we\'ll send you a link to reset your password.'}
        </p>
      </div>

      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <p className="text-red-700 text-sm">{apiError}</p>
        </div>
      )}

      {emailSent ? (
        <div>
          <div className="mb-8 p-5 bg-blue-50 border border-blue-100 rounded-xl text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Check your inbox</h3>
            <p className="text-gray-600 mb-4">
              A password reset link has been sent to your email address. 
              The link will expire in 24 hours.
            </p>
            <p className="text-sm text-gray-500">
              If you don't see the email, check your spam folder or try again.
            </p>
          </div>
          <button
            onClick={onBackToLogin}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl 
              shadow-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 
              hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-blue-500 transition-all duration-200 font-medium"
          >
            Back to Login
          </button>
        </div>
      ) : (
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
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500 transition-all duration-200 shadow-sm ${
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl 
            shadow-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 
            hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed 
            transition-all duration-200 font-medium"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending Reset Link...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
