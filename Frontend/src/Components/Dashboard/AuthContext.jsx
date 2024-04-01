import { createContext, useContext, useState, useEffect } from 'react';
import isAuthenticated from './auth';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState({ checked: false, isAuthenticated: false });
  const checkAuth = async () => {
    const authResult = await isAuthenticated();
    setAuthStatus({ checked: true, isAuthenticated: authResult });
    return authResult;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
