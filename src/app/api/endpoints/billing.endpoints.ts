import { api } from '../api.config';

export interface Transaction {
  id: number;
  type: 'DEPOSIT' | 'BET' | 'WITHDRAWAL' | 'RACE_REWARD';
  amount: string;
  timestamp: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface BalanceHistoryItem {
  timestamp: string;
  balance: string;
  change: string;
  reason: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
}

export interface BalanceHistoryResponse {
  currentBalance: string;
  history: BalanceHistoryItem[];
}

export const billingEndpoints = {
  getTransactions: async (): Promise<TransactionsResponse> => {
    const response = await api.get<TransactionsResponse>('/api/billing/transactions');
    return response.data;
  },

  getBalanceHistory: async (): Promise<BalanceHistoryResponse> => {
    const response = await api.get<BalanceHistoryResponse>('/api/billing/balance-history');
    return response.data;
  }
}; 