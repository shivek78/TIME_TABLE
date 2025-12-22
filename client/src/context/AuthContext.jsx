import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authAPI from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* =========================
     LOGIN
     ========================= */
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);

      if (!response?.success) {
        return { success: false, message: response?.message || 'Login failed' };
      }

      const { token, user: userData } = response;

      // Persist auth
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          'Login failed. Please try again.'
      };
    }
  };

  /* =========================
     UPDATE USER (used after
     first-time password change)
     ========================= */
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  /* =========================
     LOGOUT
     ========================= */
  const logout = async () => {
    try {
      // optional server-side logout
      await authAPI.logout();
    } catch (error) {
      console.warn('Logout API failed (ignored):', error);
    } finally {
      // Always clear local auth
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  /* =========================
     CHECK AUTH (on refresh)
     ========================= */
  const checkAuth = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');

      if (!token || !storedUser) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Validate token by fetching profile
      const profileResponse = await authAPI.getProfile();

      if (profileResponse?.success) {
        setUser(profileResponse.user);
        setIsAuthenticated(true);
        localStorage.setItem(
          'user',
          JSON.stringify(profileResponse.user)
        );
      } else {
        await logout();
      }
    } catch (error) {
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     INIT
     ========================= */
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
