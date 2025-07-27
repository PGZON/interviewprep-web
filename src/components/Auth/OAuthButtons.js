import React from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { getGoogleAuthUrl, getGitHubAuthUrl } from '../../services/authService';

const OAuthButtons = () => {
  const handleGoogleLogin = () => {
    window.location.href = getGoogleAuthUrl();
  };

  const handleGitHubLogin = () => {
    window.location.href = getGitHubAuthUrl();
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
      >
        <FaGoogle className="mr-3 text-red-500" size={20} />
        Continue with Google
      </button>
      
      <button
        onClick={handleGitHubLogin}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
      >
        <FaGithub className="mr-3 text-gray-800" size={20} />
        Continue with GitHub
      </button>
    </div>
  );
};

export default OAuthButtons;
