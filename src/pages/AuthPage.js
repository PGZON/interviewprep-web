import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import OAuthButtons from '../components/Auth/OAuthButtons';
import { getAuthStatus } from '../utils/authUtils';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [oauthError, setOauthError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Redirect if already authenticated
  useEffect(() => {
    console.log('AuthPage: Checking authentication status');
    const authStatus = getAuthStatus();
    
    if (authStatus.isAuthenticated) {
      console.log('AuthPage: User is authenticated');
      console.log('Auth status:', authStatus);
      console.log('Redirecting to:', authStatus.redirectPath);
      navigate(authStatus.redirectPath);
    } else {
      console.log('AuthPage: User is not authenticated');
    }
  }, [navigate]);

  // Also check authentication when the component re-renders
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = getAuthStatus();
      if (authStatus.isAuthenticated) {
        console.log('AuthPage: Authentication detected, redirecting to:', authStatus.redirectPath);
        navigate(authStatus.redirectPath);
      }
    };
    
    // Check immediately and then set up an interval to check periodically
    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    
    return () => clearInterval(interval);
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
    setOauthError(''); // Clear OAuth error when switching forms
  };
  
  const switchToLogin = () => {
    setIsLogin(true);
    setOauthError(''); // Clear OAuth error when switching forms
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding/Information */}
          <div className="hidden md:block">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                InterviewPrep
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Master your interview skills with our comprehensive preparation platform
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg text-gray-700">Practice with real interview questions</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg text-gray-700">Get AI-powered feedback</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg text-gray-700">Track your progress over time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Authentication Forms */}
          <div className="w-full">
            {/* Mobile branding */}
            <div className="md:hidden text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                InterviewPrep
              </h1>
              <p className="text-gray-600">
                Master your interview skills
              </p>
            </div>

            {/* Authentication Forms */}
            <div className="space-y-6">
              {/* OAuth Error Display */}
              {oauthError && (
                <div className="max-w-md mx-auto">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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
                  </div>
                </div>
              )}

              {isLogin ? (
                <LoginForm onSwitchToSignup={switchToSignup} />
              ) : (
                <SignupForm onSwitchToLogin={switchToLogin} />
              )}

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* OAuth Buttons */}
              <div className="max-w-md mx-auto">
                <OAuthButtons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
