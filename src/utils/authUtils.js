import { jwtDecode } from 'jwt-decode';

/**
 * Determines the appropriate redirect path after successful login
 * based on user role
 */
export const getPostLoginRedirect = () => {
  const token = localStorage.getItem('authToken') || localStorage.getItem('token');
  
  if (!token) {
    console.log('No token found, redirecting to auth');
    return '/auth';
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log('Decoded token for redirect:', decodedToken);
    
    // More flexible role extraction from different JWT formats
    const userRole = decodedToken.role || 
                    (decodedToken.authorities ? decodedToken.authorities[0] : '') || 
                    decodedToken.scope || 
                    '';
    
    console.log('User role for redirect:', userRole);
    
    // Check if user is admin
    if (userRole && (
        userRole.includes('ADMIN') || 
        userRole.includes('ROLE_ADMIN') || 
        (Array.isArray(decodedToken.roles) && decodedToken.roles.some(r => r.includes('ADMIN')))
    )) {
      console.log('Admin user detected, redirecting to /admin');
      return '/admin';
    } else {
      console.log('Regular user detected, redirecting to /dashboard');
      return '/dashboard';
    }
  } catch (error) {
    console.error('Error decoding token for redirect:', error, 'Token:', token.substring(0, 20) + '...');
    // Even with token error, send to dashboard to avoid logout loop
    return '/dashboard';
  }
};

/**
 * Check if current user has admin privileges
 */
export const isAdmin = () => {
  const token = localStorage.getItem('authToken') || localStorage.getItem('token');
  
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    // More flexible role extraction from different JWT formats
    const userRole = decodedToken.role || 
                    (decodedToken.authorities ? decodedToken.authorities[0] : '') || 
                    decodedToken.scope || 
                    '';
                    
    return userRole && (
        userRole.includes('ADMIN') || 
        userRole.includes('ROLE_ADMIN') || 
        (Array.isArray(decodedToken.roles) && decodedToken.roles.some(r => r.includes('ADMIN')))
    );
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Enhanced authentication check with role information
 */
export const getAuthStatus = () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return { 
      isAuthenticated: false, 
      isAdmin: false, 
      userRole: null,
      redirectPath: '/auth'
    };
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role || decodedToken.authorities?.[0] || '';
    const isAdminUser = userRole.includes('ADMIN') || userRole.includes('ROLE_ADMIN');
    
    return {
      isAuthenticated: true,
      isAdmin: isAdminUser,
      userRole: userRole,
      redirectPath: isAdminUser ? '/admin' : '/dashboard',
      decodedToken
    };
  } catch (error) {
    console.error('Error checking auth status:', error);
    return { 
      isAuthenticated: false, 
      isAdmin: false, 
      userRole: null,
      redirectPath: '/auth'
    };
  }
};

const authUtils = {
  getPostLoginRedirect,
  isAdmin,
  getAuthStatus
};

export default authUtils;
