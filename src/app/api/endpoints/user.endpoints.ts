import { api } from '../api.config';
import type { UserProfile } from '../../types/api/auth.types';

interface GameData {
  experience: number;
  totalRaces: number;
  wins: number;
  losses: number;
  rank: string;
  stats: {
    bestLapTime: number | null;
    carCollection: string[];
    favoriteTrack: string | null;
    totalDistance: number;
  };
}

interface FinanceData {
  tokenBalance: string;
  usdBalance: string;
  wallet: {
    balance: string;
    address: string;
  };
  transaction_limits: {
    daily_limit: number;
    monthly_limit: number;
    max_transaction: number;
  };
  billing_preferences: {
    auto_pay: boolean;
    invoice_email: string | null;
    default_currency: string;
  };
}

interface UserData {
  profile: UserProfile;
  game: GameData;
  finances: FinanceData;
}

interface UserStats {
  level: number;
  experience: number;
  totalRaces: number;
  wins: number;
  losses: number;
  rank: string;
  tokenBalance: string;
  stats: {
    bestLapTime: number | null;
    carCollection: string[];
    favoriteTrack: string | null;
    totalDistance: number;
  };
}

interface UserEarnings {
  totalEarnings: number;
  recentHistory: Array<{
    amount: number;
    date: string;
    type: string;
  }>;
}

interface UserAchievements {
  badges: string[];
  stats: {
    bestLapTime: number | null;
    carCollection: string[];
    favoriteTrack: string | null;
    totalDistance: number;
  };
}

export const userEndpoints = {
  // Obtener datos completos del usuario
  getUserData: async (): Promise<UserData> => {
    const response = await api.get<UserData>('/api/auth/me');
    return response.data;
  },

  // Obtener estadísticas del usuario
  getUserStats: async (): Promise<UserStats> => {
    const response = await api.get<UserStats>('/api/dashboard/user/stats');
    return response.data;
  },

  // Obtener historial de carreras
  getRaceHistory: async () => {
    const response = await api.get('/api/dashboard/user/race-history');
    return response.data;
  },

  // Obtener ganancias del usuario
  getUserEarnings: async (): Promise<UserEarnings> => {
    const response = await api.get<UserEarnings>('/api/dashboard/user/earnings');
    return response.data;
  },

  // Obtener logros del usuario
  getUserAchievements: async (): Promise<UserAchievements> => {
    const response = await api.get<UserAchievements>('/api/dashboard/user/achievements');
    return response.data;
  },

  // Actualizar preferencias de facturación
  updateBillingPreferences: async (preferences: FinanceData['billing_preferences']) => {
    const response = await api.put('/api/user/billing-preferences', preferences);
    return response.data;
  },

  // Actualizar límites de transacciones
  updateTransactionLimits: async (limits: FinanceData['transaction_limits']) => {
    const response = await api.put('/api/user/transaction-limits', limits);
    return response.data;
  }
}; 