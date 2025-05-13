import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Extender AxiosRequestConfig para incluir _retry
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('VITE_API_URL no está definida en el archivo .env');
}

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 segundos timeout
});

// Interceptor para añadir el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    console.log('Enviando petición a:', config.url);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => {
    console.log('Respuesta recibida:', response.status);
    return response;
  },
  async (error: AxiosError) => {
    console.error('Error en la respuesta:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    const config = error.config as CustomAxiosRequestConfig;
    if (error.response?.status === 401 && !config?._retry) {
      config._retry = true;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth?mode=login';
    }

    // Transformar el error para que sea más fácil de manejar en el frontend
    const errorResponse = error.response?.data || { msg: error.message };
    return Promise.reject(errorResponse);
  }
);

// Interfaces para tipado
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  fechaNacimiento: string;
}

// Función de login mejorada usando axios
export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    console.log('Intentando login con:', { 
      email,
      passwordLength: password.length,
      requestUrl: `${API_URL}/auth/login`
    });

    // Verificar que los datos no estén vacíos
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }

    // Verificar el formato de los datos
    const loginData = {
      email: email.trim(),
      password: password
    };

    console.log('Datos de login formateados:', {
      email: loginData.email,
      passwordLength: loginData.password.length
    });

    const response = await api.post<LoginResponse>('/auth/login', loginData);
    
    console.log('Respuesta del servidor:', {
      status: response.status,
      headers: response.headers,
      data: response.data
    });

    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  } catch (error) {
    console.error('Error detallado en login:', {
      error,
      isAxiosError: axios.isAxiosError(error),
      response: axios.isAxiosError(error) ? error.response?.data : null,
      status: axios.isAxiosError(error) ? error.response?.status : null
    });
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { msg: 'Error en el servidor' };
    }
    throw error;
  }
}

// Función de registro mejorada usando axios
export async function register(
  name: string,
  email: string,
  password: string,
  fechaNacimiento: string
): Promise<LoginResponse> {
  try {
    console.log('Intentando registro con:', { email, name });
    const response = await api.post<LoginResponse>('/auth/register', {
      name,
      email,
      password,
      fechaNacimiento
    });
    
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { msg: 'Error en el registro' };
    }
    throw error;
  }
}

// Función para cerrar sesión
export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/auth?mode=login';
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

// Función para obtener el perfil del usuario
export async function getProfile() {
  try {
    const response = await api.get('/api/auth/profile');
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