# Environment Configuration Guide

This guide explains how to configure environment variables for the InterviewPrep application with centralized configuration management.

## Environment Files

The application supports multiple environment files:

- `.env` - Default environment variables (not committed to git)
- `.env.development` - Development-specific variables  
- `.env.production` - Production-specific variables
- `.env.example` - Template file with all available variables

## Quick Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` according to your setup:
   ```bash
   # For local development
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   REACT_APP_BACKEND_URL=http://localhost:8080
   ```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | Backend API base URL with `/api` path | `http://localhost:8080/api` |
| `REACT_APP_BACKEND_URL` | Backend server base URL | `http://localhost:8080` |

### Optional Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `REACT_APP_ENV` | Environment name | `development` | `production` |
| `REACT_APP_APP_NAME` | Application name | `InterviewPrep` | `InterviewPrep Pro` |
| `REACT_APP_VERSION` | Application version | `1.0.0` | `2.1.0` |
| `REACT_APP_ENABLE_DEBUG` | Enable debug logging | `true` | `false` |
| `REACT_APP_ENABLE_ANALYTICS` | Enable analytics | `false` | `true` |

## Environment-Specific Configurations

### Development
```bash
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_BACKEND_URL=http://localhost:8080
REACT_APP_ENV=development
REACT_APP_ENABLE_DEBUG=true
REACT_APP_ENABLE_ANALYTICS=false
```

### Production
```bash
REACT_APP_API_BASE_URL=https://your-backend-domain.com/api
REACT_APP_BACKEND_URL=https://your-backend-domain.com
REACT_APP_ENV=production
REACT_APP_ENABLE_DEBUG=false
REACT_APP_ENABLE_ANALYTICS=true
```

### Staging
```bash
REACT_APP_API_BASE_URL=https://staging-api.your-domain.com/api
REACT_APP_BACKEND_URL=https://staging-api.your-domain.com
REACT_APP_ENV=staging
REACT_APP_ENABLE_DEBUG=true
REACT_APP_ENABLE_ANALYTICS=false
```

## Using Configuration in Code

### Direct Import
```javascript
import config from '../config/config';

// Use configuration values
console.log(config.API_BASE_URL);
console.log(config.BACKEND_URL);

// Use derived URLs
const authUrl = config.GOOGLE_AUTH_URL;

// Use helper methods
if (config.isDevelopment()) {
  console.log('Running in development mode');
}
```

### Environment Variables (Direct)
```javascript
// Only if you need direct access to process.env
const apiUrl = process.env.REACT_APP_API_BASE_URL;
```

## Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Ensure your `.env` file is in the root directory
   - Restart the development server after making changes
   - Variables must start with `REACT_APP_`

2. **API calls failing**
   - Check that `REACT_APP_API_BASE_URL` includes the `/api` path
   - Verify the backend server is running on the specified URL
   - Check browser network tab for actual request URLs

3. **OAuth redirects failing**
   - Ensure `REACT_APP_BACKEND_URL` does NOT include `/api`
   - Verify OAuth providers are configured with correct callback URLs

### Debug Configuration

Enable debug mode to see configuration values in browser console:
```bash
REACT_APP_ENABLE_DEBUG=true
```

This will log the complete configuration when the app starts.

## Security Notes

- Never commit the `.env` file to version control
- Use different configuration files for different environments
- Keep sensitive information like API keys in environment-specific files
- The `.env.example` file should contain safe example values only

## Deployment

When deploying to different environments:

1. **Development**: Use `.env` file
2. **Staging/Production**: Set environment variables in your hosting platform
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Docker: Use `-e` flag or docker-compose environment section

Example for Docker:
```bash
docker run -e REACT_APP_API_BASE_URL=https://api.example.com/api your-app
```
