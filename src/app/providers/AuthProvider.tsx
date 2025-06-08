import { createContext, useContext, type ReactNode, useEffect, useState } from 'react';
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

const AuthContext = createContext<AuthContextType | null>(null);

// Separar el hook del contexto
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Exportar el componente AuthProvider por separado
export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!storage.getToken();
  });

  const { user: userData, isLoadingUser } = useAuth();
  const queryClient = useQueryClient();
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
    if (isLoggingOut || isLoadingUser) return;

    const isAuthRoute = location.pathname.startsWith('/auth');
    const token = storage.getToken();

    // Si estamos en una ruta de autenticación y ya estamos autenticados
    if (isAuthRoute && isAuthenticated && token) {
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
      return;
    }

    // Si no estamos en una ruta de autenticación y no estamos autenticados
    if (!isAuthRoute && !isAuthenticated && !token) {
      navigate('/auth?mode=login', {
        replace: true,
        state: { from: location.pathname }
      });
      return;
    }
  }, [isAuthenticated, location.pathname, navigate, isLoadingUser, isLoggingOut]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Limpiar estado de React Query
      await queryClient.cancelQueries();
      queryClient.clear();
      queryClient.removeQueries();
      
      // Limpiar estado de React
      setIsAuthenticated(false);

      // Limpiar almacenamiento
      storage.clearUserData();
      localStorage.clear();
      sessionStorage.clear();

      // Limpiar claves específicas
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

      // Redireccionar y recargar
      window.location.href = '/auth?mode=login';
    } catch (error) {
      console.error('Error during logout:', error);
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
} 