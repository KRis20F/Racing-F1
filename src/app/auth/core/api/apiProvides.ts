import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir el token a todas las peticiones
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

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Interfaces para tipado
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fechaNacimiento: string;
}

// Función de login mejorada usando axios
export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
}

// Función de registro mejorada usando axios
export async function register(
  username: string,
  email: string,
  password: string,
  fechaNacimiento: string
): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/auth/register', {
      username,
      email,
      password,
      fechaNacimiento
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
}

// Función para cerrar sesión
export function logout(): void {
  localStorage.removeItem('token');
  window.location.href = '/login';
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

// Función para obtener el perfil del usuario
export async function getProfile() {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
}

// Exportar la instancia de api para uso en otros módulos
export default api;