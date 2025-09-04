import { jwtDecode } from 'jwt-decode';

export const debugToken = () => {
  const token = localStorage.getItem('authToken');
  console.log('=== TOKEN DEBUG ===');
  
  if (!token) {
    console.log('❌ No token found in localStorage');
    console.log('Available keys:', Object.keys(localStorage));
    return null;
  }
  
  console.log('✅ Token found');
  console.log('Token preview:', token.substring(0, 50) + '...');
  
  try {
    const decoded = jwtDecode(token);
    console.log('✅ Token decoded successfully');
    console.log('Decoded payload:', decoded);
    console.log('User role:', decoded.role || 'No role found');
    console.log('Authorities:', decoded.authorities || 'No authorities found');
    console.log('Token expiry:', new Date(decoded.exp * 1000));
    console.log('Token issued at:', new Date(decoded.iat * 1000));
    return decoded;
  } catch (error) {
    console.log('❌ Failed to decode token:', error);
    return null;
  }
};

export const checkAdminAccess = () => {
  const decoded = debugToken();
  if (!decoded) return false;
  
  const userRole = decoded.role || decoded.authorities?.[0] || '';
  const hasAdminAccess = userRole.includes('ADMIN') || userRole.includes('ROLE_ADMIN');
  
  console.log('Admin access check:', hasAdminAccess ? '✅ GRANTED' : '❌ DENIED');
  console.log('Role checked:', userRole);
  
  return hasAdminAccess;
};

export default { debugToken, checkAdminAccess };
