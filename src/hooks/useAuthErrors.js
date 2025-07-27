import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthErrors = () => {
  const [sessionExpired, setSessionExpired] = useState(false);
  const [accessForbidden, setAccessForbidden] = useState(false);
  const [forbiddenMessage, setForbiddenMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleSessionExpired = () => {
      setSessionExpired(true);
      console.log('Session expired detected');
    };

    const handleAccessForbidden = (event) => {
      setAccessForbidden(true);
      setForbiddenMessage(event.detail?.error?.message || 'Access forbidden');
      console.log('Access forbidden detected:', event.detail);
    };

    // Listen for custom auth events
    window.addEventListener('auth:session-expired', handleSessionExpired);
    window.addEventListener('auth:access-forbidden', handleAccessForbidden);

    return () => {
      window.removeEventListener('auth:session-expired', handleSessionExpired);
      window.removeEventListener('auth:access-forbidden', handleAccessForbidden);
    };
  }, []);

  const dismissSessionExpired = () => {
    setSessionExpired(false);
    navigate('/auth');
  };

  const dismissAccessForbidden = () => {
    setAccessForbidden(false);
  };

  return {
    sessionExpired,
    accessForbidden,
    forbiddenMessage,
    dismissSessionExpired,
    dismissAccessForbidden
  };
};
