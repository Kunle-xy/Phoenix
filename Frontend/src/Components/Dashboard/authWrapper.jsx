import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthenticated from './auth';

const RequireAuth = ({ children }) => {
  const [authStatus, setAuthStatus] = useState({ checked: false, isAuthenticated: false });

  useEffect(() => {
    const checkAuth = async () => {
      const authResult = await isAuthenticated();
      setAuthStatus({ checked: true, isAuthenticated: authResult });
    };

    checkAuth();
  }, []);

  // Before the authentication check completes, you might want to render null or a loading spinner
  if (!authStatus.checked) return null; // or <LoadingSpinner /> for better UX

  // If checked and not authenticated, redirect to login
  if (authStatus.checked && !authStatus.isAuthenticated) return <Navigate to="/login" replace />;

  // If checked and authenticated, render the children
  return children;
};

export default RequireAuth;
