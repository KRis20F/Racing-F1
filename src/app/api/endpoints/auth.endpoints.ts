import { api } from '../api.config';
import type { 
  AuthResponse, 
  LoginCredentials, 
  RegisterData, 
  ChangePasswordData,
  UpdateProfileData,
  UserData
} from '../../types/api/auth.types';

export const authEndpoints = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/register', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<UserData> => {
    const response = await api.get<UserData>('/api/auth/me');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<AuthResponse> => {
    const response = await api.put<AuthResponse>('/api/auth/profile', data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordData): Promise<void> => {
    await api.put('/api/auth/change-password', data);
  }
}; 