import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../../api/endpoints';

// Obtener el base path de Vite
const BASE_PATH = import.meta.env.BASE_URL || '/';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  username: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authAPI.login(credentials);
      const { token } = response.data;
      
      // Guardar el token
      localStorage.setItem('token', token);
      
      // Redirigir al dashboard
      navigate(`${BASE_PATH}dashboard`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authAPI.register(data);
      const { token } = response.data;
      
      // Guardar el token
      localStorage.setItem('token', token);
      
      // Redirigir al dashboard
      navigate(`${BASE_PATH}dashboard`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate(`${BASE_PATH}auth?mode=login`);
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return {
    login,
    register,
    logout,
    isAuthenticated,
    isLoading,
    error
  };
}; 