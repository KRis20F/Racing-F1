import { useMutation, useQuery } from '@tanstack/react-query';
import { walletService } from '../services/walletService';
import type {
  WalletResponse,
  TokenAccountResponse,
  TransferResponse,
  TokenBalanceResponse
} from '../api/endpoints/wallet.endpoints';

export const useWallet = (publicKey?: string) => {
  const {
    data: tokenBalance,
    isLoading: isLoadingBalance,
    error: balanceError
  } = useQuery<TokenBalanceResponse>({
    queryKey: ['tokenBalance', publicKey],
    queryFn: () => walletService.getTokenBalance(publicKey!),
    enabled: !!publicKey
  });

  const createWalletMutation = useMutation<WalletResponse>({
    mutationFn: walletService.createWallet
  });

  const createTokenAccountMutation = useMutation<TokenAccountResponse, Error, string>({
    mutationFn: walletService.createTokenAccount
  });

  const transferTokensMutation = useMutation<
    TransferResponse,
    Error,
    { fromPublicKey: string; toPublicKey: string; amount: string }
  >({
    mutationFn: ({ fromPublicKey, toPublicKey, amount }) =>
      walletService.transferTokens(fromPublicKey, toPublicKey, amount)
  });

  return {
    // Queries
    tokenBalance,
    isLoadingBalance,
    balanceError,

    // Mutations
    createWallet: createWalletMutation.mutate,
    isCreatingWallet: createWalletMutation.isPending,
    createWalletError: createWalletMutation.error,

    createTokenAccount: createTokenAccountMutation.mutate,
    isCreatingTokenAccount: createTokenAccountMutation.isPending,
    createTokenAccountError: createTokenAccountMutation.error,

    transferTokens: transferTokensMutation.mutate,
    isTransferringTokens: transferTokensMutation.isPending,
    transferTokensError: transferTokensMutation.error
  };
}; 