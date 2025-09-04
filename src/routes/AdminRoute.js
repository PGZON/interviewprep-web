import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../utils/adminDebug'; // Import to make window.debugAdminAccess available

const AdminRoute = ({ children }) => {
  // Check both possible token keys for compatibility
  const token = localStorage.getItem('authToken') || localStorage.getItem('token');
  
  console.log('AdminRoute: Checking token...');
  console.log('authToken exists:', !!localStorage.getItem('authToken'));
  console.log('token exists:', !!localStorage.getItem('token'));
  console.log('Using token:', token ? token.substring(0, 20) + '...' : 'none');
  
  if (!token) {
    console.log('AdminRoute: No auth token found, redirecting to /auth');
    console.log('Available localStorage keys:', Object.keys(localStorage));
    return <Navigate to="/auth" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log('AdminRoute: Token decoded successfully');
    console.log('Decoded token payload:', decodedToken);
    
    const userRole = decodedToken.role || decodedToken.authorities?.[0] || '';
    console.log('AdminRoute: User role found:', userRole);
    
    // Check if user has admin role
    const isAdmin = userRole.includes('ADMIN') || userRole.includes('ROLE_ADMIN');
    console.log('AdminRoute: Is admin?', isAdmin);
    
    if (!isAdmin) {
      console.log('AdminRoute: Access denied - insufficient privileges');
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">
              You don't have permission to access the admin panel.
            </p>
            <div className="text-sm text-gray-500 mb-6 bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Debug Information:</p>
              <p><strong>Your role:</strong> {userRole || 'No role found'}</p>
              <p><strong>Required:</strong> ADMIN or ROLE_ADMIN</p>
              <p className="mt-2 text-xs">
                Run <code>window.debugAdminAccess()</code> in browser console for more details
              </p>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => window.history.back()}
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => window.location.href = '/auth'}
                className="w-full px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Login with Admin Account
              </button>
            </div>
          </div>
        </div>
      );
    }

    console.log('AdminRoute: Access granted - rendering admin content');
    return children;
  } catch (error) {
    console.error('AdminRoute: Invalid token:', error);
    return <Navigate to="/auth" replace />;
  }
};

export default AdminRoute;
