/**
 * Environment Validation Utility
 * Validates required environment variables and provides helpful error messages
 */

import config from './config';

class EnvironmentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Validate all required environment variables
   */
  validate() {
    this.validateRequired();
    this.validateURLFormat();
    this.checkWarnings();
    
    return {
      isValid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings
    };
  }

  /**
   * Validate required environment variables
   */
  validateRequired() {
    const required = [
      'API_BASE_URL',
      'BACKEND_URL'
    ];

    required.forEach(key => {
      if (!config[key] || config[key].trim() === '') {
        this.errors.push(`Missing required environment variable: REACT_APP_${key}`);
      }
    });
  }

  /**
   * Validate URL formats
   */
  validateURLFormat() {
    try {
      new URL(config.API_BASE_URL);
    } catch (error) {
      this.errors.push(`Invalid API_BASE_URL format: ${config.API_BASE_URL}`);
    }

    try {
      new URL(config.BACKEND_URL);
    } catch (error) {
      this.errors.push(`Invalid BACKEND_URL format: ${config.BACKEND_URL}`);
    }

    // Check if API_BASE_URL ends with /api
    if (config.API_BASE_URL && !config.API_BASE_URL.endsWith('/api')) {
      this.warnings.push('API_BASE_URL should end with "/api"');
    }

    // Check if BACKEND_URL ends with /api (it shouldn't)
    if (config.BACKEND_URL && config.BACKEND_URL.endsWith('/api')) {
      this.warnings.push('BACKEND_URL should NOT end with "/api"');
    }
  }

  /**
   * Check for potential issues
   */
  checkWarnings() {
    // Check if running in production without proper URLs
    if (config.isProduction()) {
      if (config.API_BASE_URL.includes('localhost')) {
        this.warnings.push('Using localhost URLs in production environment');
      }
    }

    // Check if debug is enabled in production
    if (config.isProduction() && config.ENABLE_DEBUG) {
      this.warnings.push('Debug mode is enabled in production');
    }

    // Check if analytics is disabled in production
    if (config.isProduction() && !config.ENABLE_ANALYTICS) {
      this.warnings.push('Analytics is disabled in production');
    }
  }

  /**
   * Log validation results
   */
  logResults() {
    const result = this.validate();
    
    if (result.errors.length > 0) {
      console.error('❌ Environment Configuration Errors:');
      result.errors.forEach(error => console.error(`  • ${error}`));
    }

    if (result.warnings.length > 0) {
      console.warn('⚠️ Environment Configuration Warnings:');
      result.warnings.forEach(warning => console.warn(`  • ${warning}`));
    }

    if (result.isValid && result.warnings.length === 0) {
      console.log('✅ Environment configuration is valid');
    }

    return result;
  }
}

/**
 * Validate environment configuration
 * @returns {Object} Validation result
 */
export const validateEnvironment = () => {
  const validator = new EnvironmentValidator();
  return validator.logResults();
};

/**
 * Initialize environment validation
 * Call this early in your app startup
 */
export const initEnvironment = () => {
  if (config.ENABLE_DEBUG) {
    console.log('🚀 Initializing environment configuration...');
    config.logConfig();
    
    // Import and log endpoints (dynamic import to avoid circular dependency)
    import('./apiEndpoints').then(({ logEndpoints }) => {
      logEndpoints();
    });
    
    validateEnvironment();
  }
};

export default EnvironmentValidator;
