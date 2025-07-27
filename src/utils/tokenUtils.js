import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token expires within the next 5 minutes (300 seconds)
    return decoded.exp < (currentTime + 300);
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export const getTokenTimeRemaining = (token) => {
  if (!token) return 0;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return Math.max(0, decoded.exp - currentTime);
  } catch (error) {
    console.error('Error decoding token:', error);
    return 0;
  }
};

export const shouldRefreshToken = (token) => {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Refresh if token expires within the next 10 minutes (600 seconds)
    return decoded.exp < (currentTime + 600);
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};
