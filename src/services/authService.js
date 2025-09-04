import axios from "axios";
import config from "../config/config";
import { auth, signInWithGoogle } from "../config/firebase";
import { signInWithEmailAndPassword, signOut, getIdToken } from "firebase/auth";
import { jwtDecode } from "jwt-decode";

// Create axios instance with base configuration
const API = axios.create({
  baseURL: config.API_BASE_URL,
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
  
  try {
    // First authenticate with Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      credentials.email, 
      credentials.password
    );
    
    // Log important Firebase user details
    console.log('Firebase authentication successful. User details:', {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      emailVerified: userCredential.user.emailVerified,
      providerId: userCredential.user.providerId
    });
    
    // Verify Firebase user and UID are valid
    await verifyFirebaseUser(userCredential.user);
    
    // Get the Firebase ID token with forced refresh to ensure it's valid
    const firebaseToken = await getIdToken(userCredential.user, true);
    
    // Prepare the request payload
    const payload = {
      firebaseToken,
      email: credentials.email,
      uid: userCredential.user.uid,  // The Firebase UID is required by the backend
      rememberMe: credentials.rememberMe
    };
    
    console.log('Sending payload to backend:', payload);
    
    // Send the Firebase token to the backend to get our application tokens
    const response = await API.post("/auth/firebase-sync", payload);
    
    // Debug the actual URL being used
    console.log('Firebase sync URL:', `${API.defaults.baseURL}/auth/firebase-sync`);
    
    console.log('Login response received:', response.data);
    
    // Handle different possible response formats
    const token = response.data.accessToken || response.data.access_token || response.data.token;
    const refreshToken = response.data.refreshToken || response.data.refresh_token;
    const user = response.data.user || response.data.userInfo || { email: credentials.email };
    
    if (token) {
      try {
        // Clear any existing tokens first to avoid conflicts
        localStorage.removeItem("authToken");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        
        // Store token with multiple keys for compatibility
        localStorage.setItem("authToken", token);
        localStorage.setItem("token", token);
        
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }
        
        localStorage.setItem("user", JSON.stringify(user));
        
        // Verify token storage was successful
        const storedToken = localStorage.getItem("authToken");
        
        console.log('Login successful - Tokens stored');
        console.log('Token preview:', token.substring(0, 20) + '...');
        console.log('Token storage verified:', !!storedToken);
        
        // Attempt to decode the token to ensure it's valid
        try {
          const decoded = jwtDecode(token);
          console.log('Token decoded successfully, expiry:', new Date(decoded.exp * 1000).toISOString());
        } catch (decodeError) {
          console.warn('Warning: Could not decode token:', decodeError);
        }
      } catch (storageError) {
        console.error('Error storing tokens:', storageError);
        throw new Error('Failed to store authentication tokens');
      }
    } else {
      console.error('No token received from server. Response:', response.data);
      throw new Error('No access token received from server');
    }
    
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    
    // Log more detailed information about the error
    if (error.code) {
      console.error(`Firebase error code: ${error.code}`);
    }
    
    if (error.response) {
      console.error('API error response:', error.response.data);
    }
    
    throw error;
  }
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

export const loginWithGoogle = async () => {
  try {
    console.log('Initiating Google sign-in');
    const result = await signInWithGoogle();
    
    // Verify Firebase user and UID are valid
    await verifyFirebaseUser(result.user);
    
    // Get the Firebase ID token with forced refresh to ensure it's valid
    const firebaseToken = await getIdToken(result.user, true);
    
    // Sync with backend
    console.log('Syncing Google authentication with backend');
    
    // Log important Firebase user details
    console.log('Firebase user details:', {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      emailVerified: result.user.emailVerified,
      providerId: result.user.providerId
    });
    
    // Prepare the request payload
    const payload = {
      firebaseToken,
      email: result.user.email,
      name: result.user.displayName,
      uid: result.user.uid,  // The Firebase UID is required by the backend
      provider: 'google'
    };
    
    console.log('Sending payload to backend:', payload);
    
    // Make the API request
    const response = await API.post("/auth/firebase-sync", payload);
    
    console.log('Firebase sync URL for Google auth:', `${API.defaults.baseURL}/auth/firebase-sync`);
    
    console.log('Backend sync response:', response.data);
    
    // Handle response
    const token = response.data.accessToken || response.data.access_token || response.data.token;
    const refreshToken = response.data.refreshToken || response.data.refresh_token;
    const user = response.data.user || response.data.userInfo || { email: result.user.email };
    
    if (token) {
      try {
        // Clear any existing tokens first to avoid conflicts
        localStorage.removeItem("authToken");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        
        // Store token with multiple keys for compatibility
        localStorage.setItem("authToken", token);
        localStorage.setItem("token", token);
        
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }
        
        localStorage.setItem("user", JSON.stringify(user));
        
        // Verify token storage was successful
        const storedToken = localStorage.getItem("authToken");
        
        console.log('Google login successful - Tokens stored');
        console.log('Token preview:', token.substring(0, 20) + '...');
        console.log('Token storage verified:', !!storedToken);
        
        // Attempt to decode the token to ensure it's valid
        try {
          const decoded = jwtDecode(token);
          console.log('Token decoded successfully, expiry:', new Date(decoded.exp * 1000).toISOString());
        } catch (decodeError) {
          console.warn('Warning: Could not decode token:', decodeError);
        }
      } catch (storageError) {
        console.error('Error storing tokens:', storageError);
        throw new Error('Failed to store authentication tokens');
      }
    } else {
      console.error('No token received from server');
      throw new Error('No access token received from server');
    }
    
    return response;
  } catch (error) {
    console.error('Google login error:', error);
    
    // Log more detailed information about the error
    if (error.code) {
      console.error(`Firebase error code: ${error.code}`);
    }
    
    if (error.response) {
      console.error('API error response:', error.response.data);
    }
    
    throw error;
  }
};

export const refreshAuthToken = async (refreshToken) => {
  return API.post("/auth/refresh", { refreshToken });
};

export const logout = async () => {
  try {
    // Sign out from Firebase
    await signOut(auth);
    
    // Clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("token"); 
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
    
    // Still clear local storage even if Firebase logout fails
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
};

// Helper function to verify Firebase user and UID are present
export const verifyFirebaseUser = async (user) => {
  if (!user) {
    console.error('No Firebase user provided!');
    throw new Error('Firebase authentication failed: No user returned');
  }
  
  if (!user.uid) {
    console.error('Firebase user is missing UID!', user);
    throw new Error('Firebase authentication failed: User ID is missing');
  }
  
  // Additional verification that the token is valid
  try {
    await getIdToken(user, true); // Force token refresh to ensure it's valid
    return true;
  } catch (error) {
    console.error('Failed to verify Firebase token:', error);
    throw new Error('Firebase token validation failed');
  }
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
  return config.GOOGLE_AUTH_URL;
};

export const getGitHubAuthUrl = () => {
  return config.GITHUB_AUTH_URL;
};

export default API;
