import axios from 'axios';
import { storage } from '../utils/storage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Crear instancia de axios con configuración base
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('API Error:', error.response);
      
      // Si el error es 401 (no autorizado), limpiar el token
      if (error.response.status === 401) {
        storage.clearToken();
        window.location.href = '/login';
      }

      // Si el error es 403 (prohibido), redirigir a la página de inicio
      if (error.response.status === 403) {
        window.location.href = '/';
      }

      // Registrar detalles del error para debugging
      console.error('API Error Response:', {
        url: error.response.config.url,
        status: error.response.status,
        data: error.response.data,
        message: error.message
      });
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('API Error: No response received', error.request);
    } else {
      // Algo sucedió al configurar la petición
      console.error('API Error:', error.message);
    }

    return Promise.reject(error);
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