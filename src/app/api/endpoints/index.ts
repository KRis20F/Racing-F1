import { api } from '../api.config';

// Auth endpoints
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { email: string; password: string; username: string }) =>
    api.post('/auth/register', userData),
};

// Dashboard endpoints
export const dashboardAPI = {
  getUserStats: () => api.get('/dashboard/user/stats'),
  getUserProfile: () => api.get('/dashboard/user/profile'),
  updateUserProfile: (data: any) => api.put('/dashboard/user/profile', data),
};

// Wallet endpoints
export const walletAPI = {
  getBalance: () => api.get('/wallet/balance'),
  getTransactions: () => api.get('/wallet/transactions'),
  transfer: (data: { amount: number; to: string }) => 
    api.post('/wallet/transfer', data),
};

// Game endpoints
export const gameAPI = {
  getLeaderboard: () => api.get('/game/leaderboard'),
  placeBet: (data: { amount: number; raceId: string }) =>
    api.post('/game/bet', data),
  getRaceHistory: () => api.get('/game/history'),
};

// Exchange endpoints
export const exchangeAPI = {
  getRates: () => api.get('/exchange/rates'),
  trade: (data: { amount: number; type: 'buy' | 'sell' }) =>
    api.post('/exchange/trade', data),
};

export * from './billing.endpoints';
export * from './marketplace.endpoints';
export * from './payment.endpoints'; 