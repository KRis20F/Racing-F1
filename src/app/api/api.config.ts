import axios from 'axios';
import { storage } from '../utils/storage';

export const API_URL = import.meta.env.VITE_API_URL;

// Crear instancia de axios con configuración base
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 5000,
});

// Interceptor para añadir el token JWT
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add retry logic
api.interceptors.response.use(undefined, async (error) => {
  const { config } = error;
  console.log('API Error:', {
    status: error.response?.status,
    data: error.response?.data,
    config: {
      url: config?.url,
      method: config?.method,
      headers: config?.headers
    }
  });
  
  if (!config || !config.retry) {
    config.retry = 1;
    return api(config);
  }
  return Promise.reject(error);
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('API Error Response:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Force clear specific items
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

      // Force reload to login page
      window.location.href = '/auth?mode=login';
      return Promise.reject(new Error('Session expired'));
    }
    
    return Promise.reject(error.response?.data || error);
  }
);

export interface ApiError {
  response?: {
    status?: number;
    data?: {
      error?: string;
      message?: string;
    };
  };
  message?: string;
} 