import { jwtDecode } from 'jwt-decode';

/**
 * Debug utility to check token status and admin access
 * Call this in browser console: window.debugAdminAccess()
 */
export const debugAdminAccess = () => {
  console.log('=== ADMIN ACCESS DEBUG ===');
  
  // Check localStorage keys
  console.log('1. LocalStorage Contents:');
  const keys = Object.keys(localStorage);
  console.log('Available keys:', keys);
  
  keys.forEach(key => {
    const value = localStorage.getItem(key);
    if (key.includes('token') || key.includes('Token')) {
      console.log(`${key}:`, value ? value.substring(0, 30) + '...' : 'null');
    } else {
      console.log(`${key}:`, value);
    }
  });
  
  // Check specific token keys
  console.log('\n2. Token Analysis:');
  const authToken = localStorage.getItem('authToken');
  const token = localStorage.getItem('token');
  
  console.log('authToken exists:', !!authToken);
  console.log('token exists:', !!token);
  
  // Decode token if available
  const activeToken = authToken || token;
  if (activeToken) {
    try {
      const decoded = jwtDecode(activeToken);
      console.log('\n3. Decoded Token:');
      console.log('Full payload:', decoded);
      console.log('Role:', decoded.role);
      console.log('Authorities:', decoded.authorities);
      console.log('Email:', decoded.email || decoded.sub);
      console.log('Issued at:', new Date(decoded.iat * 1000));
      console.log('Expires at:', new Date(decoded.exp * 1000));
      console.log('Is expired?', new Date() > new Date(decoded.exp * 1000));
      
      // Check admin status
      console.log('\n4. Admin Status Check:');
      const userRole = decoded.role || decoded.authorities?.[0] || '';
      const isAdmin = userRole.includes('ADMIN') || userRole.includes('ROLE_ADMIN');
      console.log('User role:', userRole);
      console.log('Is admin?', isAdmin ? '✅ YES' : '❌ NO');
      
      if (isAdmin) {
        console.log('✅ Admin access should work!');
        console.log('Try navigating to: /admin');
      } else {
        console.log('❌ Admin access denied');
        console.log('Expected role: ADMIN or ROLE_ADMIN');
        console.log('Actual role:', userRole);
      }
      
    } catch (error) {
      console.log('❌ Token decode failed:', error);
    }
  } else {
    console.log('❌ No token found');
  }
  
  console.log('\n5. Next Steps:');
  if (!activeToken) {
    console.log('- You need to login first');
    console.log('- Go to /auth and login with admin credentials');
  } else if (activeToken) {
    console.log('- Token exists, check admin role in database');
    console.log('- Ensure user role is set to "ROLE_ADMIN" in database');
  }
  
  console.log('=== END DEBUG ===');
};

// Make it available globally for browser console debugging
if (typeof window !== 'undefined') {
  window.debugAdminAccess = debugAdminAccess;
}

export default debugAdminAccess;
