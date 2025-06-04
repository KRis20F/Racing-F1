import { walletEndpoints } from '../api/endpoints/wallet.endpoints';
import type {
  WalletResponse,
  TokenAccountResponse,
  TransferResponse,
  TokenBalanceResponse
} from '../api/endpoints/wallet.endpoints';

export const walletService = {
  createWallet: async (): Promise<WalletResponse> => {
    return await walletEndpoints.createWallet();
  },

  createTokenAccount: async (publicKey: string): Promise<TokenAccountResponse> => {
    return await walletEndpoints.createTokenAccount(publicKey);
  },

  transferTokens: async (fromPublicKey: string, toPublicKey: string, amount: string): Promise<TransferResponse> => {
    return await walletEndpoints.transferTokens(fromPublicKey, toPublicKey, amount);
  },

  getTokenBalance: async (publicKey: string): Promise<TokenBalanceResponse> => {
    return await walletEndpoints.getTokenBalance(publicKey);
  }
}; 