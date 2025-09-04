/**
 * Admin User Creation Utility
 * This utility provides different methods to create admin users
 */

import config from '../config/config';

/**
 * Method 1: Create Admin User via API (if backend supports it)
 * This assumes your backend has an endpoint to create admin users
 */
export const createAdminUser = async (adminData) => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/auth/create-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You might need an existing admin token for this
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        email: adminData.email,
        password: adminData.password,
        name: adminData.name,
        role: 'ADMIN' // or 'ROLE_ADMIN'
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create admin user: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Admin user created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

/**
 * Method 2: Register normal user and manually upgrade to admin
 * Step 1: Register a normal user
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('User registered successfully:', result);
    return result;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Method 3: Admin role upgrade (if you have an existing admin)
 * Promote a regular user to admin
 */
export const promoteUserToAdmin = async (userId) => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/admin/users/${userId}/promote`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        role: 'ADMIN'
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to promote user: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('User promoted to admin successfully:', result);
    return result;
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    throw error;
  }
};

/**
 * Helper function to check if current user is admin
 */
export const checkAdminStatus = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  try {
    // Decode JWT token manually (without jwt-decode library dependency)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const decodedToken = JSON.parse(jsonPayload);
    const userRole = decodedToken.role || decodedToken.authorities?.[0] || '';
    
    return userRole.includes('ADMIN') || userRole.includes('ROLE_ADMIN');
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Development helper: Create default admin user
 * Use this for development/testing purposes
 */
export const createDefaultAdmin = async () => {
  const defaultAdminData = {
    email: 'admin@interviewprep.com',
    password: 'Admin123!',
    name: 'System Administrator',
    role: 'ADMIN'
  };

  console.log('Creating default admin user:', defaultAdminData.email);
  
  try {
    // Try Method 1 first (direct admin creation)
    return await createAdminUser(defaultAdminData);
  } catch (error) {
    console.log('Direct admin creation failed, trying registration + promotion...');
    
    try {
      // Method 2: Register then promote
      const userResult = await registerUser(defaultAdminData);
      console.log('Default admin user registered. You may need to manually promote to admin in the database.');
      return userResult;
    } catch (registrationError) {
      console.error('Failed to create default admin user:', registrationError);
      throw registrationError;
    }
  }
};

const adminUtils = {
  createAdminUser,
  registerUser,
  promoteUserToAdmin,
  checkAdminStatus,
  createDefaultAdmin
};

export default adminUtils;
