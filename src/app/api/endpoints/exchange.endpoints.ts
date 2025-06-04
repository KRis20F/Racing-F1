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
  }
}; 