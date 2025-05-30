import axios from 'axios';
export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('VITE_API_URL no está definida en el archivo .env');
}

// Crear instancia de axios con configuración base
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 5000,
});

// Add retry logic
api.interceptors.response.use(undefined, async (error) => {
  const { config } = error;
  if (!config || !config.retry) {
    config.retry = 1;
    return api(config);
  }
  return Promise.reject(error);
});

// Interceptor para añadir el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth?mode=login';
    }
    return Promise.reject(error.response?.data || error);
  }
); 