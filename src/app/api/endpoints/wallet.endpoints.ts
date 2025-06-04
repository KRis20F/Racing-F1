import { api } from '../api.config';
import { storage } from '../../utils/storage';

export interface WalletResponse {
  user: {
    id: number;
    username: string;
    publicKey: string;
  };
  wallet: {
    address: string;
    balance: string;
  };
}

export interface TokenAccountResponse {
  tokenAccount: string;
  balance: string;
}

export interface TransferResponse {
  signature: string;
  fromBalance: string;
  toBalance: string;
}

export interface TokenBalanceResponse {
  publicKey: string;
  balance: string;
  tokenSymbol: string;
}

interface ApiError {
  response?: {
    status?: number;
    data?: {
      error?: string;
      message?: string;
    };
  };
  message?: string;
}

export const walletEndpoints = {
  createWallet: async (): Promise<WalletResponse> => {
    try {
      const token = storage.getToken();
      
      const response = await api.post<WalletResponse>('/api/wallet/create', {}, {
        headers: {
          'x-auth-token': token
        }
      });
      
    return response.data;
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  },

  createTokenAccount: async (publicKey: string): Promise<TokenAccountResponse> => {
    try {
      const token = storage.getToken();
      
      console.log('Creating token account with:', {
        endpoint: '/api/wallet/token/account',
        publicKey,
        hasToken: !!token
      });

      const response = await api.post<TokenAccountResponse>('/api/wallet/token/account', { 
        publicKey,
        tokenType: 'RCT'
      }, {
        headers: {
          'x-auth-token': token
        }
      });

      console.log('Token account created:', response.data);
    return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error creating token account:', {
        status: apiError.response?.status,
        data: apiError.response?.data,
        message: apiError.message,
        publicKey
      });
      throw error;
    }
  },

  transferTokens: async (fromPublicKey: string, toPublicKey: string, amount: string): Promise<TransferResponse> => {
    const response = await api.post<TransferResponse>('/api/wallet/token/transfer', {
      fromPublicKey,
      toPublicKey,
      amount
    });
    return response.data;
  },

  getTokenBalance: async (address: string): Promise<TokenBalanceResponse> => {
    try {
      const token = storage.getToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      if (!address) {
        throw new Error('No wallet address provided');
      }

      // Validate wallet address format
      if (!/^[A-HJ-NP-Za-km-z1-9]*$/.test(address)) {
        throw new Error('Invalid wallet address format');
      }
      
      console.log('Requesting token balance with:', {
        endpoint: `/api/wallet/token/balance/${address}`,
        hasToken: !!token,
        address
      });
      
      const response = await api.get<TokenBalanceResponse>(`/api/wallet/token/balance/${address}`, {
        headers: {
          'x-auth-token': token
        },
        timeout: 10000 // Increase timeout for this specific request
      });
      
      if (!response.data) {
        throw new Error('Invalid response from token balance endpoint');
      }
      
      console.log('Token balance response:', response.data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Token balance error details:', {
        status: apiError.response?.status,
        data: apiError.response?.data,
        message: apiError.message,
        publicKey: address
      });
      
      // Handle specific error cases
      if (apiError.response?.status === 401) {
        storage.clearUserData();
        window.location.href = '/auth?mode=login';
      } else if (apiError.response?.status === 400) {
        // Check if it's due to invalid wallet
        const errorMessage = apiError.response?.data?.error || 'Invalid request';
        throw new Error(errorMessage);
      }
      
      throw error;
    }
  }
}; 