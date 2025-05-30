import { createContext, useContext, type ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../api/mutations/auth.mutations';
import { useUserData } from '../features/userDashboard/hooks/useUserData';
import type { UserProfile, UserData } from '../types/api/auth.types';

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
    return !!localStorage.getItem('token');
  });

  // Recuperar el usuario del localStorage al inicio
  const [storedUser, setStoredUser] = useState<UserProfile | null>(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  });

  const { user: apiUser, isLoadingUser, logout: apiLogout } = useAuth();
  const { profile, game, finances, isLoading: isLoadingUserData } = useUserData();

  useEffect(() => {
    console.log('AuthProvider - Estado actual:', {
      apiUser,
      profile,
      game,
      finances,
      isLoadingUser,
      isLoadingUserData,
      isAuthenticated,
      pathname: location.pathname
    });
  }, [apiUser, profile, game, finances, isLoadingUser, isLoadingUserData, isAuthenticated, location]);

  // Actualizar el usuario cuando cambie en la API
  useEffect(() => {
    if (apiUser) {
      console.log('AuthProvider - Usuario actualizado desde API');
      setStoredUser(apiUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(apiUser));
    }
  }, [apiUser]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    console.log('AuthProvider - Verificando localStorage:', {
      hasToken: !!token,
      hasUser: !!userStr
    });

    if (token && userStr) {
      setIsAuthenticated(true);
      setStoredUser(JSON.parse(userStr));
    } else {
      setIsAuthenticated(false);
      setStoredUser(null);
    }
  }, []);

  useEffect(() => {
    // Si no está autenticado y no está en una ruta pública, redirigir a login
    const publicRoutes = ['/auth'];
    const isPublicRoute = publicRoutes.some(route => location.pathname.startsWith(route));

    console.log('AuthProvider - Verificando ruta:', {
      isAuthenticated,
      isPublicRoute,
      isLoadingUser,
      pathname: location.pathname
    });

    if (!isAuthenticated && !isPublicRoute && !isLoadingUser) {
      console.log('AuthProvider - Redirigiendo a login');
      navigate('/auth?mode=login', { 
        replace: true,
        state: { from: location.pathname }
      });
    }
  }, [isAuthenticated, location, navigate, isLoadingUser]);

  const handleLogout = () => {
    console.log('AuthProvider - Iniciando logout');
    apiLogout();
    setIsAuthenticated(false);
    setStoredUser(null);
    navigate('/auth?mode=login');
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