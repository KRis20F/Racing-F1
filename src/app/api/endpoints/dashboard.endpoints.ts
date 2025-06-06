import { api } from '../api.config';
import type { UserStats, TokenHistory, GlobalStats, MarketOverview, WalletInfo } from '../../types/api/dashboard.types';
import type { UserData } from '../../types/api/auth.types';

// Endpoints
export const dashboardEndpoints = {
  // Estadísticas principales
  getUserStats: async (): Promise<UserStats> => {
    const response = await api.get<UserStats>('/api/dashboard/user/stats');
    return response.data;
  },

  // Información del usuario
  getUserProfile: async (): Promise<UserData> => {
    const response = await api.get<UserData>('/api/auth/me');
    return response.data;
  },

  // Historial de precios del token
  getTokenHistory: async (): Promise<TokenHistory[]> => {
    const response = await api.get<TokenHistory[]>('/api/dashboard/token/price-history');
    return response.data;
  },

  // Estadísticas globales
  getGlobalStats: async (): Promise<GlobalStats> => {
    const response = await api.get<GlobalStats>('/api/dashboard/global/stats');
    return response.data;
  },

  // Resumen del mercado
  getMarketOverview: async (): Promise<MarketOverview> => {
    const response = await api.get<MarketOverview>('/api/dashboard/market/overview');
    return response.data;
  },

  // Información de la wallet
  getWalletInfo: async (): Promise<WalletInfo> => {
    const response = await api.get<WalletInfo>('/api/dashboard/wallet/info');
    return response.data;
  }
}; 