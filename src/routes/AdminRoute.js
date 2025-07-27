import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role || decodedToken.authorities?.[0] || '';
    
    // Check if user has admin role
    if (!userRole.includes('ADMIN') && !userRole.includes('ROLE_ADMIN')) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access the admin panel.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }

    return children;
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/auth" replace />;
  }
};

export default AdminRoute;
