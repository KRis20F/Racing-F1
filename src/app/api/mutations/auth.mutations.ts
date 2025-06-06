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
import type { WelcomeGifts } from '../../services/walletService';

interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    publicKey?: string;
    welcomeGifts?: WelcomeGifts;
  };
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  fechaNacimiento: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: authEndpoints.getCurrentUser,
    retry: false,
    enabled: !!storage.getToken()
  });

  const { mutateAsync: login, isLoading: isLoggingIn, error: loginError } = useMutation<AuthResponse, Error, LoginData>({
    mutationFn: authEndpoints.login,
    onSuccess: (data) => {
      storage.setToken(data.token);
      storage.setUserData(data.user);
    }
  });

  const { mutateAsync: register, isLoading: isRegistering, error: registerError } = useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: authEndpoints.register,
    onSuccess: (data) => {
      storage.setToken(data.token);
      storage.setUserData(data.user);
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

  const logout = () => {
    console.log('Logging out...');
    storage.clearUserData();
    queryClient.clear();
    navigate('/auth?mode=login', { replace: true });
  };

  return {
    user,
    isLoadingUser,
    login,
    isLoggingIn,
    loginError,
    register,
    isRegistering,
    registerError,
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error,
    changePassword: changePasswordMutation.mutate,
    isChangingPassword: changePasswordMutation.isPending,
    changePasswordError: changePasswordMutation.error,
    logout
  };
}; 