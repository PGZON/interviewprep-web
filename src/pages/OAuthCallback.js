import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');
    const user = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      // Handle OAuth error
      console.error('OAuth error:', error);
      navigate('/auth?error=' + encodeURIComponent(error));
      return;
    }

    if (token && refreshToken) {
      // Store tokens and user data
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      if (user) {
        try {
          const userData = JSON.parse(decodeURIComponent(user));
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (e) {
          console.error('Failed to parse user data:', e);
        }
      }

      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      // Missing required parameters
      navigate('/auth?error=Invalid OAuth response');
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Processing authentication...
        </h2>
        <p className="text-gray-600">
          Please wait while we complete your login.
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;
