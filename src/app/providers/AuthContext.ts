import { createContext } from 'react';
import type { UserProfile } from '../types/api/auth.types';

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userData: UserProfile | null;
  logout: () => Promise<void>;
}

// Inicializamos con valores por defecto para evitar null checks
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: false,
  userData: null,
  logout: async () => {},
});

// Base path constante
export const BASE_PATH = '/Racing-F1'; 