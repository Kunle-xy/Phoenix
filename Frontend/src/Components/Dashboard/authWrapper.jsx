import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { authStatus } = useAuth();

  // Before the authentication check completes, you might want to render null or a loading spinner
  if (!authStatus.checked) return null; // or <LoadingSpinner /> for better UX

  // If checked and not authenticated, redirect to login
  if (authStatus.checked && !authStatus.isAuthenticated) return <Navigate to="/login" replace />;

  // If checked and authenticated, render the children
  return children;
};

export default RequireAuth;
