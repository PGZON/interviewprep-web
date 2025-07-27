import axios from "axios";

// Create axios instance with base configuration
const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include JWT token in requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Fixed: using consistent key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Try to refresh token
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await refreshAuthToken(refreshToken);
          localStorage.setItem("authToken", response.data.accessToken); // Fixed: using consistent key
          localStorage.setItem("refreshToken", response.data.refreshToken);
          return API(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          logout();
          window.location.href = "/auth";
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Authentication API calls
export const login = async (credentials) => {
  console.log('Sending login request with:', credentials);
  const response = await API.post("/auth/login", credentials);
  console.log('Login response received:', response.data);
  
  // Handle different possible response formats
  const token = response.data.accessToken || response.data.access_token || response.data.token;
  const refreshToken = response.data.refreshToken || response.data.refresh_token;
  const user = response.data.user || response.data.userInfo || { email: credentials.email };
  
  if (token) {
    // Store token with consistent key
    localStorage.setItem("authToken", token);
    localStorage.setItem("token", token); // Also store as "token" for compatibility
    
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    localStorage.setItem("user", JSON.stringify(user));
    
    console.log('Login successful - Token stored');
    console.log('Token preview:', token.substring(0, 20) + '...');
  } else {
    console.error('No token received from server. Response:', response.data);
    throw new Error('No access token received from server');
  }
  
  return response;
};

export const signup = async (userData) => {
  const response = await API.post("/auth/signup", userData);
  if (response.data.accessToken) {
    localStorage.setItem("authToken", response.data.accessToken); // Fixed: using consistent key
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response;
};

export const refreshAuthToken = async (refreshToken) => {
  return API.post("/auth/refresh", { refreshToken });
};

export const logout = () => {
  localStorage.removeItem("authToken"); // Fixed: using consistent key
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken"); // Fixed: using consistent key
  console.log('Checking authentication, token:', token ? 'exists' : 'missing');
  return !!token;
};

// OAuth2 URLs
export const getGoogleAuthUrl = () => {
  return "http://localhost:8080/oauth2/authorize/google";
};

export const getGitHubAuthUrl = () => {
  return "http://localhost:8080/oauth2/authorize/github";
};

export default API;
