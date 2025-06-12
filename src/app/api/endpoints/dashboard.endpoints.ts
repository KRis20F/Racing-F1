import { api } from '../api.config';
import type { UserStats, TokenHistory, GlobalStats, MarketOverview, WalletInfo } from '../../types/api/dashboard.types';
import { authEndpoints } from './auth.endpoints';

// Endpoints
export const dashboardEndpoints = {
  // Estadísticas principales
  getUserStats: async (): Promise<UserStats> => {
    const response = await api.get<UserStats>('/api/dashboard/user/stats');
    return response.data;
  },

  // Información del usuario
  getUserProfile: authEndpoints.getCurrentUser,

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
    const userData = await authEndpoints.getCurrentUser();
    return {
      wallet: userData.finances?.wallet || {
        address: userData.publicKey || '',
        balance: '0.00'
      },
      usdBalance: userData.finances?.usdBalance || '0.00'
    };
  }
}; 