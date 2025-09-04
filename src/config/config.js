/**
 * Environment Configuration
 * Centralized configuration for environment variables
 */

const config = {
  // API Configuration
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api",
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080",
  
  // App Configuration
  APP_NAME: process.env.REACT_APP_APP_NAME || "InterviewPrep",
  VERSION: process.env.REACT_APP_VERSION || "1.0.0",
  ENVIRONMENT: process.env.REACT_APP_ENV || "development",
  
  // Feature Flags
  ENABLE_DEBUG: process.env.REACT_APP_ENABLE_DEBUG === "true",
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === "true",
  
  // Derived URLs
  get GOOGLE_AUTH_URL() {
    return `${this.BACKEND_URL}/auth/oauth2/google`;
  },
  
  get GITHUB_AUTH_URL() {
    return `${this.BACKEND_URL}/oauth2/authorize/github`;
  },
  
  get REFRESH_TOKEN_URL() {
    return `${this.API_BASE_URL}/auth/refresh-token`;
  },
  
  // Helper methods
  isDevelopment: () => config.ENVIRONMENT === "development",
  isProduction: () => config.ENVIRONMENT === "production",
  
  // Debug logging
  logConfig: () => {
    if (config.ENABLE_DEBUG) {
      console.log("🔧 App Configuration:", {
        API_BASE_URL: config.API_BASE_URL,
        BACKEND_URL: config.BACKEND_URL,
        APP_NAME: config.APP_NAME,
        VERSION: config.VERSION,
        ENVIRONMENT: config.ENVIRONMENT,
        ENABLE_DEBUG: config.ENABLE_DEBUG,
        ENABLE_ANALYTICS: config.ENABLE_ANALYTICS
      });
    }
  }
};

export default config;
