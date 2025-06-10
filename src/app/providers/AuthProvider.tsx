import { type ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../api/mutations/auth.mutations';
import { storage } from '../utils/storage';
import { useQueryClient } from '@tanstack/react-query';
import { AuthContext, BASE_PATH } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!storage.getToken());
  const { user: userData, isLoadingUser } = useAuth();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    if (isLoggingOut || isLoadingUser) return;

    const token = storage.getToken();
    const currentPath = location.pathname;

    // Si estamos en una ruta de autenticación, no hacer nada
    if (currentPath.includes('/auth')) {
      return;
    }

    // Si el usuario está autenticado y trata de acceder a auth, redirigir al dashboard
    if (isAuthenticated && token && currentPath === `${BASE_PATH}/auth`) {
      navigate(`${BASE_PATH}/dashboard`, { replace: true });
      return;
    }

    // Si el usuario no está autenticado y trata de acceder a rutas protegidas
    const isPublicPath = currentPath === '/' || currentPath === BASE_PATH;
    if (!isAuthenticated && !token && !isPublicPath) {
      navigate(`${BASE_PATH}/auth?mode=login`, {
        replace: true,
        state: { from: currentPath }
      });
    }
  }, [isAuthenticated, isLoadingUser, isLoggingOut, location.pathname, navigate]);

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

      // Redireccionar
      navigate(`${BASE_PATH}/auth?mode=login`, { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
      localStorage.clear();
      sessionStorage.clear();
      navigate(`${BASE_PATH}/auth?mode=login`, { replace: true });
    } finally {
      setIsLoggingOut(false);
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