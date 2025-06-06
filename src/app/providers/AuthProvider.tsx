import React, { createContext, useContext, type ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../api/mutations/auth.mutations';
import type { UserData } from '../types/api/auth.types';
import { storage } from '../utils/storage';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userData: UserData | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  userData: null,
  logout: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!storage.getToken();
  });

  const { user: userData, isLoadingUser } = useAuth();
  const queryClient = useQueryClient();

  // Add isLoggingOut state
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Actualizar autenticación cuando cambie el usuario
  useEffect(() => {
    if (userData) {
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData.profile));
    }
  }, [userData]);

  // Verificar autenticación y proteger rutas
  useEffect(() => {
    // Skip route protection during logout
    if (isLoggingOut) return;

    const protectedPaths = ['/dashboard', '/profile', '/garage', '/cars', '/game', '/exchange'];
    const isProtectedRoute = protectedPaths.some(path => location.pathname.startsWith(path));
    const isAuthRoute = location.pathname.startsWith('/auth');

    if (!isAuthenticated && !isLoadingUser && isProtectedRoute) {
      navigate('/auth?mode=login', { 
        replace: true,
        state: { from: location.pathname }
      });
    } else if (isAuthenticated && isAuthRoute) {
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate, isLoadingUser, isLoggingOut]);

  const handleLogout = async () => {
    try {
      // 1. Set logout flag
      setIsLoggingOut(true);

      // 2. Clear all React Query state
      await queryClient.cancelQueries();
      queryClient.clear();
      queryClient.removeQueries();
      
      // 3. Clear React state
      setIsAuthenticated(false);

      // 4. Clear all storage data
      storage.clearUserData();
      localStorage.clear();
      sessionStorage.clear();

      // 5. Force clear all known keys
      const keysToRemove = [
        'user',
        'token',
        'walletDialogDismissed',
        'racing_user_data',
        'persist:root',
        'lastLogin'
      ];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });

      // 6. Force a complete page reload and redirect
      window.location.href = '/auth?mode=login';
    } catch (error) {
      console.error('Error during logout:', error);
      // If all else fails, force a hard reset
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/auth?mode=login';
    }
  };

  const value = {
    isAuthenticated,
    isLoading: isLoadingUser,
    userData: userData || null,
    logout: handleLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 