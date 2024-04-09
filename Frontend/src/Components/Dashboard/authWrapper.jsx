import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const { authStatus, checkAuth } = useAuth();

    useEffect(() => {
        // Perform the authentication check on mount and whenever dependencies change
        // If checkAuth is supposed to update authStatus, ensure it's implemented to do so
        checkAuth();
    }, [checkAuth]);

    // Before the authentication check completes, you might want to render null or a loading spinner
    if (!authStatus.checked) {

        return null;
     } // or <LoadingSpinner /> for better UX

    // If checked and not authenticated, redirect to login
    if (authStatus.checked && !authStatus.isAuthenticated){

        return <Navigate to="/login" replace />;
    }

    // If checked and authenticated, render the children
    return children;
};

export default RequireAuth;
