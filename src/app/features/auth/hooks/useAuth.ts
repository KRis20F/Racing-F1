import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../../api/endpoints';

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
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
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
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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