import React, { createContext, useState, useContext, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = apiService.getCurrentUser();
    if (savedUser && apiService.isAuthenticated()) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const signup = async (email, password, name) => {
    const userData = await apiService.signup(email, password, name);
    setUser(userData);
    apiService.saveCurrentUser(userData);
    return userData;
  };

  const login = async (email, password) => {
    const userData = await apiService.login(email, password);
    setUser(userData);
    apiService.saveCurrentUser(userData);
    return userData;
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
