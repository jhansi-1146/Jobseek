// @refresh skip
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for authentication
const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  loading: true,
  login: (token, user) => {},
  logout: () => {},
});

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect to run on component mount to check for existing token in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (e) {
        // Handle case where stored user data is invalid
        console.error('Failed to parse user data from localStorage', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Function to handle login
  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Function to handle logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    isLoggedIn,
    token,
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthProvider as the default export
export default AuthProvider;
