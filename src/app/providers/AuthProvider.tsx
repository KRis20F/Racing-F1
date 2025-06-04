import { createContext, useContext, type ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../api/mutations/auth.mutations';
import { useUserData } from '../features/userDashboard/hooks/useUserData';
import type { UserProfile, UserData } from '../types/api/auth.types';
import { storage } from '../utils/storage';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  userData: UserData | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
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

  const [storedUser, setStoredUser] = useState<UserProfile | null>(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  });

  const { user: apiUser, isLoadingUser } = useAuth();
  const { profile, game, finances, isLoading: isLoadingUserData } = useUserData();
  const queryClient = useQueryClient();

  // Add isLoggingOut state
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Actualizar el usuario cuando cambie en la API
  useEffect(() => {
    if (apiUser) {
      setStoredUser(apiUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(apiUser));
    }
  }, [apiUser]);

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
      setStoredUser(null);

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
    isLoading: isLoadingUser || isLoadingUserData,
    user: storedUser,
    userData: profile && game && finances ? {
      profile,
      game,
      finances
    } : null,
    logout: handleLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 