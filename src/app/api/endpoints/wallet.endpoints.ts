import { api } from '../api.config';

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

export const walletEndpoints = {
  createWallet: async (): Promise<WalletResponse> => {
    const response = await api.post<WalletResponse>('/api/wallet/create');
    return response.data;
  },

  createTokenAccount: async (publicKey: string): Promise<TokenAccountResponse> => {
    const response = await api.post<TokenAccountResponse>('/api/wallet/token/account', { publicKey });
    return response.data;
  },

  transferTokens: async (fromPublicKey: string, toPublicKey: string, amount: string): Promise<TransferResponse> => {
    const response = await api.post<TransferResponse>('/api/wallet/token/transfer', {
      fromPublicKey,
      toPublicKey,
      amount
    });
    return response.data;
  },

  getTokenBalance: async (publicKey: string): Promise<TokenBalanceResponse> => {
    const response = await api.get<TokenBalanceResponse>(`/api/wallet/token/balance/${publicKey}`);
    return response.data;
  }
}; 