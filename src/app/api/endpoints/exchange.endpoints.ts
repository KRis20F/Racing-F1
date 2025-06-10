import { api } from '../api.config';

export interface ExchangeRequest {
  amount: string;
  type: 'BUY' | 'SELL';
  paymentMethod: string;
}

export interface ExchangeResponse {
  transactionId: string;
  amount: string;
  type: 'BUY' | 'SELL';
  rate: string;
  total: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface TokenTransferRequest {
  fromUserId: string;
  toUserId: string;
  token: string;
  amount: string;
}

export interface NFTTransferRequest {
  fromUserId: string;
  toUserId: string;
  nftId: string;
}

export interface NFTTransferResponse {
  success: boolean;
  transactionHash: string;
  message: string;
}

export interface Order {
  id: number;
  user_id: number;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price: string | null;
  amount: string;
  filled_amount: string;
  status: string;
  pair: string;
  created_at: string;
  updated_at: string;
}

export interface OrderBookResponse {
  buy: Order[];
  sell: Order[];
}

export interface RecentTrade {
  id: number;
  side: string;
  price: string;
  amount: string;
  timestamp: string;
  from: string;
  to: string;
}

export interface CreateOrderRequest {
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price?: string;
  amount: string;
  pair: string;
}

export interface CancelOrderRequest {
  orderId: number;
}

export const exchangeEndpoints = {
  exchangeToken: async (data: ExchangeRequest): Promise<ExchangeResponse> => {
    const response = await api.post<ExchangeResponse>('/api/exchange/token', data);
    return response.data;
  },

  transferToken: async (data: TokenTransferRequest): Promise<void> => {
    await api.post('/api/exchange/token', data);
  },

  transferNFT: async (data: NFTTransferRequest): Promise<NFTTransferResponse> => {
    const response = await api.post('/api/exchange/nft', data);
    return response.data;
  },

  getOrderBook: async (pair: string): Promise<OrderBookResponse> => {
    const response = await api.get<OrderBookResponse>(`/api/exchange/orderbook?pair=${encodeURIComponent(pair)}`);
    return response.data;
  },

  getRecentTrades: async (pair: string, limit = 5): Promise<RecentTrade[]> => {
    const response = await api.get<RecentTrade[]>(`/api/exchange/recent-trades?pair=${encodeURIComponent(pair)}&limit=${limit}`);
    return response.data;
  },

  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await api.post<Order>('/api/exchange/order', data);
    return response.data;
  },

  cancelOrder: async (orderId: number): Promise<{ status: string; order: Order }> => {
    const response = await api.post<{ status: string; order: Order }>('/api/exchange/order/cancel', { orderId });
    return response.data;
  }
}; 