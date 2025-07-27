import axios from 'axios';
import { shouldRefreshToken, clearAuthStorage } from '../utils/tokenUtils';

// Create Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Bearer token and handle preemptive refresh
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("authToken") || localStorage.getItem("token");
    
    // Enhanced logging for debugging
    console.log('🔍 Axios Request Details:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method?.toUpperCase(),
      hasToken: !!token,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'No token',
      headers: config.headers
    });
    
    if (token) {
      // Check if token should be refreshed proactively
      if (shouldRefreshToken(token)) {
        console.log('⏰ Token expiring soon, attempting preemptive refresh...');
        
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            // Use plain axios for refresh to avoid interceptor recursion
            const refreshResponse = await axios.post("http://localhost:8080/api/auth/refresh-token", { 
              refreshToken 
            }, {
              headers: {
                "Content-Type": "application/json"
              }
            });
            
            const newToken = refreshResponse.data.token || refreshResponse.data.accessToken;
            if (newToken) {
              localStorage.setItem("authToken", newToken);
              localStorage.setItem("token", newToken);
              config.headers["Authorization"] = `Bearer ${newToken}`;
              console.log('✅ Token refreshed proactively');
            }
          } catch (refreshError) {
            console.warn('⚠️ Preemptive token refresh failed, will handle on 401:', refreshError);
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        } else {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      
      console.log('✅ Authorization header added:', config.headers["Authorization"]?.substring(0, 30) + '...');
    } else {
      console.warn('⚠️ No authentication token found in localStorage');
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ Successful API Response:', {
      url: response.config.url,
      status: response.status,
      dataSize: JSON.stringify(response.data).length + ' bytes'
    });
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.error('❌ API Error Details:', {
      url: originalRequest?.url,
      method: originalRequest?.method?.toUpperCase(),
      status: error.response?.status,
      statusText: error.response?.statusText,
      errorData: error.response?.data,
      hasAuthHeader: !!originalRequest?.headers?.Authorization,
      authHeaderPreview: originalRequest?.headers?.Authorization?.substring(0, 30) + '...'
    });
    
    // Handle 401 (Unauthorized) - Token expired or invalid
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      console.log('🔄 Token expired (401), attempting refresh...');
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (refreshToken) {
        try {
          // Attempt to refresh the token using plain axios to avoid interceptor recursion
          const refreshResponse = await axios.post("http://localhost:8080/api/auth/refresh-token", { 
            refreshToken 
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          });
          
          const newToken = refreshResponse.data.token || refreshResponse.data.accessToken;
          
          if (newToken) {
            // Store new token
            localStorage.setItem("authToken", newToken);
            localStorage.setItem("token", newToken);
            
            // Update the Authorization header for the failed request
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            
            console.log('✅ Token refreshed successfully, retrying original request');
            
            // Retry the original request with new token
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError);
          
          // Refresh failed - clear storage and redirect
          clearAuthStorage();
          
          // Dispatch custom event for components to listen to
          window.dispatchEvent(new CustomEvent('auth:session-expired'));
          
          // Redirect to auth page
          window.location.href = "/auth";
          return Promise.reject(refreshError);
        }
      } else {
        console.log('❌ No refresh token available, redirecting to login');
        
        // No refresh token - clear storage and redirect
        clearAuthStorage();
        
        window.dispatchEvent(new CustomEvent('auth:session-expired'));
        window.location.href = "/auth";
      }
    }
    
    // Handle 403 (Forbidden) - User doesn't have permission
    if (error.response?.status === 403) {
      console.error('🚫 Access forbidden (403) - User lacks permission for:', originalRequest?.url);
      window.dispatchEvent(new CustomEvent('auth:access-forbidden', {
        detail: { 
          error: error.response.data,
          url: originalRequest?.url,
          method: originalRequest?.method
        }
      }));
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
