import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // If no exp field, consider it expired for safety
    if (!decoded.exp) {
      console.warn('Token has no expiration date');
      return false;
    }
    
    // Check if token is already expired
    const isExpired = decoded.exp < currentTime;
    if (isExpired) {
      console.warn('Token is expired:', new Date(decoded.exp * 1000).toISOString());
    }
    
    return isExpired;
  } catch (error) {
    console.error('Error decoding token for expiration check:', error);
    // Return false instead of true to prevent unnecessary logouts due to decode errors
    return false;
  }
};

export const getTokenTimeRemaining = (token) => {
  if (!token) return 0;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // If no exp field, assume a long time remaining
    if (!decoded.exp) {
      console.warn('Token has no expiration date');
      return 86400; // 1 day in seconds
    }
    
    return Math.max(0, decoded.exp - currentTime);
  } catch (error) {
    console.error('Error checking token time remaining:', error);
    return 0;
  }
};

export const shouldRefreshToken = (token) => {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // If no exp field, don't refresh
    if (!decoded.exp) {
      console.warn('Token has no expiration date, skipping refresh');
      return false;
    }
    
    // Only refresh if token is not already expired
    if (decoded.exp < currentTime) {
      console.warn('Token already expired, should use refreshToken instead');
      return false;
    }
    
    // Refresh if token expires within the next 10 minutes (600 seconds)
    return decoded.exp < (currentTime + 600);
  } catch (error) {
    console.error('Error checking if token should refresh:', error);
    // Don't attempt refresh on decode errors
    return false;
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};
