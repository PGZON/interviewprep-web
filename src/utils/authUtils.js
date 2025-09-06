import { jwtDecode } from 'jwt-decode';

// Cache for decoded tokens to prevent repeated decoding
const tokenCache = new Map();

// Dispatch auth state change event
export const dispatchAuthChange = () => {
  window.dispatchEvent(new CustomEvent('auth-state-change'));
};

export const getPostLoginRedirect = () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return '/auth';
  }

  try {
    let decodedToken = tokenCache.get(token);
    
    if (!decodedToken) {
      decodedToken = jwtDecode(token);
      tokenCache.set(token, decodedToken);
    }
    
    const userRole = decodedToken.role || 
                    (decodedToken.authorities?.[0]) || 
                    decodedToken.scope || 
                    '';
    
    // Notify listeners about authentication state change
    dispatchAuthChange();
    
    return userRole?.includes('ADMIN') ? '/admin' : '/dashboard';
  } catch (error) {
    return '/dashboard';
  }
};

/**
 * Check if current user has admin privileges
 */
export const isAdmin = () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) return false;

  try {
    let decodedToken = tokenCache.get(token);
    
    if (!decodedToken) {
      decodedToken = jwtDecode(token);
      tokenCache.set(token, decodedToken);
    }

    return decodedToken.role?.includes('ADMIN') || false;
  } catch (error) {
    return false;
  }
};

/**
 * Get the current authentication status and redirect path
 */
export const getAuthStatus = () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return { isAuthenticated: false, redirectPath: '/auth' };
  }

  try {
    let decodedToken = tokenCache.get(token);
    
    if (!decodedToken) {
      decodedToken = jwtDecode(token);
      tokenCache.set(token, decodedToken);
    }

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      localStorage.removeItem('authToken');
      tokenCache.delete(token);
      dispatchAuthChange();
      return { isAuthenticated: false, redirectPath: '/auth' };
    }

    const isUserAdmin = decodedToken.role?.includes('ADMIN');
    return {
      isAuthenticated: true,
      redirectPath: isUserAdmin ? '/admin' : '/dashboard'
    };
  } catch (error) {
    return { isAuthenticated: false, redirectPath: '/auth' };
  }
};

/**
 * Clear authentication data and notify listeners
 */
export const clearAuth = () => {
  localStorage.removeItem('authToken');
  tokenCache.clear();
  dispatchAuthChange();
};
