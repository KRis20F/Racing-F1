import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authEndpoints } from '../endpoints/auth.endpoints';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  ChangePasswordData,
  UpdateProfileData,
  UserProfile,
} from '../../types/api/auth.types';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: authEndpoints.login,
    onSuccess: (data) => {
      if (!data.token || !data.user) {
        console.error('Login response missing token or user data:', data);
        throw new Error('Invalid login response');
      }

      console.log('Login successful, storing session data...');
      console.log('Storing token:', data.token.substring(0, 20) + '...');
      
      storage.setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Actualizar cache de React Query
      queryClient.setQueryData(['user'], data.user);
      
      console.log('Redirecting to dashboard...');
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      console.error('Login error:', error);
      storage.clearUserData();
      queryClient.setQueryData(['user'], null);
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
      if (!data.user) {
        console.error('Update profile response missing user data:', data);
        throw new Error('Invalid update profile response');
      }
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
      const token = storage.getToken();
      
      if (!token) {
        console.log('No token found, user not authenticated');
        return null;
      }
      
      try {
        console.log('Fetching current user data...');
        const response = await authEndpoints.getCurrentUser();
        
        if (!response.profile) {
          console.error('getCurrentUser response missing profile:', response);
          throw new Error('Invalid user data response');
        }
        
        console.log('User data fetched successfully');
        return response.profile;
      } catch (error) {
        console.error('Error fetching user data:', error);
        storage.clearUserData();
        queryClient.setQueryData(['user'], null);
        navigate('/auth?mode=login', { replace: true });
        throw error;
      }
    },
    retry: false,
    enabled: !!storage.getToken(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 30 // 30 minutos
  });

  const logout = () => {
    console.log('Logging out...');
    storage.clearUserData();
    queryClient.clear();
    navigate('/auth?mode=login', { replace: true });
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