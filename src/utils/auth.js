import { jwtDecode } from 'jwt-decode';

export const getUserRole = () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    const decodedToken = jwtDecode(token);
    return decodedToken.role || decodedToken.authorities?.[0] || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isAdmin = () => {
  const userRole = getUserRole();
  return userRole && (userRole.includes('ADMIN') || userRole.includes('ROLE_ADMIN'));
};

export const getUserInfo = () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    const decodedToken = jwtDecode(token);
    return {
      id: decodedToken.sub || decodedToken.userId,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.username,
      role: decodedToken.role || decodedToken.authorities?.[0] || 'STUDENT',
      exp: decodedToken.exp
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenExpired = () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return true;

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};
