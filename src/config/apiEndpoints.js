/**
 * API Endpoints Configuration
 * Centralized management of all API endpoints
 */

import config from './config';

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    GOOGLE_AUTH: config.GOOGLE_AUTH_URL,
    GITHUB_AUTH: config.GITHUB_AUTH_URL,
  },

  // User Management
  USER: {
    PROFILE: '/user/profile',
    HISTORY: '/user/user-history',
    STATS: '/user/stats',
    UPDATE: '/user/update',
    DELETE: '/user/delete',
  },

  // Test Management
  TEST: {
    START: '/test/start',
    SUBMIT: '/test/submit',
    RESULTS: '/test/results',
    HISTORY: '/test/history',
  },

  // Questions
  QUESTIONS: {
    GENERATE: '/questions/generate',
    GET_BY_TOPIC: '/questions/topic',
    GET_BY_ID: '/questions',
  },

  // Admin
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    ANALYTICS: '/admin/analytics',
    QUESTIONS: '/admin/questions',
    BATCHES: '/admin/batches',
  },

  // Health Check
  HEALTH: '/health',
};

/**
 * Build full URL for an endpoint
 * @param {string} endpoint - The endpoint path
 * @returns {string} Full URL
 */
export const buildURL = (endpoint) => {
  if (endpoint.startsWith('http')) {
    return endpoint; // Already a full URL
  }
  return `${config.API_BASE_URL}${endpoint}`;
};

/**
 * Build OAuth URL
 * @param {string} provider - OAuth provider (google, github)
 * @returns {string} OAuth URL
 */
export const buildOAuthURL = (provider) => {
  switch (provider.toLowerCase()) {
    case 'google':
      return config.GOOGLE_AUTH_URL;
    case 'github':
      return config.GITHUB_AUTH_URL;
    default:
      throw new Error(`Unsupported OAuth provider: ${provider}`);
  }
};

/**
 * Get all endpoints for debugging
 * @returns {Object} All endpoints with full URLs
 */
export const getAllEndpoints = () => {
  const buildEndpointObject = (obj) => {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object') {
        result[key] = buildEndpointObject(value);
      } else {
        result[key] = buildURL(value);
      }
    }
    return result;
  };

  return buildEndpointObject(API_ENDPOINTS);
};

/**
 * Log all endpoints for debugging
 */
export const logEndpoints = () => {
  if (config.ENABLE_DEBUG) {
    console.log('🌐 API Endpoints:', getAllEndpoints());
  }
};

export default API_ENDPOINTS;
