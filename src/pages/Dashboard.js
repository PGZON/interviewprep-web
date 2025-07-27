import React from 'react';
import { getCurrentUser, logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">InterviewPrep</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name || 'User'}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Welcome to Your Dashboard!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Authentication is working perfectly. You're now logged in!
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              User Information
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Name:</span>
                <span className="text-gray-900">{user?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-900">{user?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Status:</span>
                <span className="text-green-600 font-medium">✅ Authenticated</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-600">
              This is a placeholder dashboard. The next phases will include:
            </p>
            <ul className="mt-4 text-left max-w-md mx-auto space-y-2 text-gray-700">
              <li>• Question practice interface</li>
              <li>• Progress tracking</li>
              <li>• Performance analytics</li>
              <li>• Interview sessions</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
