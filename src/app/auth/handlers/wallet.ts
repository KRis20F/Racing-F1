import api from '../core/api/apiProvides';

export interface WalletData {
  address: string;
  balance: string;
  tokens: {
    symbol: string;
    amount: string;
  }[];
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';
  amount: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  timestamp: string;
  from?: string;
  to?: string;
}

export const getWalletInfo = async (): Promise<WalletData> => {
  const response = await api.get<WalletData>('/wallet/info');
  return response.data;
};

export const getTransactions = async (page = 1, limit = 10): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>(`/wallet/transactions?page=${page}&limit=${limit}`);
  return response.data;
};

export const transferTokens = async (to: string, amount: string, symbol: string) => {
  const response = await api.post('/wallet/transfer', { to, amount, symbol });
  return response.data;
};

export const connectWallet = async (address: string) => {
  const response = await api.post('/wallet/connect', { address });
  return response.data;
};

export const disconnectWallet = async () => {
  const response = await api.post('/wallet/disconnect');
  return response.data;
};
