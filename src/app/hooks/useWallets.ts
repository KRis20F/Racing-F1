import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { walletService } from '../services/walletService';
import type { Wallet } from '../api/endpoints/wallet.endpoints';

export const useWallets = () => {
  const queryClient = useQueryClient();

  // Listar wallets
  const walletsQuery = useQuery<Wallet[]>({
    queryKey: ['wallets'],
    queryFn: walletService.listWallets
  });

  // Crear wallet
  const createWalletMutation = useMutation({
    mutationFn: walletService.createWallet,
    onSuccess: () => queryClient.invalidateQueries(['wallets'])
  });

  // Actualizar wallet
  const updateWalletMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Wallet> }) => walletService.updateWallet(id, data),
    onSuccess: () => queryClient.invalidateQueries(['wallets'])
  });

  // Eliminar wallet
  const deleteWalletMutation = useMutation({
    mutationFn: walletService.deleteWallet,
    onSuccess: () => queryClient.invalidateQueries(['wallets'])
  });

  return {
    wallets: walletsQuery.data,
    isLoadingWallets: walletsQuery.isLoading,
    isErrorWallets: walletsQuery.isError,
    createWallet: createWalletMutation.mutate,
    isCreatingWallet: createWalletMutation.isLoading,
    updateWallet: updateWalletMutation.mutate,
    isUpdatingWallet: updateWalletMutation.isLoading,
    deleteWallet: deleteWalletMutation.mutate,
    isDeletingWallet: deleteWalletMutation.isLoading,
    errorWallets: walletsQuery.error,
    errorCreateWallet: createWalletMutation.error,
    errorUpdateWallet: updateWalletMutation.error,
    errorDeleteWallet: deleteWalletMutation.error
  };
}; 