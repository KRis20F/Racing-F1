import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authEndpoints } from '../endpoints/auth.endpoints';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  ChangePasswordData,
  UpdateProfileData,
  UserProfile,
  // UserData
} from '../../types/api/auth.types';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: authEndpoints.login,
    onSuccess: (data) => {
      console.log('Login exitoso:', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.setQueryData(['user'], data.user);
      console.log('Estado actualizado, redirigiendo a dashboard...');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 100);
    },
    onError: (error) => {
      console.error('Error en login:', error);
    }
  });

  const registerMutation = useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: authEndpoints.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/auth?mode=login&registered=true');
    }
  });

  const updateProfileMutation = useMutation<AuthResponse, Error, UpdateProfileData>({
    mutationFn: authEndpoints.updateProfile,
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.setQueryData(['user'], data.user);
    }
  });

  const changePasswordMutation = useMutation<void, Error, ChangePasswordData>({
    mutationFn: authEndpoints.changePassword
  });

  const { data: user, isLoading: isLoadingUser } = useQuery<UserProfile | null, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      console.log('Verificando usuario actual...');
      const token = localStorage.getItem('token');
      console.log('Token actual:', token ? 'Existe' : 'No existe');
      
      if (!token) return null;
      
      try {
        const response = await authEndpoints.getCurrentUser();
        console.log('Usuario actual:', response.profile);
        return response.profile;
      } catch (error) {
        console.error('Error al obtener usuario:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw error;
      }
    },
    retry: false,
    enabled: !!localStorage.getItem('token'),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30
  });

  const logout = () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    queryClient.clear();
    navigate('/auth?mode=login');
  };

  return {
    user,
    isLoadingUser,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error,
    changePassword: changePasswordMutation.mutate,
    isChangingPassword: changePasswordMutation.isPending,
    changePasswordError: changePasswordMutation.error,
    logout
  };
}; 