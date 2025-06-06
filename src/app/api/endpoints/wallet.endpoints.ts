import { api } from '../api.config';
import { storage } from '../../utils/storage';
import type { ApiError } from '../api.config';

export interface WalletResponse {
  user: {
    id: number;
    username: string;
    email: string;
    publicKey: string;
    level: number;
    rank: string;
    experience: number;
  };
  wallet: {
    address: string;
    balance: string;
  };
  welcomeBonus: {
    amount: number;  // 10 RCF tokens
    signature: string;
    tokenAccount: string;
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

export const walletEndpoints = {
  createWallet: async (): Promise<WalletResponse> => {
    try {
      const token = storage.getToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.post<WalletResponse>('/api/wallet/create', {}, {
        headers: {
          'x-auth-token': token
        }
      });

      // Actualizar el token del usuario con la nueva información
      if (response.data.user) {
        const currentUser = storage.getUserData();
        storage.setUserData({
          ...currentUser,
          publicKey: response.data.user.publicKey
        });
      }
      
      return response.data;
    } catch (error: any) {
      // Si el error es porque ya tiene wallet, propagamos el error para manejarlo en el componente
      if (error?.response?.status === 400 && error?.response?.data?.error === 'El usuario ya tiene wallet') {
        throw new Error('USER_HAS_WALLET');
      }
      
      console.error('Error creating wallet:', error?.response?.data || error);
      throw error;
    }
  },

  createTokenAccount: async (publicKey: string): Promise<TokenAccountResponse> => {
    try {
      console.log('Creating token account with:', {
        endpoint: '/api/wallet/token/account',
        publicKey,
        hasToken: !!storage.getToken()
      });

      const response = await api.post<TokenAccountResponse>('/api/wallet/token/account', { 
        publicKey
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
      
      // Retornamos una respuesta simulada exitosa
      return {
        tokenAccount: publicKey,
        balance: '0'
      };
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
      console.log('Info: Error getting token balance:', {
        status: apiError.response?.status,
        data: apiError.response?.data,
        message: apiError.message,
        publicKey: address
      });
      
      // Retornar un balance por defecto en caso de error
      return {
        publicKey: address,
        balance: '0',
        tokenSymbol: 'RCF'
      };
    }
  },

  // Obtener balance de SOL
  getSolBalance: async (address: string): Promise<{ address: string; sol: number }> => {
    try {
      const token = storage.getToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      if (!address) {
        throw new Error('No wallet address provided');
      }
      
      const response = await api.get(`/api/wallet/sol/balance/${address}`, {
        headers: {
          'x-auth-token': token
        }
      });
      
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      console.log('Error getting SOL balance:', {
        status: apiError.response?.status,
        data: apiError.response?.data,
        message: apiError.message,
        address
      });
      
      // Retornar un balance por defecto en caso de error
      return {
        address,
        sol: 0
      };
    }
  }
}; 