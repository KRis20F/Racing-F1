import { walletEndpoints } from '../api/endpoints/wallet.endpoints';
import type {
  WalletResponse,
  TokenAccountResponse,
  TransferResponse,
  TokenBalanceResponse,
  Wallet
} from '../api/endpoints/wallet.endpoints';
import { dashboardEndpoints } from '../api/endpoints/dashboard.endpoints';
import type { UserData } from '../api/endpoints/dashboard.endpoints';
import type { WalletCreationResponse } from '../types/wallet';

export interface WelcomeGifts {
  tokens: {
    amount: number;
    symbol: string;
    usdValue: number;
    pricePerToken: number;
  };
  car: {
    name: string;
    category: string;
    specs: {
      power: string;
      acceleration: string;
      topSpeed: string;
    };
  };
}

export interface WalletCreationResponse extends WalletResponse {
  welcomeGifts?: WelcomeGifts;
}

export const walletService = {
  getUserProfile: async (): Promise<UserData> => {
    try {
      return await dashboardEndpoints.getUserProfile();
    } catch (error: any) {
      console.log('❌ Error al obtener perfil:', error?.response?.data || error);
      throw error;
    }
  },

  createTokenAccount: async (publicKey: string): Promise<TokenAccountResponse> => {
    try {
      console.log('ℹ️ Creando cuenta de token para:', publicKey);
      return await walletEndpoints.createTokenAccount(publicKey);
    } catch (error: any) {
      console.log('❌ Error al crear cuenta de token:', error?.response?.data || error);
      throw error;
    }
  },

  transferTokens: async (from: string, to: string, amount: string): Promise<TransferResponse> => {
    try {
      console.log('ℹ️ Transfiriendo tokens:', { from, to, amount });
      return await walletEndpoints.transferTokens(from, to, amount);
    } catch (error: any) {
      console.log('❌ Error al transferir tokens:', error?.response?.data || error);
      throw error;
    }
  },

  getTokenBalance: async (publicKey: string) => {
    try {
      return await walletEndpoints.getTokenBalance(publicKey);
    } catch (error: any) {
      console.log('❌ Error al obtener balance:', error?.response?.data || error);
      throw error;
    }
  },

  listWallets: async (): Promise<Wallet[]> => {
    return await walletEndpoints.listWallets();
  },

  createWallet: async (wallet: { address: string; balance?: number }): Promise<Wallet> => {
    return await walletEndpoints.createWallet(wallet);
  },

  updateWallet: async (id: number, wallet: { address?: string; balance?: number }): Promise<Wallet> => {
    return await walletEndpoints.updateWallet(id, wallet);
  },

  deleteWallet: async (id: number): Promise<void> => {
    return await walletEndpoints.deleteWallet(id);
  }
}; 