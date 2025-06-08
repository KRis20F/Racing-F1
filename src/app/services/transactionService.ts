import { api } from '../api/api.config';

export interface Transaction {
  id: number;
  type: 'transaction' | 'token_exchange';
  from_addr: string;
  to_addr: string;
  amount: string;
  signature: string;
  created_at: string;
  from_username: string;
  to_username: string;
}

export interface ShopTransaction {
  id: number;
  car_id: number;
  seller_id: number;
  price: number;
  currency: string;
  status: string;
  tx_type: string;
  created_at: string;
  car_name: string;
  car_category: string;
}

export const transactionService = {
  // Obtener historial general de transacciones
  getTransactionHistory: async (userId: number): Promise<Transaction[]> => {
    const response = await api.get<{ history: Transaction[] }>(`/api/transactions/history/${userId}`);
    return response.data.history;
  },

  // Obtener historial de compras de la tienda
  getShopHistory: async (userId: number): Promise<ShopTransaction[]> => {
    const response = await api.get<{ history: ShopTransaction[] }>(`/api/transactions/shop/${userId}`);
    return response.data.history;
  }
}; 